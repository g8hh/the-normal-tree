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
        if (hasUpgrade('F',12)) mult = mult.times(upgradeEffect('F', 12))
        if (inChallenge('F', 11)) mult = mult.times(0.2)
        if (inChallenge('F', 13)) mult = mult.times(0.2)
        if (hasChallenge('F', 12)) mult = mult.times(3)
        if (hasUpgrade('F',12)) mult = mult.times(upgradeEffect('F', 11))
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
        {key: "n", description: "N: Reset for Numbers", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.N.unlocked) doReset("N") },
    },
    ],
    

    doReset(resettingLayer) {
        let keep = [];
        if (hasChallenge("F", 21) && resettingLayer=="F") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
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
                if (player.N.points >=1e24) return 1e15
            
                if(hasUpgrade("N",24)) return player.N.points.pow(0.625).add(1)
                if (inChallenge("F",21)) return 1000
                if (inChallenge("F",12)) return 1
                if (inChallenge("F",13)) return 1
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
                if (inChallenge("F",21)) return 30
        if (player.points >= 4.60e15) return 50000
        if(hasUpgrade("N",23)) return player.points.pow(0.3).add(1)
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
                if (player.points >= 4.64e26) return 1e8
                if(hasUpgrade("N",25)) return player.points.pow(0.3).add(1)
                if (inChallenge("F",21)) return 20
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
        23: {
            title: "8",
            description: "Remove the first hardcap of '3'.",
            cost: new Decimal(1e15),
    
            unlocked(){
                return hasChallenge('F', 13)
            },
            
        },
        24: {
            title: "9",
            description: "Remove the third hardcap of '2'.You can buy this upgrade while you are in Factor Challenge 4.",
            cost(){ 
                if(player.F.activeChallenge!=21)return new Decimal(Infinity);
                return new Decimal(3.14e12);
            },
            unlocked(){
                {return hasUpgrade('F', 13)}
            },
            
        },
        25: {
            title: "0",
            description: "Remove the second hardcap of '4'.You can buy this upgrade while you are in Factor Challenge 4.",
            cost(){ 
                if(player.F.activeChallenge!=22)return new Decimal(Infinity);
                return new Decimal(3.14e13);
            },
            unlocked(){
                {return hasUpgrade('F', 13)}
            },
            
        },
    },
    passiveGeneration(){return hasMilestone('F',6) && (!inChallenge('F',22))  ? 1 : 0},
    layerShown(){return true}
})
addLayer("PF", {
    name: "Power Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(1e30), // Can be a function that takes requirement increases into account
    resource: "Power Factors", // Name of prestige currency
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base:1e7,
    exponent: 1.25,
    branches:["N"],
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
        {key: "p", description: "P: Reset for Power factors", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.PF.unlocked) doReset("PF") },
        unlocked() {return hasChallenge('N', 22)} // Determines if you can use the hotkey, optional
    },
    ],
    milestones: {
        1: {
            requirementDescription: "1 Power factor",
            effectDescription: "Power factor boost power point gain. (not yet)",
            done() { return player.PF.points.gte(1) }
        },
    },
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
    branches:["N"],
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
        {key: "f", description: "F: Reset for Factors", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.F.unlocked) doReset("F") },
        unlocked() {return hasUpgrade('N', 15)} // Determines if you can use the hotkey, optional
    },
    ],
    canBuyMax(){
        return hasChallenge('F',21) 
    },
 
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
        8: {
            requirementDescription: "8 factors",
            effectDescription: "Unlock 1 more challenge",
            done() { return player.F.points.gte(8)}
        },
        12: {
            requirementDescription: "12 factors",
            effectDescription: "Unlock 1 more challenge",
            done() { return player.F.points.gte(12)}
        },
    },
    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "Factor Alpha",
            description: "Boost points and numbers base on factor.",
            effect() {
                if (inChallenge('F',22)) return 1 
                return player.F.points.pow(0.4).add(1)
        
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(5),
        },
        12: {
            title: "Factor Beta",
            description: "Number boost itself gain.",
            effect() {
                if (inChallenge('F',22)) return 1 
                return player.N.points.pow(0.15).add(1)
        
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(9),
            unlocked(){
                return hasUpgrade("F", 11)
            },
    },
    13: {
        title: "Factor Gamma",
        description: "Unlock 2 Number upgrade and 2 challenge, you can buy max factors.",
        cost: new Decimal(15),
        unlocked(){
            return hasUpgrade("F", 12)
        },
},
},
    challenges: {
        11: {
            name: "/ factor",
            challengeDescription: "Number and point gain /5",
            goal: new Decimal(1000000),
            rewardDescription(){return "Number and Point x3"},
          unlocked(){return hasMilestone('F', 2)},
        },
        12: {
            name: "No upgrade factor",
            challengeDescription: "'2' is no effect",
            canComplete(){return player.N.points.gte("100000000")},
            goalDescription: "100,000,000 Numbers",
            rewardDescription(){return "Number and Point x3"},
          unlocked(){return hasMilestone('F', 8)},
          
        },
        13: {
            name: "2 in 1",
            challengeDescription: "You trap in / and No upgrade factor.",
            canComplete(){return player.N.points.gte("3.14e9")},
            goalDescription: "3.14e9 Numbers",
            rewardDescription(){return "Unlock one number upgrade."},
          unlocked(){return hasMilestone('F', 12)},
          
        },
        21: {
            name: "No cap factor",
            challengeDescription: "'6', '7' and '8' is no effect.",
            canComplete(){return player.N.points.gte("3.14e12")},
            goalDescription: "3.14e12 Numbers",
            rewardDescription(){return "Factor will not reset upgrade, you can buy max factor."},
          unlocked(){return hasUpgrade('F', 13)},
          
        },
        22: {
            name: "No factor factor",
            challengeDescription: "Factor milestone 5 and upgrades is no effect.",
            canComplete(){return player.N.points.gte("1e20")},
            goalDescription: "1e20 Numbers",
            rewardDescription(){return "NO"},
          unlocked(){return hasUpgrade('F', 13)},
          
        },
    },

    layerShown(){return true}
})
addLayer("Hardcap", {
	startData() { return {unlocked: true}},
	color: "#ff8888",
	symbol: "H",
	row: "side",
	position: -1,
	layerShown() { return true },
	tooltip: "Hardcap",
    tabFormat: [
		"blank", "blank", "blank",
        ["raw-html", "<h1><a href=https://docs.google.com/document/d/1oT5siVj4lT8nnmHjPmAiSQL1NVSmNXQT8bpgUUqjBkM/edit target=_blank>Hardcap table</a></h1>"],
	],
})