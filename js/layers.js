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

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.


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
            unlocked() {return true} 
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
    layerShown() { return hasUpgrade('b',41)||player.c.points.gte(1) },          // Returns a bool for if this layer's node should be visible in the tree.

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


