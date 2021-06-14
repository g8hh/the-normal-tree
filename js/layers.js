addLayer("N", {
    name: "Numbers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Numbers", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasChallenge('F', 11)) mult = mult.times(3)
        if (inChallenge('F', 11)) mult = mult.times(0.2)
       if (hasUpgrade('N',14)) mult = mult.times(upgradeEffect('N', 14))
       if (hasUpgrade('F',11)) mult = mult.times(upgradeEffect('F', 11))
        if (hasMilestone('F', 1)) mult = mult.times(player.F.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult=new Decimal(1)
        return mult

    },


    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "N", description: "N: Reset for Numbers", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.N.unlocked) doReset("N") },
    },
    ],
    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "1",
            description: "Points gain x3.",
            cost: new Decimal(2),
        },
        12: {
            title: "2",
            description:"Numbers boost point gain.",
            cost: new Decimal(5),
            effect() {
                if (player.N.points >=52281977629) return 5000000
                if(hasUpgrade("N",22)) return player.N.points.pow(0.625).add(1)
                if (player.N.points >=4641588) return 100000
                if(hasUpgrade("N",21)) return player.N.points.pow(0.75).add(1)
                if(hasUpgrade("N",15)) return 1000
                else return player.N.points.pow(0.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("N", 11)
            },
        },
        13: {
            title: "3",
            description: "Points boost points gain.",
            cost: new Decimal(25),
            effect() {
        if(hasUpgrade("N",15)) return 30
        else return player.points.pow(0.25).add(1)

            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("N", 12)
            },
        },
        14: {
            title: "4",
            description: "Points boost Numbers gain.",
            cost: new Decimal(125),
            effect() {
                if (player.points >= 471556031) return 400
                if(hasUpgrade("N",21)) return player.points.pow(0.3).add(1)
                if(hasUpgrade("N",15)) return 20
                else return player.points.add(1).pow(0.2)
              

            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("N", 13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "5",
            description: "Boost '2', '3' and '4'.",
            cost: new Decimal(314),
    
            unlocked(){
                return hasUpgrade("N", 14)
            },
            
        },
        21: {
            title: "6",
            description: "Remove the first hardcap of '2' and '4'.",
            cost: new Decimal(111111),
    
            unlocked(){
                return hasMilestone('F', 1)
            },
            
        },
        22: {
            title: "7",
            description: "Remove the second hardcap of '2' but nerf it.",
            cost: new Decimal(420420420),
    
            unlocked(){
                return hasMilestone('F', 4)
            },
            
        },
    },
    passiveGeneration(){return hasMilestone('F',6) ? 1 : 0},
    layerShown(){return true}
})
addLayer("F", {
    name: "Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFCD00",
    requires: new Decimal(1e5), // Can be a function that takes requirement increases into account
    resource: "Factors", // Name of prestige currency
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 50,
    exponent: 0.75,
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "F", description: "F: Reset for Factors", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.F.unlocked) doReset("F") },
        unlocked() {return hasUpgrade('N', 15)} // Determines if you can use the hotkey, optional
    },
    ],
    milestones: {
        1: {
            requirementDescription: "1 factor",
            effectDescription: "Unlock 1 more Number upgrade and factor boost number and point gain.",
            done() { return player.F.points.gte(1) }
        },
        2: {
            requirementDescription: "2 factors",
            effectDescription: "Unlock 1 challenge.",
            done() { return player.F.points.gte(2)}
        },
        4: {
            requirementDescription: "4 factors",
            effectDescription: "Unlock 1 more Number upgrade.",
            done() { return player.F.points.gte(4)}
        },
        5: {
            requirementDescription: "5 factors",
            effectDescription: "Unlock factor upgrade",
            done() { return player.F.points.gte(5)}
        },
        6: {
            requirementDescription: "6 factors",
            effectDescription: "Gain 100% of Number on prestige per second.",
            done() { return player.F.points.gte(6)}
        },
    },
    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "Factor Alpha",
            description: "Boost points and numbers base on factor.",
            effect() {
                return player.F.points.pow(0.4).add(1)
        
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(5),
        },
    },
    challenges: {
        11: {
            name: "Root",
            challengeDescription: "Number and point gain /5",
            goal: new Decimal(1000000),
            rewardDescription(){return "Number and Point x3"},
          unlocked(){return hasMilestone('F', 2)},
        },
    },

    layerShown(){return true}
})