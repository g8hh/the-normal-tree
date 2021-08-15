addLayer("p", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "prestige points",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires(){ 
        if(player.p.upgrades.length>8&&hasUpgrade('p',13)) return  new Decimal(1)
      else  if(hasUpgrade('p',13))  return  new Decimal(10).minus(player.p.upgrades.length)
      else  return  new Decimal(10)},              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {   
        let gain  = new Decimal(1)  
      if(hasUpgrade('p',32)) gain=gain.times(upgradeEffect('p',32))         
      if(hasUpgrade('p',24)) gain=gain.times(1e10)   
      if(hasUpgrade('b',11)) gain=gain.times(upgradeEffect('b',11))   
      if(hasUpgrade('p',42)) gain=gain.times(upgradeEffect('p',21))       
      if(hasUpgrade('p',43)) gain=gain.times(upgradeEffect('p',31))  
      if(hasUpgrade('a',13)) gain=gain.times(upgradeEffect('a',13))  
      if(inChallenge('c',11))gain=gain.times(player.c.points.add(1).pow(3))
     
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
        if(hasUpgrade('p',33)) gain=gain.times(upgradeEffect('p',33))    
        if(inChallenge('c',11))gain=gain.times(0.75)
        if(hasUpgrade('b',14)) gain=gain.times(upgradeEffect('b',14))
        return gain 
    },

    layerShown() { return (!player.ach.uni.gte(1)&&player.ach.uni.gte(0)) },          // Returns a bool for if this layer's node should be visible in the tree.


        upgrades: {
            11: {
                title:"upgrade boost 1",
                description: "point gain x2 per upgrade",
                effect(){
                    if(hasChallenge('c',11)) return new Decimal(new Decimal(2).add(upgradeEffect('p',23)).times(tmp.b.effect).pow(player.p.upgrades.length)).times(new Decimal(2).add(upgradeEffect('p',23)).times(tmp.b.effect).pow(player.a.upgrades.length)).times(new Decimal(2).add(upgradeEffect('p',23)).times(tmp.b.effect).pow(player.b.upgrades.length))
                  else  if(hasUpgrade('a',23))  return new Decimal(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.p.upgrades.length)).times(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.a.upgrades.length)).times(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.b.upgrades.length))
                  else  if(hasUpgrade('a',21)) return new Decimal(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.p.upgrades.length)).times(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.a.upgrades.length))
                else  if(hasUpgrade('p',23)) return new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.p.upgrades.length) 
                  else  return new Decimal(2).add(tmp.b.effect).pow(player.p.upgrades.length)},
                effectDisplay(){return format(upgradeEffect('p',11))+"x"},
                cost: new Decimal(1),
            },
            12: {
                title:"upgrade boost 2",
                description: "point gain ^1.1 per upgrade",
                effect(){
                    if(hasUpgrade('a',24)) return new Decimal(new Decimal(1.1).pow(player.p.upgrades.length)).times(new Decimal(1.1).pow(player.a.upgrades.length)).times(new Decimal(1.1).pow(player.b.upgrades.length))
                  else  if(hasUpgrade('a',22))    return new Decimal(new Decimal(1.1).pow(player.p.upgrades.length)).times(new Decimal(1.1).pow(player.a.upgrades.length))
                  else  return new Decimal(new Decimal(1.1).pow(player.p.upgrades.length))},
                effectDisplay(){return "^"+format(upgradeEffect('p',12))},
                unlocked(){return hasUpgrade('p',11)},
                cost: new Decimal(2),
            },
        
            13: {
                title:"upgrade boost 3",
                description: "Prestige req -1 per upgrade (hardcap at 1)",
              
                unlocked(){return hasUpgrade('p',22)},
                cost: new Decimal(30),
            },
            14: {
                title:"meta boost 1",
                description: "point x1e10",
              
                unlocked(){return hasMilestone('b',0)},
                cost: new Decimal(1e38),
            },
            21: {
                title:"prestige boost 1",
                description: "prestige point boost point gain.",
                effect(){
                    if(player.p.points.add(1).pow(0.3).gte(314))     return new Decimal(314)
                  else  return player.p.points.add(1).pow(0.3)},
                effectDisplay(){return format(upgradeEffect('p',21))+"x"},
                unlocked(){return hasUpgrade('p',12)},
                cost: new Decimal(5),
            },
            22: {
                title:"prestige boost 2",
                description: "prestige point boost point gain.",
                effect(){return player.p.points.add(10).log(10).pow(0.25)},
                effectDisplay(){return "^"+format(upgradeEffect('p',22))},
                unlocked(){return hasUpgrade('p',21)},
                cost: new Decimal(12),
            },
            23: {
                title:"prestige boost 3",
                description: "Prestige point boost upgrade boost 1 base",
                effect(){
                   return player.p.points.add(10).log(10).pow(0.3).minus(1)},
                effectDisplay(){return "+"+format(upgradeEffect('p',23))},
                unlocked(){return hasUpgrade('p',13)},
                cost: new Decimal(500),
            },
            24: {
                title:"meta boost 2",
                description: "Prestige point x1e10",
              
                unlocked(){return hasMilestone('b',0)},
                cost: new Decimal(1e73),
            },
            31: {
                title:"point boost 1",
                description: "point boost themselves.",
                effect(){return player.points.add(10).log(10)},
                effectDisplay(){return format(upgradeEffect('p',31))+"x"},
                unlocked(){return hasUpgrade('p',23)},
                cost: new Decimal(50000),
            },
            32: {
                title:"point boost 2",
                description: "point boost prestige point gain.",
                effect(){return player.points.add(10).log(10).pow(0.5)},
                effectDisplay(){return format(upgradeEffect('p',32))+"x"},
                unlocked(){return hasUpgrade('p',31)},
                cost: new Decimal(5e8),
            },
            33: {
                title:"point boost 3",
                description: "point boost prestige point gain.",
                effect(){return player.points.add(10).log(10).pow(0.1)},
                effectDisplay(){return "^"+format(upgradeEffect('p',33))},
                unlocked(){return hasUpgrade('p',32)},
                cost: new Decimal(1e12),
            },
            34: {
                title:"meta boost 3",
                description: "Booster cost /1e10",
              
                unlocked(){return hasMilestone('b',0)},
                cost: new Decimal(1e130),
            },
            41: {
                title:"Effect boost 1",
                description: "point boost 2 also affect point.",
              
                unlocked(){return hasMilestone('b',2)},
                cost: new Decimal(1e220),
            },
            42: {
                title:"Effect boost 2",
                description: "prestige boost 1 also affect prestige point.",
              
                unlocked(){return hasMilestone('b',2)},
                cost: new Decimal(1e288),
            },
            43: {
                title:"Effect boost 3",
                description: "point boost 1 also affect prestige point.",
              
                unlocked(){return hasMilestone('b',2)},
                cost: new Decimal("1e389"),
            },
            44: {
                title:"meta boost 4",
                description: "amoeba x1e10",
              
                unlocked(){return hasUpgrade('a',41)},
                cost: new Decimal("1e2865"),
            },
        },
        doReset(resettingLayer) {
            let extraUpgrades = [];
       
            if (hasMilestone("b",4)) extraUpgrades.push(11);
            let keep = [];
          
            if (hasMilestone("b", 1) && resettingLayer=="b")  keep.push("upgrades")
            if (hasUpgrade("a", 31) && resettingLayer=="a")  keep.push("upgrades")
            if (hasMilestone("c", 4) && resettingLayer=="c")  keep.push("upgrades")
            if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
            for(i in extraUpgrades) {
                if (!player[this.layer].upgrades.includes(extraUpgrades[i])) {
                  player[this.layer].upgrades.push(extraUpgrades[i])
                }
              }
        },
        hotkeys: [
            {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)},
            onPress() { if (player.p.unlocked) doReset("p") },
            unlocked() {return !player.ach.uni.gte(1)} 
        },
        ],
        passiveGeneration(){return hasMilestone('c',0)? 100 : 0},
})

addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ff4040",                       // The color for this layer, which affects many elements.
    resource: "amoebas",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "prestige points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires(){ 
       return  new Decimal("1e527")},              // The amount of the base needed to  gain 1 of the prestige currency.
      
    type: "normal",
    exponent: 0.01,                        
    gainMult() {   
        let gain  = new Decimal(1)  
        if(hasUpgrade('p',44)) gain=gain.times(1e10)   
        if(hasUpgrade('c',11)) gain=gain.times(upgradeEffect('c',11))   
        if(hasUpgrade('b',12)) gain=gain.times(upgradeEffect('b',12))  
        if(hasMilestone('d',5))    gain=gain.tetrate(new Decimal(100).pow(new Decimal(100).pow(player.d.points.pow(100))))  
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
        if(hasUpgrade('b',13)) gain=gain.times(upgradeEffect('b',13))
        if(hasMilestone('d',4))    gain=gain.times(new Decimal(100).pow(player.d.points.pow(100)))  
        
        return gain 
    },
    upgrades: {
        11: {
            title:"Amoeba Boost 1",
            description: "Amoeba boost point gain.",
            effect(){

             return player.a.points.add(2).pow(1.25)},
            effectDisplay(){return format(upgradeEffect('a',11))+"x"},
            cost: new Decimal(2),
        },
        12: {
            title:"Amoeba Boost 2",
            description: "Amoeba divide booster cost.",
            effect(){

             return player.a.points.add(2).pow(10)},
            effectDisplay(){return "/"+format(upgradeEffect('a',12))},
            cost: new Decimal(2e42),
            unlocked(){return hasUpgrade('a',41)}
        },
        13: {
            title:"Amoeba Boost 3",
            description: "Amoeba boost prestige point gain.",
            unlocked(){return hasMilestone('c',3)},
            effect(){
return player.a.points.add(2).pow(0.75)},
               effectDisplay(){return format(upgradeEffect('a',13))+"x"},
            cost: new Decimal(1e180),
        },
      
        21: {
            title:"Upgrade Boost 1",
            description: "Amoeba upgrade are count in upgrade boost 1.",
           
            cost: new Decimal(5),
            unlocked(){return hasUpgrade('a',11)}
        },
        22: {
            title:"Upgrade Boost 2",
            description: "Amoeba upgrade are count in upgrade boost 2.",
            unlocked(){return hasUpgrade('a',21)},
            cost: new Decimal(100),
        },
        23: {
            title:"Upgrade Boost 3",
            description: "Booster upgrade are count in upgrade boost 1.",
            unlocked(){return hasUpgrade('a',31)},
            cost: new Decimal(5e10),
        },
        24: {
            title:"Upgrade Boost 4",
            description: "Booster upgrade are count in upgrade boost 2.",
            unlocked(){return hasMilestone('c',3)},
            cost: new Decimal(1e80),
        },
        31: {
            title:"Keep Boost 1",
            description: "keep prestige upgrade on reset.",
            unlocked(){return hasUpgrade('a',22)},
            cost: new Decimal(5000000),
        },
        41: {
            title:"Unlocker 1",
            description: "unlock 3 upgrade.",
            unlocked(){return hasUpgrade('a',31)},
            cost: new Decimal(3.14e17),
        },
        42: {
            title:"Unlocker 2",
            description: "unlock code challenge.",
            unlocked(){return hasMilestone('c',3)},
            cost: new Decimal("1e570"),
        },
    },
    doReset(resettingLayer) {
     
        let keep = [];
        if (hasMilestone("c", 2) && resettingLayer=="c")  keep.push("upgrades")
        if (hasMilestone("d", 1) && resettingLayer=="d")  keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    layerShown() { return hasMilestone('b',3)||player.a.points.gte(1) },          // Returns a bool for if this layer's node should be visible in the tree.

    branches:'p',
    hotkeys: [
        {key: "a", description: "A: Reset for amoebas", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.a.unlocked) doReset("a") },
        unlocked() {return hasMilestone('b',3)} 
    },
    ], 
    passiveGeneration(){return hasMilestone('b',7)? 100 : 0},
})
addLayer("b", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#0060ff",                       // The color for this layer, which affects many elements.
    resource: "boosters",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "prestige points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires(){ 
       return  new Decimal(1e26)},              // The amount of the base needed to  gain 1 of the prestige currency.
       effect(){
         if(hasChallenge('c',11)) return player.b.points.add(1) 
      else  return player.b.points},
       effectDescription()
       {if(hasChallenge('c',11)) return "Which make upgrade effect 1 base x" + format(tmp.b.effect)
       else return "Which make upgrade effect 1 base +" + format(tmp.b.effect)},
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.5,                          // "normal" prestige gain is (currency^exponent).
    base:1e6,
    gainMult() {   
        let gain  = new Decimal(1)  
        if(hasUpgrade('p',34)) gain=gain.div(1e10)   
        if(hasUpgrade('a',12)) gain=gain.div(upgradeEffect('a',12))
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
      
        return gain 
    },
    doReset(resettingLayer) {
     
        let keep = [];
        if (hasMilestone("c", 1) && resettingLayer=="c")  keep.push("milestones")
        if (hasMilestone("b", 7) && resettingLayer=="c")  keep.push("upgrades")
        if (hasMilestone("d", 0) && resettingLayer=="d")  keep.push("milestones")
        if (hasMilestone("d", 1) && resettingLayer=="d")  keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    milestones:{

        0: {
            requirementDescription: "2 boosters",
            effectDescription: "unlock 3 more upgrade.",
            done() { return player.b.points.gte(2) }
        },
        1: {
            requirementDescription: "8 boosters",
            effectDescription: "keep prestige upgrade on reset.",
            done() { return player.b.points.gte(8) }
        },
        2: {
            requirementDescription: "11 boosters",
            effectDescription: "unlock 3 more upgrade",
            done() { return player.b.points.gte(11) }
        },
        3: {
            requirementDescription: "20 boosters",
            effectDescription: "unlock amoebas.",
            done() { return player.b.points.gte(20) }
        },
        4: {
            requirementDescription: "23 boosters",
            effectDescription: "Keep upgrade boost 1 on ALL resets.",
            done() { return player.b.points.gte(23) }
        },
        5: {
            requirementDescription: "30 boosters",
            effectDescription: "You can buy max boosters.",
            done() { return player.b.points.gte(30) }
        },
        6: {
            requirementDescription: "60 boosters",
            effectDescription: "boosters reset nothing and auto buy it.",
            done() { return player.b.points.gte(60) }
        },
        7: {
            requirementDescription: "585 boosters",
            effectDescription: "gain 10000% of amoeba on reset per second and keep booster upgrade on reset.",
            done() { return player.b.points.gte(585) }
        },
    },
    upgrades: {
        11: {
            title:"Booster Boost 1",
            description: "Booster boost prestige point gain.",
            effect(){
                return player.b.points.add(1).pow(player.b.points.times(1.5))},
            effectDisplay(){return format(upgradeEffect('b',11))+"x"},
            cost: new Decimal(9),
        },
        12: {
            title:"Booster Boost 2",
            description: "Booster boost amoeba gain.",
            unlocked(){return hasMilestone('c',3)},
            effect(){
                return player.b.points.add(1).pow(player.b.points.pow(0.8))},
            effectDisplay(){return format(upgradeEffect('b',12))+"x"},
            cost: new Decimal(200),
        },
        13: {
            title:"Booster Boost 3",
            description: "Booster boost amoeba gain.",
            unlocked(){return hasChallenge('c',11)},
            effect(){
                return player.b.points.add(10).log(10).pow(0.3)},
            effectDisplay(){return "^"+format(upgradeEffect('b',13))},
            cost: new Decimal(465),
        },
        14: {
            title:"Booster Boost 4",
            description: "Booster boost prestige point gain.",
            unlocked(){return hasUpgrade('b',13)},
            effect(){
                return player.b.points.add(10).log(10).pow(0.1)},
            effectDisplay(){return "^"+format(upgradeEffect('b',14))},
            cost: new Decimal(600),
        },
        41: {
            title:"unlocker 1",
            description: "Unlock code.",
          unlocked(){return hasUpgrade('a',41)},
            cost: new Decimal(95),
        },
        42: {
            title:"unlocker 2",
            description: "Unlock distance.",
          unlocked(){return hasUpgrade('b',14)},
            cost: new Decimal(777),
        },
    },
    canBuyMax(){return hasMilestone('b',5)},
    resetsNothing(){return hasMilestone('b',6)},
    autoPrestige(){return hasMilestone('b',6)},

    layerShown() { return hasUpgrade('p',33)||player.b.points.gte(1) },          // Returns a bool for if this layer's node should be visible in the tree.

    branches:'p',
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.b.unlocked) doReset("b") },
        unlocked() {return hasUpgrade('p',33)} 
    },
    ], 
})
addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#c0c0c0",                       // The color for this layer, which affects many elements.
    resource: "codes",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "prestige points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires(){ 
       return  new Decimal("1e5387")},              // The amount of the base needed to  gain 1 of the prestige currency.
       canReset(){return player.p.points.gte("1e5387")},
    type: "custom",
    exponent: 0.01,                        
    gainMult() {   
        let gain  = new Decimal(1)  
      
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
      
        return gain 
    },
    getResetGain() {
        if(hasMilestone('d',2))  return formatWhole(player.p.points.add(1).log(10).minus(5386).times(player.d.points.add(1).pow(2)))
   else  return formatWhole(player.p.points.add(1).log(10).minus(5386))
    },
    getNextAt: function(){
       
        return formatWhole(Decimal.pow(10, new Decimal(tmp[this.layer].resetGain).add(5387)))
	},
    prestigeButtonText(){
        if(player.p.points.gte("1e6387")) return "Reset for " + tmp[this.layer].resetGain +" code."
       else if(!player.p.points.gte("1e5387"))   return "Reset for 0 code.<br>Next at 1.00e5387 prestige point"
      else  return "Reset for " + tmp[this.layer].resetGain +" code.<br>Next at " + tmp[this.layer].getNextAt + " prestige point"},
    layerShown() { return hasUpgrade('b',41)||hasMilestone('c',0)},          // Returns a bool for if this layer's node should be visible in the tree.

    branches: ['a','b'],
    hotkeys: [
        {key: "c", description: "C: Reset for codes", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.c.unlocked) doReset("c") },
        unlocked() {return hasUpgrade('b',41)||player.c.points.gte(1)} 
    },
    ], 
    milestones:{

        0: {
            requirementDescription: "1 code",
            effectDescription: "gain 10000% of prestige point on reset per second, point x100.",
            done() { return player.c.points.gte(1) }
        },
        1: {
            requirementDescription: "10 code",
            effectDescription: "keep booster milestone on reset.",
            done() { return player.c.points.gte(10) }
        },
        2: {
            requirementDescription: "50 code",
            effectDescription: "keep amoeba upgrade on reset.",
            done() { return player.c.points.gte(50) }
        },
        3: {
            requirementDescription: "314 code",
            effectDescription: "unlock 4 more upgrade.",
            done() { return player.c.points.gte(314) }
        },
        4: {
            requirementDescription: "30000 code",
            effectDescription: "Keep prestige upgrade on reset.",
            done() { return player.c.points.gte(30000) }
        },
      
    },
    upgrades: {
        11: {
            title:"code Boost 1",
            description: "code boost amoebas gain.",
            effect(){
return player.c.points.add(2).pow(player.c.points.add(1).pow(0.3))},
               effectDisplay(){return format(upgradeEffect('c',11))+"x"},
            cost: new Decimal(2),
        },
        12: {
            title:"code Boost 2",
            description: "code boost distance gain.",
            effect(){
return player.c.points.add(10).log(10).pow(1.25)},
               effectDisplay(){return "^"+format(upgradeEffect('c',12))},
            cost: new Decimal("ee10"),
            unlocked(){return hasMilestone('d',3)}
        },
     
    },
    challenges:{
        11: {
            name: "download GitHub",
          
            challengeDescription(){
             return "prestige point gain ^0.75 but code boost prestige point gain. enter this challenge will reset a, b, and p content" },
            canComplete(){return player.p.points.gte("1e120")},
            goalDescription: "1e120 prestige point",
            rewardDescription(){return "Booster effect is multiple instead of addition and unlock a upgrade."},
          unlocked(){return hasUpgrade("a", 42)||inChallenge('c',11)||hasChallenge('c',11)},
          onEnter(){
              player.p.upgrades=[]
              player.a.upgrades=[]
              player.b.upgrades=[]
              player.b.milestones=[]
        }
        }
        
    },
    tabFormat: {
        "Milestone":{
            content:[
              "main-display",
              "blank",
            ["prestige-button",function(){return ""}],
              "blank",
              "resource-display",
              "blank",
              "milestones",
            ]
          },
        "Upgrades":{
     
          content:[
            "main-display",
            "blank",
          ["prestige-button",function(){return ""}],
         
          
            "blank",
            "upgrades",
          ]
        },
        "Challenges":{
    
            content:[
              "main-display",
              "blank",
            ["prestige-button",function(){return ""}],
           
            
              "blank",
              "challenges",
            ]
          },
  
      
        },
     update(diff){
         if(hasMilestone('d',0)) player.c.points=player.c.points.add(new Decimal(1000).times(tmp.c.resetGain))
     }
})
addLayer("d", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#008000",                       // The color for this layer, which affects many elements.
    resource: "distance",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "boosters",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.b.points },  // A function to return the current amount of baseResource.

    requires(){ 
       return  new Decimal("888")},              // The amount of the base needed to  gain 1 of the prestige currency.
    
    type: "normal",
    exponent: 3,                        
    gainMult() {   
        let gain  = new Decimal(1)  
    
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
        if(hasUpgrade('c',12)) gain=gain.times(upgradeEffect('c',12))
        return gain 
    },
   
    layerShown() { return hasUpgrade('b',42)||player.d.points.gte(1) },          // Returns a bool for if this layer's node should be visible in the tree.

    branches: ['b'],
    hotkeys: [
        {key: "d", description: "D: Reset for distances", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.d.unlocked) doReset("d") },
        unlocked() {return hasUpgrade('b',42)||player.d.points.gte(1)} 
    },
    ], 
    milestones:{

        0: {
            requirementDescription: "1 distance",
            effectDescription: "gain 1000% of codes on reset per second, keep booster milestone on reset",
            done() { return player.d.points.gte(1) }
        },
        1: {
            requirementDescription: "5 distance",
            effectDescription: "keep booster and amoeba upgrade on reset",
            done() { return player.d.points.gte(5) }
        },
        2: {
            requirementDescription: "20 distance",
            effectDescription: "distance boost code gain.",
            done() { return player.d.points.gte(20) }
        },
        3: {
            requirementDescription: "30000 distance",
            effectDescription: "gain 1000% of distance on reset per second",
            done() { return player.d.points.gte(30000) }
        },
        4: {
            requirementDescription: "ee1000000 distance",
            effectDescription: "distance boost amoebas.",
            done() { return player.d.points.gte("ee1000000") }
        },
        5: {
            requirementDescription: "1F10 distance",
            effectDescription: "distance boost amoebas again.",
            done() { return player.d.points.gte("eeeeeeeee10") }
        },
    },
      
    passiveGeneration(){return hasMilestone('d',3)? 10 : 0},
})
addLayer("cp", {
    symbol(){return"CP"},
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),  
        bank1: new Decimal(0), 
        bank2: new Decimal(0), 
        sbank: new Decimal(1), 
        auto: new Decimal(0), 
        active: new Decimal(0), 
        cp: new Decimal(0), 
    }},

    color: "#008000",                       // The color for this layer, which affects many elements.
    resource: "Challenge point",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires(){ 
        if(inChallenge('cp',12))  return  new Decimal("10^^10")
      else  if(inChallenge('cp',11))  return  new Decimal("10^^10")
    else   return  new Decimal("10")},              // The amount of the base needed to  gain 1 of the prestige currency.
    base(){
        if(hasUpgrade('cp',35))  return new Decimal(4) 
      else if(hasUpgrade('cp',34)) return new Decimal(5) 
       else return new Decimal(10)},
    type: "static",
    exponent(){
        if(hasChallenge('cc',102)) return new Decimal(0.65).div( upgradeEffect('cp',51))
    else    if(hasChallenge('cc',101)) return new Decimal(0.675).div( upgradeEffect('cp',51))
     else if(hasUpgrade('cp',51))  return new Decimal(0.7).div( upgradeEffect('cp',51))
     else   if(hasChallenge('cc',21))return 0.7
      else  if(hasChallenge('cc',12))return 0.8
      else  if(hasChallenge('cc',11))return 0.9
       else return 1},                 
    gainMult() {   
        let gain  = new Decimal(1)  
    if(hasChallenge('cc',22)) gain=gain.div(1e10)
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
        if(hasUpgrade('c',12)) gain=gain.times(upgradeEffect('c',12))
        return gain 
    },
    upgrades: {
        11: {
            title:"start",
            description: "Boost point gain based on your Challenge point",
            effect(){
if(inChallenge('cc',21)) return new Decimal(1)
        else        if(new Decimal(2).pow(player.cp.points.add(1)).gte(314)&&!hasMilestone('cp',2))  return new Decimal(314)
                else if((new Decimal(2).pow(player.cp.points.add(1)).minus(314).pow(0.7).add(314)).gte(1e75)&&hasMilestone('cp',2))    return new Decimal(1e75)
            else if(hasMilestone('cp',2))    return new Decimal(2).pow(player.cp.points.add(1)).minus(314).pow(0.7).add(314)
          else  return new Decimal(2).pow(player.cp.points.add(1))},
            effectDisplay(){return format(upgradeEffect('cp',11))+"x"},
            cost: new Decimal(1),
        },
        12: {
            title:"Banker",
            description: "Unlock bank.",
           
            cost: new Decimal(2),
        },
        13: {
            title:"buyable",
            description: "Unlock buyables.",         
            cost: new Decimal(3),
        },
        14: {
            title:"Greater bank",
            description: "get more Sacrificed challenge point and bank effect is greater.",         
            cost: new Decimal(4),
        },
        15: {
            title:"Maxer",
            description: "You can buy max challenge point.",         
            cost: new Decimal(6),
        },
        21: {
            title:"C1",
            description: "Unlock the first challenge.",         
            cost: new Decimal(7),
        },
        22: {
            title:"Bank boost",
            description: "get more Sacrificed challenge point and boost the first bank buff based on your points",         
            cost: new Decimal(9),
            effect(){

            if(hasMilestone('cp',2))   return player.cp.best.add(10).log(10).add(10).log(10)
               else return player.points.add(10).log(10).add(10).log(10)},
                               effectDisplay(){return "^"+format(upgradeEffect('cp',22))},
        },
        23: {
            title:"Bankerer",
            description: "Unlock a new bank.",         
            cost: new Decimal(11),
        },
        24: {
            title:"buyable boost",
            description: "buyable base +0.5.",         
            cost: new Decimal(13),
        },
        25: {
            title:"Bank boost 2",
            description: "boost the second bank buff based on your best point.",         
            cost: new Decimal(16),
            effect(){

               return player.cp.best.add(10).log(4).add(10).log(4)},
               effectDisplay(){return "^"+format(upgradeEffect('cp',25))},
        },
        31: {
            title:"Super bank",
            description: "get more Sacrificed challenge point.",         
            cost: new Decimal(25),
           
        },
        32: {
            title:"No reset",
            description: "challenge point reset nothing.",         
            cost: new Decimal(32),
           
        },
        33: {
            title:"Buyable booster",
            description: "buyable base +0.5.",         
            cost: new Decimal(37),
           
        },
        34: {
            title:"Auto Banker",
            description: "Auto click two bank per tick and bank reset nothing. challenge point cost base -5.",         
            cost: new Decimal(50),
           
        },
        35: {
            title:"coin",
            description: "Unlock challenge coin, challenge point cost base -1. point x100",         
            cost: new Decimal(190),
           
        },
        41: {
            title:"C2 - C6",
            description: "each upgrade in this row unlock a challenge and point ^1.01.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(270),
           
        },
        42: {
            title:"bank super booster",
            description: "Boost First bank buff.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(582),
           
        },
        43: {
            title:"bank hyper booster",
            description: "Boost second bank buff.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(1500),
           
        },
        44: {
            title:"Booster",
            description: "point ^1.25.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(92000),
           
        },
        45: {
            title:"Super Booster",
            description: "point ^1.5.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(400000),
           
        },
        51: {
            title:"exponent reduce",
            description: "reduce exponent based on your challenge coin.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(4900), 
            effect(){
 return player.cc.points.add(10).log(10).pow(0.1)},
                effectDisplay(){return "/"+format(upgradeEffect('cp',51))},

           
        },
        52: {
            title:"Hyper bank",
            description: "Boost sacrificed challenge point gain.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(22222),  
        },
        53: {
            title:"Boost or nerf",
            description: "Unlock 2 challenge.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(34567),  
        },
        54: {
            title:"can complete",
            description: "You can complete boost or nerf with 26000 challenge point.",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(47800),  
        },
        55: {
            title:"Auto gain",
            description: "gain 100% of challenge coin on reset per second",     
            unlocked(){return hasMilestone('cc',6)},
            cost: new Decimal(80000),  
        },
    },
    challenges:{
        11: {
            name: "No challenge",
          
            challengeDescription(){
             return "Buyable base is 2.5 and you can't get challenge point. Enter this challenge will reset your buyable and challenge point." },
            canComplete(){return player.points.gte("100000")},
            goalDescription: "100000 point",
            rewardDescription(){return "Buyable base +0.5"},
          unlocked(){return hasUpgrade("cp", 21)},
          onEnter(){
             
              player.cp.points=new Decimal(0)
              setBuyableAmount('cp',11,new Decimal(0))
        }
        },
        12: {
            name: "No challenge+",
          
            challengeDescription(){
             return "you can't get challenge point. Enter this challenge will reset your upgrade, buyable, bank and challenge point." },
            canComplete(){return player.points.gte("1e16")},
            goalDescription: "1e16 point",
            rewardDescription(){return "challenge point boost point gain."},
          unlocked(){return hasUpgrade("cp", 45)||inChallenge('cp',12)||hasChallenge('cp',12)},
          onEnter(){
            player.points=new Decimal(0)
              player.cp.points=new Decimal(0)
              player.cp.upgrades=[]
              player.cp.bank1=new Decimal(0)
              player.cp.bank2=new Decimal(0)
              setBuyableAmount('cp',11,new Decimal(0))
        }
        },
    },
    clickables: {
        11: {
            display() {
                if(hasUpgrade('cp',42)) return "Sacrifice challenge point for buff.<br>You have Sacrificed "+format(player.cp.bank1)+" challenge point, which boost point by "+format(player.cp.bank1.add(1).log(2).add(1).pow(6).pow(upgradeEffect('cp',22)))
             else   if(hasUpgrade('cp',22))  return "Sacrifice challenge point for buff.<br>You have Sacrificed "+format(player.cp.bank1)+" challenge point, which boost point by "+format(player.cp.bank1.add(1).log(2).add(1).pow(2).pow(upgradeEffect('cp',22)))
            else   if(hasUpgrade('cp',14))    return "Sacrifice challenge point for buff.<br>You have Sacrificed "+format(player.cp.bank1)+" challenge point, which boost point by "+format(player.cp.bank1.add(1).log(2).add(1).pow(2))
        else  return "Sacrifice challenge point for buff.<br>You have Sacrificed "+player.cp.bank1+" challenge point, which boost point by "+format(player.cp.bank1.add(1).log(10).add(1).pow(2))},
            canClick(){return player.cp.points.gte(1)},
            onClick(){
                if(hasUpgrade('cp',52)) player.cp.bank1=  player.cp.bank1.add(player.cp.points.pow(6).pow(upgradeEffect('cp',22)))
            else    if(hasUpgrade('cp',31))   player.cp.bank1=  player.cp.bank1.add(player.cp.points.pow(3).pow(upgradeEffect('cp',22)))
            else    if(hasUpgrade('cp',22))         player.cp.bank1=  player.cp.bank1.add(player.cp.points.pow(2).pow(upgradeEffect('cp',22)))
        else  if(hasUpgrade('cp',14))  player.cp.bank1=  player.cp.bank1.add(player.cp.points.pow(2))
          else player.cp.bank1=  player.cp.bank1.add(player.cp.points)
         if(!hasUpgrade('cp',34))   player.cp.points=new Decimal(0)
  
            },
            unlocked(){return hasUpgrade('cp',12)},
            style() { return {
                "font-size": "13px",
                "height": "250px",
                "width": "250px"
                }
            },
    },
    12: {
        display() {
            if(hasUpgrade('cp',43)) return "Sacrifice challenge point for buff.<br>You have Sacrificed "+format(player.cp.bank2)+" challenge point, which boost point by "+format(player.cp.bank2.add(1).pow(0.3).pow(upgradeEffect('cp',25)))
          else  if(hasUpgrade('cp',25))   return "Sacrifice challenge point for buff.<br>You have Sacrificed "+format(player.cp.bank2)+" challenge point, which boost point by "+format(player.cp.bank2.add(1).pow(0.2).pow(upgradeEffect('cp',25)))
          else  return "Sacrifice challenge point for buff.<br>You have Sacrificed "+format(player.cp.bank2)+" challenge point, which boost point by "+format(player.cp.bank2.add(1).pow(0.2))},
        canClick(){return player.cp.points.gte(1)},
        onClick(){
            if(hasUpgrade('cp',52))  player.cp.bank2=  player.cp.bank2.add(player.cp.points.pow(6).pow(upgradeEffect('cp',22)))
       else     if(hasUpgrade('cp',31))    player.cp.bank2=  player.cp.bank2.add(player.cp.points.pow(3).pow(upgradeEffect('cp',22)))
     else   player.cp.bank2=  player.cp.bank2.add(player.cp.points.pow(2).pow(upgradeEffect('cp',22)))
   
     if(!hasUpgrade('cp',34))   player.cp.points=new Decimal(0)

        },
        unlocked(){return hasUpgrade('cp',23)},
        style() { return {
            "font-size": "13px",
            "height": "250px",
            "width": "250px"
            }
        },
},
    101: {
        display() {
            
       return "Auto Sacrifice amount -1"},
        canClick(){return player.cp.auto.gte(1)},
        onClick(){
        player.cp.auto= player.cp.auto.minus(1)
        },
        unlocked(){return hasMilestone('cp',1)},
},
102: {
    display() {
        
   return "Auto Sacrifice amount +1"},
    canClick(){return true},
    onClick(){
    player.cp.auto= player.cp.auto.add(1)
    },
    unlocked(){return hasMilestone('cp',1)},
},
103: {
    display() {    
        if(player.cp.active.gte(1))    return "Auto Sacrifice: active"
    else return "Auto Sacrifice: inactive"},
    canClick(){return true},
    onClick(){
   if(player.cp.active.gte(1)) player.cp.active= new Decimal(0)
   else player.cp.active= new Decimal(1)
    },
    unlocked(){return hasMilestone('cp',1)},
},
104: {
    display() {    
        if(player.cp.sbank.gte(2))    return "Sacrifice bank: 2"
    else return "Sacrifice bank: 1"},
    canClick(){return true},
    onClick(){
   if(player.cp.sbank.gte(2)) player.cp.sbank= new Decimal(1)
   else player.cp.sbank= new Decimal(2)
    },
    unlocked(){return hasUpgrade('cp',23)},
},
},
  milestones:{
    
        0: {
            requirementDescription: "100 Sacrifice challenge point",
            effectDescription: "Auto buy challenge point.",
            done() { return player.cp.bank1.gte(100) }
        },
       
        1: {
            requirementDescription: "300 Sacrifice challenge point",
            effectDescription: "Unlock auto Sacrifice.",
            done() { return player.cp.bank1.gte(300) }
        },
        2: {
            requirementDescription: "6000 Sacrifice challenge point",
            effectDescription: "Bank boost effect is based on max. Start effect is softcap instead of hardcap.",
            done() { return player.cp.bank1.gte(6000) }
        },
  },
   
    buyables: {
        rows: 2,
        cols: 3,
        11: {
            title: "mult",
            display() {
               return "Boosts point gain by " + format(tmp.cp.buyables[11].effect) + "x<br>Cost : " + format(new Decimal("10").pow(getBuyableAmount("cp", 11).add(2))) + " points"
            },
            unlocked() { return hasUpgrade("cp", 13)},
            canAfford() { 
              return player.points.gte(new Decimal("10").pow(getBuyableAmount("cp", 11).add(2))) 
            },
            buy() { 
                {
                   player.points = player.points.minus(new Decimal("10").pow(getBuyableAmount("cp", 11).add(2)))
                }
                setBuyableAmount("cp", 11, getBuyableAmount("cp", 11).add(1))
            },

            effect() { 
                if(inChallenge('cc',22)) eff = new Decimal("0.9").pow(getBuyableAmount("cp", 11))
              else  if(inChallenge('cc',12)) eff = new Decimal("1")
              else  if(new Decimal("3.5").pow(getBuyableAmount("cp", 11)).gte(1e75))  eff = new Decimal("1e75")
            else    if(hasUpgrade('cp',33)) eff = new Decimal("3.5").pow(getBuyableAmount("cp", 11))
            else    if(hasUpgrade('cp',24)) eff = new Decimal("3").pow(getBuyableAmount("cp", 11))
            else    if(inChallenge('cp',11)||hasChallenge('cp',11))  eff = new Decimal("2.5").pow(getBuyableAmount("cp", 11))
         else   eff = new Decimal("2").pow(getBuyableAmount("cp", 11))
        return eff     
            }
        },
    },
    update(diff){
        if(player.points.gte(player.cp.best)&&player.ach.uni.gte(1)) player.cp.best=player.points
    },
    layerShown() { return player.ach.uni.gte(1)&&!player.ach.uni.gte(2) },          // Returns a bool for if this layer's node should be visible in the tree.
    autoPrestige(){return hasMilestone('cp',0)} ,  
    canBuyMax(){return hasUpgrade('cp',15)} , 
    resetsNothing(){return hasUpgrade('cp',32)} , 

    branches: ['b'],
    hotkeys: [
        {key: "C", description: "Shift + C: Reset for challenge points", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.cp.unlocked) doReset("cp") },
        unlocked() {return player.ach.uni.gte(1)&&!player.ach.uni.gte(2)} 
    },
    ],
    automate(){
        if((player.cp.active.gte(1)&&player.cp.points.gte(player.cp.auto)&&player.cp.sbank.gte(1)&&!player.cp.sbank.gte(2))||hasUpgrade('cp',34)) layers[this.layer].clickables[11].onClick()
        if((player.cp.active.gte(1)&&player.cp.points.gte(player.cp.auto)&&player.cp.sbank.gte(2)&&!player.cp.sbank.gte(3))||hasUpgrade('cp',34)) layers[this.layer].clickables[12].onClick()
    } ,
    tabFormat: {
        "Upgrades":{
            content:[
                "main-display",
                "blank",
              ["prestige-button",function(){return ""}],
                "blank",
                "resource-display",
                "blank",
         
              "upgrades",
            ]
          },
          "bank":{
              unlocked(){return hasUpgrade('cp',12)},
            content:[
                "main-display",
                "blank",
              ["prestige-button",function(){return ""}],
                "blank",
                "resource-display",
               
              "blank",
              "clickables",
              ["display-text",function(){
                let s = ""
                if(hasMilestone('cp',1)) s += "auto Sacrifice amount: "+player.cp.auto
                return s
              }],
            ]
          },
          "buyables":{
            unlocked(){return hasUpgrade('cp',13)},
          content:[
              "main-display",
              "blank",
            ["prestige-button",function(){return ""}],
              "blank",
              "resource-display",
             
            "blank",
            "buyables",
          ]
        },
        "milestones":{
            unlocked(){return hasUpgrade('cp',12)},
          content:[
              "main-display",
              "blank",
            ["prestige-button",function(){return ""}],
              "blank",
              "resource-display",
             
            "blank",
            "milestones",
          ]
        },
        "challenge":{
            unlocked(){return hasUpgrade('cp',21)||inChallenge('cp',12)||hasChallenge('cp',12)},
          content:[
              "main-display",
              "blank",
            ["prestige-button",function(){return ""}],
              "blank",
              "resource-display",
             
            "blank",
            "challenges",
          ]
        },
       
        },
        automateStuff(){
            if(hasMilestone("cc",3)){
              if(layers.cp.buyables[11].canAfford())setBuyableAmount("cp",11,player.points.log("10").floor())
              
            }
        },
        doReset(resettingLayer) {
            let extraUpgrades = [];
       
            if (hasMilestone("cc",0)&&!inChallenge('cc',11)&&!inChallenge('cc',12)&&!inChallenge('cc',21)&&!inChallenge('cc',22)) extraUpgrades.push(12,23,34);
            if (hasMilestone("cc",1)&&!inChallenge('cc',11)&&!inChallenge('cc',12)&&!inChallenge('cc',21)&&!inChallenge('cc',22)) extraUpgrades.push(24,33);
            if (hasMilestone("cc",2)&&!inChallenge('cc',11)&&!inChallenge('cc',12)&&!inChallenge('cc',21)&&!inChallenge('cc',22)) extraUpgrades.push(15,32);
            if (hasMilestone("cc",3)&&!inChallenge('cc',11)&&!inChallenge('cc',12)&&!inChallenge('cc',21)&&!inChallenge('cc',22)) extraUpgrades.push(13);
            if (hasMilestone("cc",4)&&!inChallenge('cc',11)&&!inChallenge('cc',12)&&!inChallenge('cc',21)&&!inChallenge('cc',22)) extraUpgrades.push(35);
            
            let keep = [];
            if (hasMilestone("cc",1)) keep.push("challenges")
            if (hasMilestone("cc",2)) keep.push("milestones")
            if (hasMilestone("cc",5)) keep.push("upgrades")
            if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
            for(i in extraUpgrades) {
                if (!player[this.layer].upgrades.includes(extraUpgrades[i])) {
                  player[this.layer].upgrades.push(extraUpgrades[i])
                }
              }
        },   

  
})
addLayer("cc", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
symbol:"CC",
    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "challenge coins",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
branches:["cp"],
    baseResource: "challenge points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.cp.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(256),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.8,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {  
        let gain  = new Decimal(1)      
        if(inChallenge('cc',101))  gain=gain.times(1.5)   
        if(inChallenge('cc',102))  gain=gain.times(2.25)  
        return gain
    },

    layerShown() { return (hasUpgrade('cp',35)||hasMilestone('cc',0))},          // Returns a bool for if this layer's node should be visible in the tree.

   
        milestones: {
            0: {
                requirementDescription: "1 challenge coin",
                effectDescription: "point x3, keep Banker, Bankerer and auto banker on reset",
                done() { return player.cc.points.gte(1) }
            },
            1: {
                requirementDescription: "2 challenge coin",
                effectDescription: "point x3, keep buyable boost, buyable booster and challenge on reset",
                done() { return player.cc.points.gte(2) }
            },
            2: {
                requirementDescription: "3 challenge coin",
                effectDescription: "point x3, keep Maxer, No reset and milestones on reset",
                done() { return player.cc.points.gte(3) }
            },
            3: {
                requirementDescription: "4 challenge coin",
                effectDescription: "point x3, Auto buy max buyable. keep buyable on reset.",
                done() { return player.cc.points.gte(4) }
            },
            4: {
                requirementDescription: "5 challenge coin",
                effectDescription: "point x3, keep coin on reset.",
                done() { return player.cc.points.gte(5) }
            },
            5: {
                requirementDescription: "6 challenge coin",
                effectDescription: "point x3, keep upgrade on reset.",
                done() { return player.cc.points.gte(6) }
            },
            6: {
                requirementDescription: "10 challenge coin",
                effectDescription: "point x3, challenge coin boost point gain and unlock more challenge point upgrade.",
                done() { return player.cc.points.gte(10) }
            },

        },
        challenges:{
            11: {
                name: "C2",
              
                challengeDescription(){
                 return "point gain ^0.9. enter this challenge will reset cp upgrade and milestone" },
                canComplete(){return player.cp.points.gte("120")},
                goalDescription: "120 challenge point",
                rewardDescription(){return "chalenge point cost exponent is 0.9"},
              unlocked(){return hasUpgrade("cp", 41)||inChallenge('cc',11)||hasChallenge('cc',11)},
              onEnter(){
                  player.cp.upgrades=[]
                
                  player.cp.milestones=[]
            }
            },
            12: {
                name: "C3",
              
                challengeDescription(){
                 return "Buyable has no effect. enter this challenge will reset cp upgrade and milestone" },
                canComplete(){return player.cp.points.gte("30")},
                goalDescription: "30 challenge point",
                rewardDescription(){return "chalenge point cost exponent is 0.8"},
              unlocked(){return hasUpgrade("cp", 42)||inChallenge('cc',12)||hasChallenge('cc',12)},
              onEnter(){
                  player.cp.upgrades=[]
                  player.cp.milestones=[]
            }
            },
            21: {
                name: "C4",
              
                challengeDescription(){
                 return "Start has no effect. enter this challenge will reset cp upgrade and milestone" },
                canComplete(){return player.cp.points.gte("256")},
                goalDescription: "256 challenge point",
                rewardDescription(){return "chalenge point cost exponent is 0.7"},
              unlocked(){return hasUpgrade("cp", 43)||inChallenge('cc',21)||hasChallenge('cc',21)},
              onEnter(){
                  player.cp.upgrades=[]
                  player.cp.milestones=[]
            }
            },
            22: {
                name: "C5",
              
                challengeDescription(){
                 return "Buyable base is 0.9, enter this challenge will reset cp upgrade and milestone" },
                canComplete(){return player.cp.points.gte("54000")},
                goalDescription: "54000 challenge point",
                rewardDescription(){return "chalenge point cost /1e10"},
              unlocked(){return hasUpgrade("cp", 44)||inChallenge('cc',22)||hasChallenge('cc',22)},
              onEnter(){
                  player.cp.upgrades=[]
                  player.cp.milestones=[]
            }
            },
            101: {
                name: "Boost or nerf 1",
              
                challengeDescription(){
                 return "point ^0.75 but CC ^ 1.5" },
                canComplete(){
                    if(hasUpgrade('cp',54))  return player.cp.points.gte(26000)
                  else  return player.cp.points.gte("10^^10")},
                goalDescription: "Enter this challenge then do CC reset to get more CC.",
                rewardDescription(){return "chalenge point cost exponent is 0.675"},
              unlocked(){return hasUpgrade("cp", 53)},
             
            },
            102: {
                name: "Boost or nerf 2",
              
                challengeDescription(){
                 return "point ^0.4 but CC ^ 2.25" },
                canComplete(){  if(hasUpgrade('cp',54))  return player.cp.points.gte(26000)
                else  return player.cp.points.gte("10^^10")},
                goalDescription: "Enter this challenge then do CC reset to get more CC.",
                rewardDescription(){return "chalenge point cost exponent is 0.65"},
              unlocked(){return hasUpgrade("cp", 53)},
             
            },
        },
        hotkeys: [
            {key: "ctrl+c", description: "Ctrl + C: Reset for challenge coin", onPress(){if (canReset(this.layer)) doReset(this.layer)},
            onPress() { if (player.cc.unlocked) doReset("cc") },
            unlocked() {return hasUpgrade('cp',35)||hasMilestone('cc',0)} 
        },
        ],
        tabFormat: {
            "Milestones":{
                content:[
                    "main-display",
                    "blank",
                  ["prestige-button",function(){return ""}],
                    "blank",
                    "resource-display",
                    "blank",
             
                  "milestones",
                ]
              },

            "challenge":{
                unlocked(){return hasUpgrade('cp',41)||inChallenge('cc',11)||hasChallenge('cc',11)},
              content:[
                  "main-display",
                  "blank",
                ["prestige-button",function(){return ""}],
                  "blank",
                  "resource-display",
                 
                "blank",
                "challenges",
              ]
            },
        },
        passiveGeneration(){return hasUpgrade('cp',55)? 1 : 0},
})
addLayer("t", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ff0000",                       // The color for this layer, which affects many elements.
    resource: "Timewall",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires(){ 
      return  new Decimal(10)},              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {   
        let gain  = new Decimal(1)  
      
     
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
        
        return gain 
    },

    layerShown() { return (!player.ach.uni.gte(3)&&player.ach.uni.gte(2)) },          // Returns a bool for if this layer's node should be visible in the tree.


        
        
        hotkeys: [
            {key: "t", description: "T: Reset for timewall", onPress(){if (canReset(this.layer)) doReset(this.layer)},
            onPress() { if (player.t.unlocked) doReset("t") },
            unlocked() {return player.ach.uni.gte(2)} 
        },
        ],
        passiveGeneration(){return hasMilestone('c',0)? 100 : 0},
})
addLayer("ach", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),  
        uni:new Decimal(0),  
    }},
symbol(){return  "★"},
tooltip(){return  "Achievements"},
    color: "#ffff00",                       // The color for this layer, which affects many elements.
    resource: "achievements",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    baseResource: "boosters",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.b.points },  // A function to return the current amount of baseResource.

    requires(){ 
       return  new Decimal(10).tetrate(1e300)},              // The amount of the base needed to  gain 1 of the prestige currency.
    
    type: "normal",
    exponent: 3,                        
    gainMult() {   
        let gain  = new Decimal(1)  
    
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
        if(hasUpgrade('c',12)) gain=gain.times(upgradeEffect('c',12))
        return gain 
    },
    achievements: {
        11: {
            name: "first layer",
            done(){return player.p.points.gte(1)},
            tooltip:"Get 1 prestige point."  
        },
        12: {
            name: "second layer",
            done(){return player.b.points.gte(1)},
            tooltip:"Get 1 boosters."  
        },
        13: {
            name: "A",
            done(){return player.a.points.gte(1)},
            tooltip:"Get 1 amoebas."  
        },
        14: {
            name: "coding",
            done(){return player.c.points.gte(1)},
            tooltip:"Get 1 codes."  
        },
        15: {
            name: "challenged",
            done(){return hasChallenge('c',11)},
            tooltip:"Complete a challenge."  
        },
        16: {
            name: "DI?",
            done(){return player.d.points.gte(1)},
            tooltip:"Get 1 distance."  
        },
        17: {
            name: "Inflating",
            done(){return player.points.gte(new Decimal(10).tetrate(100))},
            tooltip:"Get 1F100 points. Reward: Unlock universe."  
        },
        21: {
            name: "Again?",
            done(){return player.cp.points.gte(1)&&player.ach.uni.gte(1)},
            tooltip:"Get 1 challenge points.",
            unlocked(){return player.ach.uni.gte(1)}
        },
        22: {
            name: "challenge challenge",
            done(){return hasChallenge('cp',11)},
            tooltip:"Complete No challenge.",
            unlocked(){return player.ach.uni.gte(1)}
        },
        23: {
            name: "coin",
            done(){return player.cc.points.gte(1)},
            tooltip:"Get 1 challenge coin.",
            unlocked(){return player.ach.uni.gte(1)}
        },
        24: {
            name: "coin challenge",
            done(){return hasChallenge('cc',11)},
            tooltip:"Complete C2.",
            unlocked(){return player.ach.uni.gte(1)}
        },
        25: {
            name: "Boost or nerf",
            done(){return hasUpgrade('cp',53)},
            tooltip:"Unlock boost or nerf.",
            unlocked(){return player.ach.uni.gte(1)}
        },
        26: {
            name: "Complete",
            done(){return hasChallenge('cc',102)},
            tooltip:"Complete Boost or nerf 2.",
            unlocked(){return player.ach.uni.gte(1)}
        },
        27: {
            name: "Inflating again",
            done(){return player.points.gte(new Decimal(10).tetrate(100))&&player.ach.uni.gte(1)},
            tooltip:"Get 1F100 points."  
        },
    },
    clickables: {
        11: {
            display() {return "Reset ALL progess but go to another universe. <br>Req: 1F100 points"},
            canClick(){return player.points.gte(new Decimal(10).tetrate(100))},
            onClick(){
                player.ach.uni= player.ach.uni.add(1)
            player.a.upgrades=[]
            player.b.upgrades=[]
            player.c.upgrades=[]
            player.p.upgrades=[]
            player.b.milestones=[]
            player.c.milestones=[]
            player.c.challenges[11]=0
            player.d.milestones=[]
            player.a.points=new Decimal(0)
            player.b.points=new Decimal(0)
            player.c.points=new Decimal(0)
            player.d.points=new Decimal(0)
            player.p.points=new Decimal(0)
            player.points=new Decimal(0)
            player.cp.points=new Decimal(0)
            player.cc.points=new Decimal(0)
            player.cp.challenges[11]=0
            player.cp.challenges[12]=0
            player.cc.challenges[11]=0
            player.cc.challenges[12]=0
            player.cc.challenges[21]=0
            player.cc.challenges[22]=0
            player.cc.challenges[101]=0
            player.cc.challenges[102]=0
      
            player.cp.upgrades=[]
            player.cp.milestones=[]
            player.cc.milestones=[]
            player.cp.bank1=new Decimal(0)
            player.cp.bank2=new Decimal(0)
            player.cp.active=new Decimal(0)
            player.cp.sbank=new Decimal(0)
            player.cp.auto=new Decimal(0)
        }
    },
  
    },
    layerShown() { return true},          // Returns a bool for if this layer's node should be visible in the tree.
    tabFormat: {
        "achievements":{
            content:[
               
              "achievements",
            ]
          },
          "universe":{
              unlocked(){return hasAchievement('ach',17)},
            content:[
               
              "clickables",
            ]
          },
  
      
        },
})


