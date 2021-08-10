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
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
        if(hasUpgrade('p',33)) gain=gain.times(upgradeEffect('p',33))    
        return gain 
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.


        upgrades: {
            11: {
                title:"upgrade boost 1",
                description: "point gain x2 per upgrade",
                effect(){
                    if(hasUpgrade('a',23))  return new Decimal(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.p.upgrades.length)).times(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.a.upgrades.length)).times(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.b.upgrades.length))
                    if(hasUpgrade('a',21)) return new Decimal(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.p.upgrades.length)).times(new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.a.upgrades.length))
                else  if(hasUpgrade('p',23)) return new Decimal(2).add(upgradeEffect('p',23)).add(tmp.b.effect).pow(player.p.upgrades.length) 
                  else  return new Decimal(2).add(tmp.b.effect).pow(player.p.upgrades.length)},
                effectDisplay(){return format(upgradeEffect('p',11))+"x"},
                cost: new Decimal(1),
            },
            12: {
                title:"upgrade boost 2",
                description: "point gain ^1.1 per upgrade",
                effect(){
                    if(hasUpgrade('a',22))    return new Decimal(new Decimal(1.1).pow(player.p.upgrades.length)).times(new Decimal(1.1).pow(player.a.upgrades.length))
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
        },
        doReset(resettingLayer) {
            let extraUpgrades = [];
       
            if (hasMilestone("b",4)) extraUpgrades.push(11);
            let keep = [];
          
            if (hasMilestone("b", 1) && resettingLayer=="b")  keep.push("upgrades")
            if (hasUpgrade("a", 31) && resettingLayer=="a")  keep.push("upgrades")
            if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
            for(i in extraUpgrades) {
                if (!player[this.layer].upgrades.includes(extraUpgrades[i])) {
                  player[this.layer].upgrades.push(extraUpgrades[i])
                }
              }
        },
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
       effect(){return player.b.points},
       effectDescription(){return "Which make upgrade effect 1 base +" + format(tmp.b.effect)},
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.5,                          // "normal" prestige gain is (currency^exponent).
    base:1e6,
    gainMult() {   
        let gain  = new Decimal(1)  
        if(hasUpgrade('p',34)) gain=gain.div(1e10)   
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
      
        return gain 
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
    },
    canBuyMax(){return hasMilestone('b',5)},
    layerShown() { return hasUpgrade('p',33)||player.b.points.gte(1) },          // Returns a bool for if this layer's node should be visible in the tree.

    branches:'p'
     
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
     
        return gain        
    },
    gainExp() {    
        let gain  = new Decimal(1)  
      
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
        21: {
            title:"Upgrade Boost 1",
            description: "Amoeba upgrade are count in upgrade effect 1.",
           
            cost: new Decimal(5),
            unlocked(){return hasUpgrade('a',11)}
        },
        22: {
            title:"Upgrade Boost 2",
            description: "Amoeba upgrade are count in upgrade effect 2.",
            unlocked(){return hasUpgrade('a',21)},
            cost: new Decimal(100),
        },
        23: {
            title:"Upgrade Boost 3",
            description: "Booster upgrade are count in upgrade effect 1.",
            unlocked(){return hasUpgrade('a',31)},
            cost: new Decimal(5e10),
        },
        31: {
            title:"Keep Boost 1",
            description: "keep prestige upgrade on reset.",
            unlocked(){return hasUpgrade('a',22)},
            cost: new Decimal(5000000),
        },
    },

    layerShown() { return hasMilestone('b',3)||player.a.points.gte(1) },          // Returns a bool for if this layer's node should be visible in the tree.

    branches:'p',

})