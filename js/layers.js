addLayer("N", {
    name(){return "Numbers"
}, // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires(){
        return new Decimal(5)
    }, 
    resource(){return "Numbers"}, // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (inChallenge('I', 11)||inChallenge('I', 12)||inChallenge('I', 31)||inChallenge('I', 32)) mult = mult.times(1e50)
        if (hasAchievement("A", 14)) mult = mult.times(2)
        if (inChallenge('F', 33)|inChallenge('F',43)) mult = mult.times(0.000001)
        if (inChallenge('F', 31)) mult = mult.times(0.000001)
        if (hasMilestone('F',1580)&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))) mult = mult.times(buyableEffect('N',13))
        if (hasMilestone('F',8)) mult = mult.times(2)
        if (hasUpgrade('F',15)&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))) mult = mult.times(buyableEffect('N',11))
        if (hasUpgrade('N',44)&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))) mult = mult.times(buyableEffect('F',11))
        if (hasMilestone('NN',1e28)&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))) mult = mult.times(buyableEffect('F',13))
        if (hasUpgrade('F',15)&& !inChallenge('F',42)) mult = mult.times(2)
        if (inChallenge('F', 23)) mult = mult.times(0.3)
        if (hasChallenge('F', 21)) mult = mult.times(1.5)
        if (hasChallenge('F', 11)) mult = mult.times(3)
        if (hasUpgrade('NN', 11)&&(!inChallenge('NN',32)&&!hasChallenge('NN',32))) mult = mult.times(1e4)
        if (hasChallenge('F', 22)) mult = mult.times(2)
        if (hasAchievement("A", 12)) mult = mult.times(3)
        if (hasAchievement("A", 45)) mult = mult.times(1e5)
        if (hasUpgrade('F',12)) mult = mult.times(upgradeEffect('F', 12))
        if (inChallenge('F', 11)) mult = mult.times(0.3)
        if (inChallenge('F', 13)) mult = mult.times(0.3)
        if (hasChallenge('F', 12)) mult = mult.times(3)
        if (hasAchievement("A", 33)) mult = mult.times(5)
       if (hasUpgrade('N',14)) mult = mult.times(upgradeEffect('N', 14))
       if (hasUpgrade('UF',14)) mult = mult.times(upgradeEffect('UF', 14))
       if (hasUpgrade('UF',21)) mult = mult.times(upgradeEffect('UF', 21))
       if (hasUpgrade('F',11)) mult = mult.times(upgradeEffect('F', 11))
        if (hasMilestone('F', 1)) mult = mult.times(player.F.points.add(1))
        if (hasMilestone('MS', 1)) mult = mult.times(1e20)
        if (hasMilestone('F', 1100)) mult = mult.times(player.F.points.add(1))
        if (hasMilestone('UF', 52)) mult = mult.times(player.UF.points.pow(3).add(1))
        if (hasMilestone('UF', 128)) mult = mult.times(player.UF.points.pow(3).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult=new Decimal(1) 
        if (hasMilestone('UF',11)&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))) mult = mult.times(buyableEffect('N',21))
        if (hasUpgrade('NN',32)&&(!inChallenge('NN',32)&&!hasChallenge('NN',32))) mult = mult.times(1.25)
        if (hasUpgrade('UF',24)) mult = mult.times(upgradeEffect('UF',24))
        if (hasMilestone('I',1)) mult = mult.times(1.05)
        if (hasMilestone('I',2)) mult = mult.times(1.05)
        if (inChallenge('IP',11)) mult = mult.times(0.9)
        if (inChallenge('IP',21)) mult = mult.times(0.5)
        if (inChallenge('I',51)) mult = mult.times(0.9)
        if (inChallenge('I',52)) mult = mult.times(0.75)
        if (inChallenge('I',61)) mult = mult.times(0.6)
        if (inChallenge('I',62)) mult = mult.times(0.1)
        if (inChallenge('NN',11)) mult = mult.times(0.234)
        if (inChallenge('NN',12)) mult = mult.times(0.123)
        if (inChallenge('NN',21)) mult = mult.times(0.012)
        if (inChallenge('NN',22)) mult = mult.times(0.023)
        if (inChallenge('NN',31)) mult = mult.times(0.034)
        if (inChallenge('NN',32)) mult = mult.times(0.0011)
        if (inChallenge('IP',31)) mult = mult.times(0.15)
        if (inChallenge('I',11)) mult = mult.times(0.3)
        if (inChallenge('I',31)) mult = mult.times(0.09)
        if (inChallenge('I',41)) mult = mult.times(0.011)
        if (inChallenge('I',42)) mult = mult.times(0.001)
        if (inChallenge('I',22)) mult = mult.times(0.00003333333333)
        if (inChallenge('I',32)) mult = mult.times(5.26315789e-7)
        if (inChallenge('I',21)) mult = mult.times(0.166666)
        if (hasChallenge('I',11)) mult = mult.times(1.1)
        if (hasUpgrade('F',45)) mult = mult.times(1.1)
        if (hasChallenge('I',12)) mult = mult.times(1.2)
        if (hasChallenge('I',21)) mult = mult.times(1.3)
        if (hasChallenge('I',31)) mult = mult.times(1.4)
        if (hasChallenge('I',41)) mult = mult.times(1.5)
        if (hasChallenge('I',51)) mult = mult.times(1.1)
        if (hasChallenge('I',52)) mult = mult.times(1.1)
        if (hasChallenge('I',61)) mult = mult.times(1.1)
        if (hasChallenge('I',22)) mult = mult.times(1.6)
        if (hasChallenge('I',32)) mult = mult.times(1.7)
        if (hasChallenge('IP',31)) mult = mult.times(1.3)
        if (hasChallenge('IP',32)) mult = mult.times(1.35)
        if (hasUpgrade('F',31)&&!hasUpgrade('IP',56)) mult = mult.times(player.F.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1))
        if (hasUpgrade('F',43)&&!hasUpgrade('IP',56)) mult = mult.times(player.F.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1))
        if (hasUpgrade('IP',46)&&(!hasMilestone('IP',6000000))) mult = mult.times(player.I.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1))
        if (hasUpgrade('IP',56)) mult = mult.times(1.75)
        if (hasUpgrade('E',11)) mult = mult.times(2)
        if (hasChallenge('NN',11)) mult = mult.times(2)
        if (hasChallenge('NN',12)) mult = mult.times(2)
        if (hasUpgrade('UF',75)) mult = mult.times(1.5)
        if (hasChallenge('NN',21)) mult = mult.times(8)
        if (hasChallenge('NN',31)) mult = mult.times(1.5)
        if (hasChallenge('NN',32)) mult = mult.times(3)
        if (hasChallenge('NN',22)) mult = mult.times(player.FS.points.add(1).pow(0.5))
        if  (hasMilestone('IP',6000000)) mult = mult.times(3)
        if  (hasMilestone('E',1)) mult = mult.times(1.2)
        if  (hasMilestone('E',12)) mult = mult.times(player.E.points.add(1).log(10).add(1).log(10).add(1))
        if  (hasMilestone('E',300)) mult = mult.times(player.E.points.add(1).log(10).add(1).log(10).add(1))
        if(inChallenge('E',11)) mult = mult.times(player.E.Npower)
        if  (hasMilestone('E',500000)&&(inChallenge('E',11))) mult = mult.times(1.2)
        return mult

    },
    autoUpgrade(){
        if  (hasMilestone('MS',1)) return true
        else return false
    },


    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for Numbers", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.N.unlocked) doReset("N") },
    },
    ],
    

    doReset(resettingLayer) {
        let extraUpgrades = [];
        if (hasMilestone("I",3)) extraUpgrades.push(24,25,31,32,33,34,35,41);
        if (hasMilestone("NN",3)) extraUpgrades.push(16,26,36,46,12,13,14,44);
        if (hasUpgrade("N",51)) extraUpgrades.push(11,42,43,45,51);
        if (hasUpgrade("N",61)) extraUpgrades.push(61);
        if (hasUpgrade("N",62)) extraUpgrades.push(62);
        let keep = [];
        if (hasChallenge("F", 21) |(hasMilestone("I", 1))&& resettingLayer=="F") keep.push("upgrades")
        if (hasMilestone("UF", 1) && resettingLayer=="UF")  keep.push("upgrades")
        if (hasMilestone("IP", 1) && resettingLayer=="IP")  keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
        player[this.layer].upgrades.push(...extraUpgrades)
    },
    upgrades: {
        11: {
            title: "1",
            description(){ if(hasUpgrade('UF',11))  return "Points gain ^4."
                else return "Points gain x4."},
            cost: new Decimal(2),
        },
        12: {
            title: "2",
            description:"Numbers boost point gain.",
            cost: new Decimal(5),
            effect() {
                if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
                if(hasUpgrade("NN",15)) return 1e70
                if (inChallenge("F",33)) return 1
                if (inChallenge("F",32)) return 1
                if (inChallenge("F",23)) return 1
                if (inChallenge("F",21)) return 1000
                if (inChallenge("F",12)) return 1
                if (inChallenge("F",13)) return 1
                if (inChallenge("F",41)|inChallenge('F',43)) return 10
                if (player.N.points >=1e56&&hasUpgrade("F",23)&& !inChallenge('F',42)&& !inChallenge('F',43)) return 1e35
                if(hasUpgrade("F",23)&& !inChallenge('F',42)&& !inChallenge('F',43)) return player.N.points.pow(0.625).add(1)
                if (player.N.points >=1e24) return 1e15
                if(hasUpgrade("N",24)) return player.N.points.pow(0.625).add(1)
                if (player.N.points >=20235209214) return 5000000
                if(hasUpgrade("N",22)) return player.N.points.pow(0.65).add(1)
                if (player.N.points >=4641588) return 100000
                if(hasUpgrade("N",21)) return player.N.points.pow(0.75).add(1)
                if(hasUpgrade("N",15)) return 1000
                else return player.N.points.pow(0.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("N", 11)|hasMilestone("I", 1)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
            },
        },
        13: {
            title: "3",
            description: "Points boost themselves",
            cost: new Decimal(20),
            effect() {
                if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
                if(hasUpgrade("NN",15)) return 1e70
                if (inChallenge("F",33)) return 1
                if (inChallenge("F",32)) return 1
                if (inChallenge("F",23)) return 30
                if (inChallenge("F",21)) return 30
                if (inChallenge("F",41)|inChallenge('F',43)) return 10
                if (player.points >= 2.91e111&&!inChallenge('F',42)&& !inChallenge('F',43)) return 1e35
                if(hasUpgrade("N",35)) return player.points.pow(0.314).add(1)
                if (player.points >= 7.0328889e+31&&!inChallenge('F',42)&& !inChallenge('F',43)) return 1e10
                if(hasUpgrade("F",14) && !inChallenge('F',42)) return player.points.pow(0.314).add(1)
                if (player.points >= 4.60e15) return 50000
        if(hasUpgrade("N",23)) return player.points.pow(0.3).add(1)
        if(hasUpgrade("N",15)) return 30
        else return player.points.pow(0.25).add(1)

            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("N", 12)|hasMilestone("I", 1)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
            },
        },
        14: {
            title: "4",
            description: "Points boost Numbers gain.",
            cost: new Decimal(60),
            effect() {
                if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
                if(hasUpgrade("NN",15)) return 1e50
                if (inChallenge("F",33)) return 1
                if (inChallenge("F",32)) return 1
                if (inChallenge("F",21)) return 20
                if (inChallenge("F",23)) return 20
                if (inChallenge("F",41)|inChallenge('F',43)) return 10
                if (player.points >= 2.15e83) return 1e25
                if(hasUpgrade("N",34)) return player.points.pow(0.3).add(1)
                if (player.points >= 4.64e26) return 1e8
                if(hasUpgrade("N",25)) return player.points.pow(0.3).add(1)
                if (player.points >= 471556031) return 400
                if(hasUpgrade("N",21)) return player.points.pow(0.3).add(1)
                if(hasUpgrade("N",15)) return 20
                else return player.points.add(1).pow(0.2)
              

            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("N", 13)|hasMilestone("I", 1)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "5",
            description: "Boost '2', '3' and '4'.",
            cost: new Decimal(314),
    
            unlocked(){
                return hasUpgrade("N", 14)|hasMilestone("I", 1)&&!hasUpgrade("N", 51)
            },
            
        },
        21: {
            title: "6",
            description: "Remove the first hardcap of '2' and '4'.",
            cost: new Decimal(111111),
    
            unlocked(){
                return (hasMilestone('F', 1) && hasUpgrade("N", 15))|hasMilestone("I", 1)&&!hasUpgrade("N", 51)
            },
            
        },
        22: {
            title: "7",
            description: "Remove the second hardcap of '2' but nerf it.",
            cost: new Decimal(420420420),
    
            unlocked(){
                return (hasMilestone('F', 4) && hasUpgrade("N", 21))|hasMilestone("I", 1)&&!hasUpgrade("N", 51)
            },
            
        },
        23: {
            title: "8",
            description: "Remove the first hardcap of '3'.",
            cost: new Decimal(1e15),
    
            unlocked(){
                return (hasChallenge('F', 13) && hasUpgrade("N", 22))|hasMilestone("I", 1)&&!hasUpgrade("N", 51)
            },
            
        },
        24: {
            title: "9",
            description: "Remove the third hardcap of '2'.You can buy this upgrade while you are in Factor Challenge 4.",
            cost(){ 
                if(player.F.activeChallenge!=21)return new Decimal(Infinity);
                return new Decimal(1e12);
            },
            unlocked(){
                return (hasUpgrade('F', 13) && hasUpgrade("N", 23))|hasMilestone("I", 1)&&!hasUpgrade("N", 51)
            
            },
            
        },
        25: {
            title: "10",
            description: "Remove the second hardcap of '4'.You can buy this upgrade while you are in Factor Challenge 5.",
            cost(){ 
                if(player.F.activeChallenge!=22)return new Decimal(Infinity);
                return new Decimal(3.14e13);
            },
            unlocked(){
                return (hasUpgrade('F', 13) && hasUpgrade("N", 24))|hasMilestone("I", 1)&&!hasUpgrade("N", 51)
            },
            
        },
        31: {
            title: "11",
            description: "'+' base x2. You can buy this upgrade while you are in Factor Challenge 6.",
            cost(){ 
                if(player.F.activeChallenge!=23)return new Decimal(Infinity);
                return new Decimal(3.14e10);
            },
            unlocked(){
               return hasMilestone("I", 1)&&!hasUpgrade("N", 51)||player.UF.best.gte(2)&&!hasUpgrade("N", 51)
            },
            
        },
        32: {
            title: "12",
            description: "'+' base x2. You can buy this upgrade while you are in Factor Challenge 3.",
            cost(){ 
                if(player.F.activeChallenge!=13)return new Decimal(Infinity);
                return new Decimal(3.14e16);
            },
            unlocked(){
                {return hasMilestone('F',90)|hasMilestone("I", 1)&&!hasUpgrade("N", 51)}
            },
            
        },
        33: {
            title: "13",
            description: "'+' work in 'Buyable Upgrader' but nerf it in 'Buyable Upgrader'",
            cost(){ 
                return new Decimal(3.14e98);
            },
            unlocked(){
                {return player.UF.best.gte(4)|hasMilestone("I", 1)&&!hasUpgrade("N", 51)}
            },
            
        },
        34: {
            title: "14",
            description: "Remove the third hardcap of '4'. You can buy this upgrade while you are in Factor Challenge 9.",
            cost(){ 
                if(player.F.activeChallenge!=33)return new Decimal(Infinity);
                return new Decimal(1e32);
            },
            unlocked(){
                {return player.UF.best.gte(8)|hasMilestone("I", 1)&&!hasUpgrade("N", 51)}
            },
            
        },
        35: {
            title: "15",
            description: "Remove the third hardcap of '3'. You can buy this upgrade while you are in Factor Challenge 11.",
            cost(){ 
                if(player.F.activeChallenge!=42)return new Decimal(Infinity);
                return new Decimal(1e60);
            },
            unlocked(){
                {return hasMilestone('F',1333)|hasMilestone("I", 1)&&!hasUpgrade("N", 51)}
            },
            
        },
        41: {
            title: "16",
            description: "'x' is better. You can buy this upgrade while you are in Upgrade Factor Challenge 2.",
            cost(){ 
                if(player.UF.activeChallenge!=12)return new Decimal(Infinity);
                return new Decimal(1e262);
            },
            unlocked(){
                {return hasMilestone('UF',16)&&!hasUpgrade("N", 51)}
            },
        },
        42: {
                title: "17",
                description: "Factors are cheaper.",
                cost: new Decimal("3.14e348"),
                unlocked(){
                    {return hasMilestone('UF',16)&&!hasChallenge('NN',22)&&!inChallenge('NN',22)}
                },
        },
        43: {
            title: "18",
            description: "Upgrade factors are cheaper.",
            cost: new Decimal("3.14e378"),
            unlocked(){
                {return hasMilestone('UF',16)&&!hasChallenge('NN',22)&&!inChallenge('NN',22)}
            },
    },
        44: {
        title: "19",
        description: " Unlock the first factor buyable",
        cost: new Decimal("1e413"),
        unlocked(){
            {return hasMilestone('UF',16)&&!hasChallenge('NN',21)&&!inChallenge('NN',21)}
        },
    },
    45: {
        title: "20",
        description: "Unlock another buyable and a new numbers upgrade",
        cost: new Decimal("1e477"),
        unlocked(){
            {return hasMilestone('UF',16)&&!hasChallenge('NN',21)&&!inChallenge('NN',21)}
        },
    },
    16: {
        title: "Master +",
        description: "The '+' effect is always 1e120",
        cost: new Decimal("1e487"),
        unlocked(){
            {return hasUpgrade('N',45)|hasMilestone("I", 2)&&!hasUpgrade("F", 51)}
        },
    },
    26: {
        title: "Master -",
        description: "The '-' effect is always 1e50",
        cost: new Decimal("1e785"),
        unlocked(){
            {return hasMilestone('I',2)&&!hasUpgrade("F", 51)}
        },
    },
    36: {
        title: "Master x",
        description: "The 'x' effect is always 1e100",
        cost: new Decimal("3.14e845"),
        unlocked(){
            {return hasMilestone('UF',128)&&!hasUpgrade("F", 51)}
        },
    },
    46: {
        title: "Master /",
        description: "The '/' effect is always 2.1 ",
        cost: new Decimal("1e895"),
        unlocked(){
            {return hasMilestone('UF',128)&&!hasUpgrade("F", 51)}
        },
    },
    51: {
        title: "0",
        description: "Remove some useless upgrade and unlock some Negative Number upgrades. Keep all upgrade on ALL reset.",
        cost: new Decimal("1.8e308"),
        unlocked(){
            {return hasChallenge('UF',12)}
        },
        style: {width: "700px"},
    },
    61: {
        title: "π",
        description: "Factor exponent is: 0.314 (Factors are cheaper)",
        cost: new Decimal("1e4720"),
        unlocked(){
            {return hasUpgrade('F',35)&&!hasChallenge('NN',22)&&!inChallenge('NN',22)}
        },
    },
    62: {
        title: "e",
        description: "Factor exponent is: 0.271(Factors are cheaper)",
        cost: new Decimal("1e17500"),
        unlocked(){
            {return hasUpgrade('NN',34)&&!hasChallenge('NN',22)&&!inChallenge('NN',22)}
        },
    },
   

       },
       buyables: {
        rows: 2,
        cols: 3,
        11: {
            title: "+",
            display() {
                if(hasUpgrade('N',16)) return "Boosts Numbers gain by " + format(tmp.N.buyables[11].effect) + "x<br>Cost : " + " Infinity Numbers"
              else return "Boosts Numbers gain by " + format(tmp.N.buyables[11].effect) + "x<br>Cost : " + format(new Decimal("1e4").pow(getBuyableAmount("N", 11).add(1))) + " Numbers"
            },
            unlocked() { return hasUpgrade("F", 15)|hasMilestone("I", 1) },
            canAfford() { 
                if(hasUpgrade('N',16)) return player.N.points.gte(new Decimal(1e1000))
                else return player.N.points.gte(new Decimal("1e4").pow(getBuyableAmount("N", 11).add(1))) 
            },
            buy() { 
                {
                   player.N.points = player.N.points.minus(new Decimal("1e4").pow(getBuyableAmount("N", 11).add(1)))
                }
                setBuyableAmount("N", 11, getBuyableAmount("N", 11).add(1))
            },
            effect() { 
                if (inChallenge('I',12)) eff = new Decimal("1")
                if (hasUpgrade('N',31)) eff = new Decimal("6").pow(getBuyableAmount("N", 11))
                else   eff = new Decimal("3").pow(getBuyableAmount("N", 11))
                if (hasUpgrade('N',32)) eff = new Decimal("12").pow(getBuyableAmount("N", 11))
                
                if ( player.UF.challenges[11]>=1) eff = new Decimal("24").pow(getBuyableAmount("N", 11))
                if ( player.UF.challenges[11]>=2) eff = new Decimal("36").pow(getBuyableAmount("N", 11))
                if ( player.UF.challenges[11]>=3) eff = new Decimal("50").pow(getBuyableAmount("N", 11))
                if (inChallenge('UF',11)) eff = new Decimal("1")
                if (inChallenge('UF',11) && hasUpgrade('N',33)) eff =  new Decimal("3").pow(getBuyableAmount("N", 11))
                if (eff>=1e50 &&(!hasMilestone('F',6000))&&(!hasUpgrade('N',16))&&(!hasMilestone('F',12500))&&!inChallenge('I',12)) return eff = new Decimal("1e50")
             else if (eff>=1e64&&(hasMilestone('F',6000))&&(!hasMilestone('F',12500))&&(!hasUpgrade('N',16))&&!inChallenge('I',12)) return eff = new Decimal("1e64")
                else if (eff>=1e75&&(hasMilestone('F',12500))&&(!hasUpgrade('N',16))&&!inChallenge('I',12)) return eff = new Decimal("1e75")
                else if (hasUpgrade('N',16)&&!inChallenge('I',12)&&!hasUpgrade('F',16)) return eff = new Decimal("1e120")
                else if (hasUpgrade('F',16)) return eff = new Decimal("1.79e308")
                else if (inChallenge('I',12))return eff = new Decimal("1")
                else return eff = eff
                
               
                
            }
        },
        12: {
            title: "-",
            display() {
                if(hasUpgrade('N',26))  return "Boosts points gain by " + format(tmp.N.buyables[12].effect) + "x<br>Cost : " + " Infinity Numbers"
               if (hasChallenge('F',42)) return "Boosts points gain by " + format(tmp.N.buyables[12].effect) + "x<br>Cost : " + format(new Decimal("1e6").pow(getBuyableAmount("N", 12).add(1))) + " Numbers"

                else return "Boosts points gain by " + format(tmp.N.buyables[12].effect) + "x<br>Cost : " + format(new Decimal("1e10").pow(getBuyableAmount("N", 12).add(1))) + " Numbers"
            },
            unlocked() { return hasChallenge("F", 31)|hasMilestone("I", 1) },
            canAfford() { 
                if(hasUpgrade('N',26)) return player.N.points.gte(new Decimal(1e1000))
                else if (hasChallenge('F',42)) return player.N.points.gte(new Decimal("1e6").pow(getBuyableAmount("N", 12).add(1))) 
                else return player.N.points.gte(new Decimal("1e10").pow(getBuyableAmount("N", 12).add(1))) 
            },
            buy() { 
                {
                   if (hasChallenge('F',42)) player.N.points = player.N.points.minus(new Decimal("1e6").pow(getBuyableAmount("N", 12).add(1)))
                   else  player.N.points = player.N.points.minus(new Decimal("1e10").pow(getBuyableAmount("N", 12).add(1)))
                }
                setBuyableAmount("N", 12, getBuyableAmount("N", 12).add(1))
            },
            effect() { 
                
                 if (hasChallenge('F',32)) eff = new Decimal("4").pow(getBuyableAmount("N", 12))
                else eff = new Decimal("2").pow(getBuyableAmount("N", 12))
                if (hasChallenge('F',33)) eff = new Decimal("8").pow(getBuyableAmount("N", 12))
                 if (inChallenge('UF',11)) eff = new Decimal("1")
                
                 if (eff>=1e20&& ( player.UF.challenges[11]<=3)&&(!hasUpgrade('N',26))&&!inChallenge('I',12)) return eff = new Decimal("1e20")
                 else if (eff>=1e30&& ( player.UF.challenges[11]>=4)&&(!hasUpgrade('N',26))&&!inChallenge('I',12)) return eff = new Decimal("1e30")
                else if (hasUpgrade('N',26)&&!inChallenge('I',12) )return eff = new Decimal("1e50")
                else if (inChallenge('I',12))return eff = new Decimal("1")
                else return eff = eff
    
               
              
                
            }
        },
        13: {
            title: "x",
            display() {
                if(hasUpgrade('N',36)) return "Boosts numbers gain by " + format(tmp.N.buyables[13].effect) + "x<br>Cost : " + " Infinity Numbers"
                else if (inChallenge('UF',12)) return "Boosts numbers gain by " + format(tmp.N.buyables[13].effect) + "x<br>Cost : " + format(new Decimal("1e35").pow(getBuyableAmount("N", 13).add(1))) + " Numbers"
              else return "Boosts numbers gain by " + format(tmp.N.buyables[13].effect) + "x<br>Cost : " + format(new Decimal("1e20").pow(getBuyableAmount("N", 13).add(1))) + " Numbers"
            },
            unlocked() { return hasMilestone("F", 1580)|hasMilestone("I", 1) },
            canAfford() { 
                if(hasUpgrade('N',36)) return player.N.points.gte(new Decimal(1e1000))
                else if (inChallenge('UF',12)) return player.N.points.gte(new Decimal("1e35").pow(getBuyableAmount("N", 13).add(1))) 
               else return player.N.points.gte(new Decimal("1e20").pow(getBuyableAmount("N", 13).add(1))) 
            },
            buy() { 
                {
                    if (inChallenge('UF',12)) player.N.points = player.N.points.minus(new Decimal("1e35").pow(getBuyableAmount("N", 13).add(1)))
                 else player.N.points = player.N.points.minus(new Decimal("1e20").pow(getBuyableAmount("N", 13).add(1)))
                }
                setBuyableAmount("N", 13, getBuyableAmount("N", 13).add(1))
            },
            effect() { 
                if (inChallenge('I',12)) eff = new Decimal("1")
           if (hasUpgrade('N',41)&&(!hasUpgrade('N',36))&&eff<=1e85) eff  = new Decimal(player.N.points.add(1).log(10).pow(0.65).add(1)).pow(getBuyableAmount("N", 13))
            
         else if(!hasUpgrade('N',36)&&eff<=1e85) return eff  = new Decimal(player.N.points.add(1).log(10).pow(0.5).add(1)).pow(getBuyableAmount("N", 13))
         else if(!hasUpgrade('F',26)&&!hasUpgrade('N',36)&&eff>=1e85) return eff = new Decimal("1e85")
        else if(hasUpgrade('N',36)&&!hasUpgrade('F',26)) return eff = new Decimal("1e100")
        if(hasUpgrade('F',26)) return eff = new Decimal("1.79e308")
        return eff=eff

                  
            }
        },
        21: {
            title: "/",
            display() {
                if(hasUpgrade('N',46)) return "Numbers gain ^ " + format(tmp.N.buyables[21].effect) + "<br>Cost : " + " Infinity Numbers"
                if (inChallenge('UF',12)) return "Numbers gain ^ " + format(tmp.N.buyables[21].effect) + "<br>Cost : " + format(new Decimal("1e60").pow(getBuyableAmount("N", 21).add(1))) + " Numbers"

                else return "Numbers gain ^" + format(tmp.N.buyables[21].effect) + "<br>Cost : " + format(new Decimal("1e35").pow(getBuyableAmount("N", 21).add(1))) + " Numbers"
            },
            unlocked() { return hasMilestone("UF", 11)|hasMilestone("I", 1) },
            canAfford() { 
                if(hasUpgrade('N',46)) return player.N.points.gte(new Decimal(1e1000))
                else if (inChallenge('UF',12))  return player.N.points.gte(new Decimal("1e60").pow(getBuyableAmount("N", 21).add(1))) 
               else return player.N.points.gte(new Decimal("1e35").pow(getBuyableAmount("N", 21).add(1))) 
            },
            buy() { 
                {
                   if (inChallenge('UF',12))  player.N.points = player.N.points.minus(new Decimal("1e60").pow(getBuyableAmount("N", 21).add(1)))
                else  player.N.points = player.N.points.minus(new Decimal("1e35").pow(getBuyableAmount("N", 21).add(1)))
                }
                setBuyableAmount("N", 21, getBuyableAmount("N", 21).add(1))
            },
            effect() { 

                eff = new Decimal("1").add(0.04).pow(getBuyableAmount("N", 21)) 
                if (inChallenge('I',12)) eff = new Decimal("1")
                else if (eff>=2&&(!hasUpgrade('N',46))) return eff = new Decimal("2")
                else if(hasUpgrade('N',46)&&!hasUpgrade('F',36)) return eff = new Decimal("2.1") 
                else if(hasUpgrade('F',36)) return eff = new Decimal("3.08") 
                return eff = eff
                  
            }
        },
        22: {
            title: "^",
            display() {
               return "Boost negative numbers gain by " + format(tmp.N.buyables[22].effect) + "x<br>Cost : " + format(new Decimal("1e1000").pow(getBuyableAmount("N", 22).add(1))) + " Numbers"
            },
            unlocked() { return hasAchievement("A", 41) },
            canAfford() { 
                return player.N.points.gte(new Decimal("1e1000").pow(getBuyableAmount("N", 22).add(1))) 
            },
            buy() { 
                {
                  player.N.points = player.N.points.minus(new Decimal("1e1000").pow(getBuyableAmount("N", 22).add(1)))
                }
                setBuyableAmount("N", 22, getBuyableAmount("N", 22).add(1))
            },
            effect() { 
                if(hasUpgrade('IP',44))  eff = new Decimal("1")
                else eff = new Decimal("10").pow(getBuyableAmount("N", 22)) 
                return eff = eff
                  
            }
        },
    
    
    
       
    },
    tabFormat: {
      
      "Upgrades":{
        unlocked(){return hasMilestone('F',5)|hasMilestone("I", 1)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
        "blank",
        "resource-display",
          "blank",
          "blank",
          "upgrades",
        ]
      },

      "Buyables":{
        unlocked(){return (hasUpgrade('F',15)||hasMilestone("I", 1))&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "buyables",
        ]
      },
      },
passiveGeneration(){return hasMilestone('F',5) && (!inChallenge('F',22)) && (!inChallenge('F',23)) && (!inChallenge('F',42)&& (!inChallenge('F',43)))? 1 : 0},
automateStuff(){
    if(hasMilestone("I",69)){
      if(layers.N.buyables[22].canAfford())setBuyableAmount("N",22,player.N.points.log("1e1000").floor())
      
    }
},
    layerShown(){return true}
})
addLayer("NN", {
    name: "Negative numbers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffa0ff",
    requires(){
        if(hasMilestone('I',7)&&((inChallenge('I',11))||(inChallenge('I',12))||(inChallenge('I',21))||(inChallenge('I',31)))) return new Decimal("1e400")
        if(hasMilestone('I',6)&&((inChallenge('I',11))||(inChallenge('I',12))||(inChallenge('I',21)))) return new Decimal("1e470")
        else return new Decimal("1e940")
    }, // Can be a function that takes requirement increases into account
    resource(){return "Negative numbers"
    }, // Name of prestige currency
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
     return 0.01
    },
    branches:["N"],
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('IP',11)) mult = mult.times(buyableEffect('NN',11))
        if (hasMilestone('I',69)) mult = mult.times(player.I.points.add(1).pow(7.5))
        if (hasAchievement('A',41)) mult = mult.times(buyableEffect('N',22))
        if (hasUpgrade('F', 42)) mult = mult.times(player.F.points.add(1))
         if (hasMilestone('I',4)) mult = mult.times(10)
         if (hasUpgrade('IP',44)) mult = mult.times("1e80000")
        if (hasUpgrade('NN',14)) mult = mult.times(upgradeEffect('NN', 14))
        if (hasUpgrade('IP', 21)) mult = mult.times(player.IP.points.pow(10).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult=new Decimal(1) 
        if (hasChallenge('IP',11)) mult = mult.times(1.1)
        if (hasChallenge('IP',12)) mult = mult.times(1.15)
        if (hasChallenge('IP',21)) mult = mult.times(1.2)
        if (hasChallenge('IP',22)) mult = mult.times(1.25)
        if (inChallenge('I',51)) mult = mult.times(1.2)
        if (inChallenge('I',52)) mult = mult.times(1.4)
        if (inChallenge('I',61)) mult = mult.times(1.8)
        if (inChallenge('I',62)) mult = mult.times(3)
        if (hasMilestone('IP',10000)) mult = mult.times(1.05)
        if(inChallenge('E',11)&&(!player.E.NNpower.gte(1))) mult = mult.times(0)
        if(inChallenge('NN',32)||hasChallenge('NN',32)) mult = mult.times(0)
        
        return mult
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "N", description: "shift + N: Reset for Negative number", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.UF.unlocked) doReset("NN") },
        unlocked() {return hasMilestone('I', 3)} // Determines if you can use the hotkey, optional
    },
    ],
    softcap(){if (hasMilestone('MS',2))return new Decimal("eee1000") 
else return new Decimal("1e450000") },
    softcapPower(){return new Decimal("0.00000001") },
  
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "-1",
            description: "Number gain x1e4.",
            cost: new Decimal(2),
        },
        12: {
            title: "-2",
            description:"Negative numbers boost point gain.",
            cost: new Decimal(5),
            effect() {
                if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
                if(inChallenge('IP',32))return new Decimal("1")
                if(inChallenge('IP',22))return new Decimal("1")
                else if (player.NN.points.gte("1e1000")) return new Decimal("1e5000")
                else if(hasUpgrade('IP',22)) return player.NN.points.add(1).pow(5)
                else if (player.NN.points >=1e250) return new Decimal("1e1500")
                else if(hasUpgrade('NN',34)) return player.NN.points.add(1).pow(6)
                else if (player.NN.points >=1e40) return new Decimal("1e600")
                else if(hasUpgrade('NN',24)) return player.NN.points.add(1).pow(15)
                else if (player.NN.points >=1e24) return 1e300
                else if(hasUpgrade('NN',23)) return player.NN.points.add(1).pow(12.5)
                else if (player.NN.points >=1e15) return 1e150
                else if(hasUpgrade('NN',22)) return player.NN.points.add(1).pow(10)
                else if (player.NN.points >=3981071705.53) return 1e72
                
                else if(hasUpgrade('NN',21)) return player.NN.points.pow(0.75).add(1).pow(10)
                else if (player.NN.points >=1000000) return 1e30
                else    return player.NN.points.pow(0.5).add(1).pow(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("NN", 11)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
            },
        },
        13: {
            title: "-3",
            description: " Points boost themselves",
            cost: new Decimal(25),
            effect() {
                if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
                if(inChallenge('IP',32))return new Decimal("1")
                if (player.points.gte("1e10000")) return new Decimal("1e2000")
                else if(hasUpgrade('IP',32)) return player.points.add(1).pow(0.2)
                else if (hasUpgrade('NN',31)) return player.points.add(1).pow(0.15)
                else return 1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("NN", 31)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    14: {
        title: "-4",
        description: "Negative Numbers boost themselves",
        cost: new Decimal(15),
        effect() {
            if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
            if(inChallenge('IP',32))return new Decimal("1")
            if(inChallenge('IP',12))return new Decimal("1")
            else if (player.NN.points.gte("1e2000")) return new Decimal("1e600")
            else if(hasUpgrade('IP',13)) return player.NN.points.pow(0.3).add(1)
            else if (player.NN.points >=4.6415888e+66) return 1e50
            else if(hasUpgrade('NN',25)) return player.NN.points.pow(0.75).add(1)
            else if (player.NN.points >=1e20) return 1e15
            else if(hasUpgrade('NN',22)) return player.NN.points.pow(0.75).add(1)
            else if (player.NN.points>= 2.1544347e+13) return 1e8
            
            else if (hasUpgrade('NN',21)) return player.NN.points.pow(0.6).add(1)
           
            else if (player.NN.points>= 3200000) return 400
            else return player.NN.points.pow(0.4).add(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked(){
            return hasUpgrade("NN", 12)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    15: {
        title: "-5",
        description: "Boost '2', '3', '4'.",
        cost: new Decimal(3141),
     
        unlocked(){
            return hasUpgrade("NN", 14)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    21: {
        title: "-6",
        description: "Boost '-2' and '-4'",
        cost: new Decimal(111111),
     
        unlocked(){
            return hasUpgrade("NN", 15)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    22: {
        title: "-7",
        description: "Boost '-2' and '-4'",
        cost: new Decimal(4.20e9),
     
        unlocked(){
            return hasUpgrade("N", 51)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    23: {
        title: "-8",
        description: "Boost '-2'",
        cost: new Decimal(1e18),
     
        unlocked(){
            return hasUpgrade("NN", 22)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    24: {
        title: "-9",
        description: "Remove the fourth hardcap of '-2'. You can buy this upgrade while you are in Infinity Challenge 1.",
        cost(){ 
            if(player.I.activeChallenge!=11)return new Decimal(Infinity);
            return new Decimal(3.14e9);
        },
        unlocked(){
            return (hasMilestone('I',6))&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        
        },
        
    },
    25: {
        title: "-10",
        description: "Remove the third hardcap of '-4'. You can buy this upgrade while you are in Infinity Challenge 2.",
        cost(){ 
            if(player.I.activeChallenge!=12)return new Decimal(Infinity);
            return new Decimal(3.14e9);
        },
        unlocked(){
            return (hasMilestone('I',7))&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
        },
        31: {
            title: "-11",
            description: "unlock '-3'. You can buy this upgrade while you are in Infinity Challenge 3.",
            cost(){ 
                if(player.I.activeChallenge!=21)return new Decimal(Infinity);
                return new Decimal(3.14e9);
            },
            unlocked(){
                return (hasUpgrade('F',34))&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
            },
            },
            32: {
                title: "-12",
                description: "Number ^1.25",
                cost: new Decimal(1e103),
             
                unlocked(){
                    return hasUpgrade("F", 42)
                },
            },
            33: {
                title: "-13",
                description: "Unlock Infinity challenge 5.",
                cost: new Decimal(1e117),
             
                unlocked(){
                    return hasUpgrade("NN", 32)
                },
            },
            34: {
                title: "-14",
                description: "Unlock 1 Number Upgrade and Remove the hardcap of -2.",
                cost: new Decimal(1e177),
             
                unlocked(){
                    return hasUpgrade("NN", 33)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
                },
            },
},
    milestones: {
        3: {
            requirementDescription: "3 Negative numbers",
            effectDescription: "Keep master +, -, x, /, '2', '3', '4' and '19' on ALL resets.",
            done() { return player.NN.points.gte(3) }
        },
        4e21: {
            requirementDescription: "4e21 Negative number",
            effectDescription: "Unlock the first infinity challenge",
            done() { return player.NN.points.gte(4e21) }
        },
        1e28: {
            requirementDescription: "1e28 Negative number",
            effectDescription: "Unlock the third factor buyable",
            done() { return player.NN.points.gte(1e28) }
        },
        1e50: {
            requirementDescription: "'-4' effect >= 1e48",
            effectDescription: "factor are cheaper.",
            done() { return player.NN.points.gte(1e64) }
        },
        1.79e308: {
            requirementDescription: "1.79e308 Negative numbers",
            effectDescription: "Unlock a new layer.",
            done() { return player.NN.points.gte(1.79e308) }
        },
    },
    buyables: {
        rows: 2,
        cols: 3,
        11: {
            title: "-+",
            display() {
               return "Boosts Negative numbers gain by " + format(tmp.NN.buyables[11].effect) + "x<br>Cost : " + format(new Decimal("1e20").pow(getBuyableAmount("NN", 11).add(1))) + " Negative numbers"
            },
            unlocked() { return hasUpgrade("IP", 11) },
            canAfford() { 
               return player.NN.points.gte(new Decimal("1e20").pow(getBuyableAmount("NN", 11).add(1))) 
            },
            buy() { 
                {
                   player.NN.points = player.NN.points.minus(new Decimal("1e20").pow(getBuyableAmount("NN", 11).add(1)))
                }
                setBuyableAmount("NN", 11, getBuyableAmount("NN", 11).add(1))
            },
            effect() { 
                if(hasUpgrade('IP',44))  eff = new Decimal("1")
        else  eff = new Decimal("50").pow(getBuyableAmount("NN", 11))   
        return eff
            }
        },
    },
    challenges:{
        11: {
            name: "Negative 2, 3, 4",
            challengeDescription: "Number gain ^0.234 and '2', '3', '4', '-2', '-3' and '-4' is disabled ",
            canComplete(){return player.N.points.gte("1e5791750")},
            goalDescription: "1e5,791,750 numbers",
            rewardDescription(){return "Number ^2 but '2', '3', '4', '-2', '-3' and '-4' is disabled and nerf factor beta."},
          unlocked(){return hasMilestone('IP',38500)},
        },
        12: {
            name: "Negative UFC",
            challengeDescription: "Number gain ^0.123 and FC, UFC effect are disabled (You need to reload to complete FC after exit it.)",
            canComplete(){return player.N.points.gte("1e4413600")},
            goalDescription: "1e4,413,600 numbers",
            rewardDescription(){return "Number ^2 but FC, UFC effect are disabled and nerf factor beta."},
          unlocked(){return hasChallenge('NN',11)},
          onEnter(){
            player.F.challenges=[]
            player.UF.challenges=[] }
        },
        21: {
            name: "Negative buyable",
            challengeDescription: "Number gain ^0.012 and Row 1 to Row 2 buyable are disabled ",
            canComplete(){return player.N.points.gte("1e247222")},
            goalDescription: "1e247,222 numbers",
            rewardDescription(){return "Number ^8 but Row 1 to Row 2 buyable are disabled and nerf factor beta."},
          unlocked(){return hasChallenge('NN',12)},
        },
        22: {
            name: "Negative cheaper",
            challengeDescription: "Number gain ^0.023 and Factor, Upgrade factor are more expensive.",
            canComplete(){return player.N.points.gte("1e4148000")},
            goalDescription: "1e4,148,000 numbers",
            rewardDescription(){return "FS boost point gain but Factor, Upgrade factor are more expensive."},
          unlocked(){return hasChallenge('NN',21)},
          onEnter(){
            player.F.points=new Decimal(0)
            player.UF.points=new Decimal(0) }
        },
        31: {
            name: "Negative upgrade factor",
            challengeDescription: "Number gain ^0.034 and Remove UF layer.",
            canComplete(){return player.N.points.gte("1e130828282")},
            goalDescription: "1e130,828,282 numbers",
            rewardDescription(){return "Number ^1.5 and unlock 1 feature in UF layer."},
          unlocked(){return hasUpgrade('IP',66)},
         onEnter(){return player.UF.points=new Decimal(0)},
    },
    32: {
        name: "Negative Negative numbers",
        challengeDescription: "Number gain ^0.0011 and Remove All feature in NN layer (exclude NN challenge) and you can't get NN, IP is base on Number.",
        canComplete(){return player.N.points.gte("e3.333e14")},
        goalDescription: "e3.333e14 numbers",
        rewardDescription(){return "Number ^3 but remove NN layer (You still have Challenge reward). Unlock 1 UF upgrade."},
      unlocked(){return hasMilestone('E',5000)},
     onEnter(){player.NN.points=new Decimal(0)
        player.IP.points=new Decimal(0)
        player.I.points=new Decimal(0)},
},
    },
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("I", 4) && resettingLayer=="I") keep.push("milestones")
        if (hasMilestone("I", 4) && resettingLayer=="I") keep.push("upgrades")
        if (hasMilestone("IP", 2) && resettingLayer=="IP") keep.push("upgrades")
        if (hasMilestone("E", 5) && resettingLayer=="E") keep.push("upgrades")
        if (hasMilestone("IP", 2) && resettingLayer=="IP") keep.push("milestones")
        if (resettingLayer=="I") keep.push("challenges")
        if (resettingLayer=="IP") keep.push("challenges")
        if (resettingLayer=="FS") keep.push("challenges")
        if (resettingLayer=="MS") keep.push("challenges")
        if (resettingLayer=="E") keep.push("challenges")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    tabFormat: {
        "Milestones":{
          content:[
        "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
        "blank",
        "resource-display",
        "blank",
        "blank",
        "milestones",
          ]},
      
      "Upgrades":{
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "upgrades",
        ]
      },
      "Buyables":{
        unlocked(){return hasUpgrade('IP',11)&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "buyables",
        ]
      },
      "Challenges":{
        unlocked(){return hasMilestone('IP',38500)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "challenges",
        ]
      },
      },
      layerShown(){return (player.I.best.gte(3)||hasMilestone('E',1))&&!hasChallenge('NN',32)},
      passiveGeneration(){return hasMilestone('IP',6)? 1 : 0},
      automateStuff(){
        if(hasUpgrade("IP",21)){
          if(layers.NN.buyables[11].canAfford())setBuyableAmount("NN",11,player.NN.points.log(1e20).floor().add(1))
        
        }
    },
})
addLayer("UF", {
    name: "Upgrade Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(1e30),
    resource(){return "Upgrade Factor"
}, // Can be a function that takes requirement increases into account
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base:1e10,
    exponent(){
      if(inChallenge('NN',22)||hasChallenge('NN',22))return 1
        if(hasUpgrade('F',44))return 0.5
        if(hasUpgrade('F',41))return 0.6
        if(hasUpgrade('N',43))return 0.9
        else return 1.25
    },
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
        {key: "u", description: "U: Reset for Upgrade Factor", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.UF.unlocked) doReset("UF") },
        unlocked() {return hasChallenge('F', 22)} // Determines if you can use the hotkey, optional
    },
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("I", 2) && resettingLayer=="I") keep.push("milestones")
        if (hasMilestone("IP", 6) && resettingLayer=="IP") keep.push("milestones")
        if (hasUpgrade("UF", 11) && resettingLayer=="I") keep.push("upgrades")
        if (hasUpgrade("UF", 11) && resettingLayer=="IP") keep.push("upgrades")
        if (hasUpgrade("UF", 11) && resettingLayer=="FS") keep.push("upgrades")
        if (hasUpgrade("UF", 11) && resettingLayer=="MS") keep.push("upgrades")
        if (hasMilestone("E", 8) && resettingLayer=="E") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    milestones: {
        1: {
            requirementDescription: "1 Upgrade Factor",
            effectDescription: "First four Upgrade Factor Unlock 1 upgrade and point x2, keep upgrade on reset",
            done() { return player.UF.points.gte(1) }
        },
        6: {
            requirementDescription: "6 Upgrade Factor",
            effectDescription: "Unlock 1 upgrade.",
            done() { return player.UF.points.gte(6) }
        },
        8: {
            requirementDescription: "8 Upgrade Factor",
            effectDescription: "Unlock 1 upgrade.",
            done() { return player.UF.points.gte(8) }
        },
        10: {
            requirementDescription: "10 Upgrade Factor",
            effectDescription: "Unlock 1 challenge (not upgrade) and point x10000.",
            done() { return player.UF.points.gte(10) }
        },
        11: {
            requirementDescription: "11 Upgrade Factor",
            effectDescription: "Unlock 1 buyable (not upgrade).",
            done() { return player.UF.points.gte(11) }
        },
        16: {
            requirementDescription: "16 Upgrade Factor",
            effectDescription: "Auto buy Upgrade Factor, unlock 1 challenge and 5 upgrade.",
            done() { return player.UF.points.gte(16)||hasMilestone("MS", 2) }
        },
        18: {
            requirementDescription: "18 Upgrade Factor",
            effectDescription: "Upgrade factor reset nothing.",
            done() { return player.UF.points.gte(18)||hasMilestone("MS", 2) }
        },
        52: {
            requirementDescription: "52 Upgrade Factor",
            effectDescription: "Upgrade Factor boost point and Numbers gain.",
            done() { return player.UF.points.gte(52) }
        },
        128: {
            requirementDescription: "128 Upgrade Factor",
            effectDescription: "Unlock 2 Number upgrades and boost the eighth milestone.",
            done() { return player.UF.points.gte(128) }
        },
        

    },
    autoPrestige(){
        return hasMilestone('UF',16);
    },resetsNothing(){
        return hasMilestone('UF',18) ;
    },
    
    challenges: {
        11: {
           
            completionLimit(){
                let limit=4;
                return limit;
            },
            name: "Buyable upgrader",
            challengeDescription: "'+' and '-' have no effect (You can do 4 times)",
            goal: function(){
                return [new Decimal("1e30"),new Decimal("1e45"),new Decimal("1e52"),new Decimal("1e65"),new Decimal(Infinity)][player.UF.challenges[11]];
        },
            rewardDescription(){return "'+' is better' (1-3) and Remove 1 hardcap of '-'  (4)."},
          unlocked(){return hasUpgrade('F', 22)|hasMilestone("I", 1)},

    },
    12: {
           
      
        name: "Upgrade Upgrader",
        challengeDescription: "'x' and '/' cost is higher",
        canComplete(){return player.points.gte("1.79e308")},
            goalDescription: "1.79e308 point",
    rewardDescription(){return "Unlock 1 Number Upgrade."},
      unlocked(){return hasMilestone('UF', 16)},

},
},
upgrades: {
  
        11: {
            title: "1",
            description: "1 effect is better",
            cost: new Decimal("e5.7e9"),
            currencyDisplayName: "Numbers",
            currencyInternalName:"points",
            currencyLayer:"N",
        },
        12: {
            title: "2",
            description: "Number boost point gain.",
            cost: new Decimal("e6.823e11"),
            currencyDisplayName: "Numbers",
            currencyInternalName:"points",
            currencyLayer:"N",
            effect(){
                if(hasUpgrade('UF',15)) return new Decimal("e3.5e9")
                else if(player.N.points.gte("e3.5e14")) return new Decimal("e3.5e9")
                else return player.N.points.pow(0.00001).add(1)},
            unlocked(){
                return hasUpgrade("UF", 73)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "3",
            description: "Point boost point gain.",
            cost: new Decimal("e1.018e12"),
            currencyDisplayName: "Numbers",
            currencyInternalName:"points",
            currencyLayer:"N",
            effect(){  if(hasUpgrade('UF',15)) return new Decimal("e2e9")
            else if(player.points.gte("e50000000000")) return new Decimal("e2e9")
                else if(hasUpgrade('UF',74))  return player.points.pow(0.04).add(1)
                else  return player.points.pow(0.02).add(1)},
            unlocked(){
                return hasUpgrade("UF", 73)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "4",
            description: "Point boost number gain.",
            cost: new Decimal("e1.31951e12"),
            currencyDisplayName: "Numbers",
            currencyInternalName:"points",
            currencyLayer:"N",
            effect(){ if(hasUpgrade('UF',15)) return new Decimal("e9e9")
            else if(player.points.gte("e4.5e10")) return new Decimal("e9e9")
                else return player.points.pow(0.2).add(1)},
            unlocked(){
                return hasUpgrade("UF", 73)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "5",
            description: "Boost '2', '3', '4'.",
            cost: new Decimal("e3.3e14"),
            currencyDisplayName: "Numbers",
            currencyInternalName:"points",
            currencyLayer:"N",
          
            unlocked(){
                return hasUpgrade("UF", 75)
            },
        },
        21: {
            title: "6",
            description: "Negative numbers Boost Number gain.",
            cost: new Decimal("e3.6386e14"),
            currencyDisplayName: "Numbers",
            currencyInternalName:"points",
            currencyLayer:"N",
          
            effect(){return player.NN.points.pow(0.0005).add(1)},
        unlocked(){
            return hasUpgrade("UF", 15)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "7",
            description: "You can get more then 2 Super prestige point.",
            cost: new Decimal("e4.1036e14"),
            currencyDisplayName: "Numbers",
            currencyInternalName:"points",
            currencyLayer:"N",
         
        unlocked(){
            return hasUpgrade("UF", 21)
        },
    },
    23: {
        title: "8",
        description: "You can finish Boost or nerf after get e9e15 Number.",
        cost: new Decimal("e5e16"),
        currencyDisplayName: "Numbers",
        currencyInternalName:"points",
        currencyLayer:"N",
     
    unlocked(){
        return hasUpgrade("UF", 22)
    },
   
},
24: {
    title: "9",
    description: "Number boost themselves.",
    cost: new Decimal("e7.2466e16"),
    currencyDisplayName: "Numbers",
    currencyInternalName:"points",
    currencyLayer:"N",
    effectDisplay() { return "^ "+format(upgradeEffect(this.layer, this.id)) },
    effect() { 
        if(hasUpgrade('E',13)) return player.N.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1).times(1.15).pow(2)
        if(hasMilestone('IP',4.4e12)) return player.N.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1).times(1.15)
        else return player.N.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1)},
 
unlocked(){
    return hasUpgrade("UF", 23)
},
},
25: {
    title: "0",
    description: "Point boost themselves.",
    cost: new Decimal("e8.448e16"),
    currencyDisplayName: "Numbers",
    currencyInternalName:"points",
    currencyLayer:"N",
    effectDisplay() { return "^ "+format(upgradeEffect(this.layer, this.id)) },
    effect() { 
        if(hasUpgrade('E',13)) return player.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1).pow(2)
        else return player.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1)},
 
unlocked(){
    return hasUpgrade("UF", 23)
},
},
31: {
    title: "+",
    description: "Unlock more challenge selector. (not yet)",
    cost: new Decimal("e1.35e19"),
    currencyDisplayName: "Numbers",
    currencyInternalName:"points",
    currencyLayer:"N",
    
 
unlocked(){
    return hasChallenge("NN", 32)
},
},
        71: {
            title: "Factor alpha",
            description: "Factor alpha effect is better",
            cost: new Decimal("1.15e11"),
            currencyDisplayName: "Factors",
            currencyInternalName:"points",
            currencyLayer:"F",
        },
        72: {
            title: "Factor beta",
            description: "Factor beta effect is better",
            cost: new Decimal("3.7e11"),
            currencyDisplayName: "Factors",
            currencyInternalName:"points",
            currencyLayer:"F",
        },
        73: {
            title: "Factor Gamma",
            description: "Factor Gamma effect is better",
            cost: new Decimal("4e11"),
            currencyDisplayName: "Factors",
            currencyInternalName:"points",
            currencyLayer:"F",
        },
        74: {
            title: "Factor Delta",
            description: "Boost '3'",
            cost: new Decimal("1.446e12"),
            currencyDisplayName: "Factors",
            currencyInternalName:"points",
            currencyLayer:"F",
            unlocked(){
                return hasUpgrade("UF", 14)
            },
        },
        75: {
            title: "Factor Epsilon",
            description: "Factor Epsilon effect is better",
            cost: new Decimal("2.55e12"),
            currencyDisplayName: "Factors",
            currencyInternalName:"points",
            currencyLayer:"F",
            unlocked(){
                return hasUpgrade("UF", 14)
            },
        },
},

tabFormat: {
    "Milestones":{
        unlocked(){return !hasChallenge('NN',31)},
      content:[
    "main-display",
      "blank",
    ["prestige-button",function(){return ""}],
    "blank",
    "resource-display",
    "blank",
    "blank",
    "milestones",
      ]},
  "Challenges":{
    unlocked(){return hasUpgrade('F',22)&&(!inChallenge("NN", 12)&&!hasChallenge("NN", 12))},
    content:[
      "main-display",
      "blank",
    ["prestige-button",function(){return ""}],
      "blank",
      "blank",
      "challenges",
    ]
  },
  "Upgrade power":{
    unlocked(){return hasChallenge("NN",31)},
    content:[
      "main-display",
      "blank",
    ["prestige-button",function(){return ""}],
      "blank",
      "blank",
      ["microtabs", "A"], ["microtabs", "B"]
    ],
  },
},
microtabs: {
    "A": {
            "Number": {
                    content: [
                           ["row",[ ["upgrade",11], ["upgrade",12], ["upgrade",13], ["upgrade",14], ["upgrade",15]]],
                           ["row",[ ["upgrade",21], ["upgrade",22], ["upgrade",23], ["upgrade",24], ["upgrade",25]]],
                           ["row",[ ["upgrade",31], ["upgrade",32], ["upgrade",33], ["upgrade",34], ["upgrade",35]]]
                        ],
                    unlocked(){
                            return true
                    },
            },
            "Factor": {
                content: [
                    ["row", [ ["upgrade",71], ["upgrade",72], ["upgrade",73], ["upgrade",74], ["upgrade",75]]]
                ],
                unlocked(){
                        return true
                },
        },
          
    },
},
  canBuyMax(){
    return hasUpgrade('F',41) 
  },
  layerShown(){return (hasChallenge('F',22)||hasMilestone('IP',1)||hasMilestone('FS',1)||hasMilestone('UF',1)||hasMilestone('I',1))&&!inChallenge('NN',31)},
})
addLayer("F", {
    name: "Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFCD00",
    requires: new Decimal(1e5), // Can be a function that takes requirement increases into account
    resource(){ return "Factors"
}, 
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 50,
    exponent(){
        if(inChallenge('NN',22)||hasChallenge('NN',22))return 1
        if (player.FS.points.gte(4)) return 0.18
        if (player.IP.points.gte(1e26)) return 0.2
        if (player.FS.points.gte(3)) return 0.25
        if(hasUpgrade('N',62))return 0.271
        if (player.FS.points.gte(2)) return 0.29
        if(hasUpgrade('N',61))return 0.314
        if(hasUpgrade('F',33))return 0.33
        if(hasMilestone('FS',1))return 0.375
        if(hasMilestone('NN',1e50))return 0.395
        if(hasUpgrade('N',42))return 0.48
        if(hasChallenge('F',43))return 0.538
        if(hasChallenge('F',41))return 0.625
        if(hasChallenge('F',23))return 0.69
        else return 0.75

    },
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
        unlocked() {return hasMilestone('F', 1)} // Determines if you can use the hotkey, optional
    },
    ],
    canBuyMax(){
        return hasUpgrade('F',13) ||hasMilestone('E',603)
    },autoPrestige(){
        return hasMilestone('F',6000);
    },resetsNothing(){
        return hasMilestone('F',6000);
    },
   
    milestones: {
        1: {
            requirementDescription: "1 factor",
            effectDescription: "Unlock 1 more number upgrade and factors boost numbers and points gain.",
            done() { return player.F.points.gte(1) }
        },
        2: {
            requirementDescription: "2 factors",
            effectDescription: "Unlock the first factor challenge",
            done() { return player.F.points.gte(2)}
        },
        4: {
            requirementDescription: "4 factors",
            effectDescription: "Unlock 1 more Number upgrade.",
            done() { return player.F.points.gte(4)}
        },
        5: {
            requirementDescription: "5 factors",
            effectDescription: "Unlock factors upgrades and gain 100% of numbers on reset per second",
            done() { return player.F.points.gte(5)||hasMilestone("MS", 2)}
        },
        8: {
            requirementDescription: "8 factors",
            effectDescription: "Unlock another factor challenge and Number x2.",
            done() { return player.F.points.gte(8)}
        },
        12: {
            requirementDescription: "12 factors",
            effectDescription: "Unlock another factor challenge",
            done() { return player.F.points.gte(12)}
        },
    
        44: {
            requirementDescription: "44 factors",
            effectDescription: "Unlock another factor challenge",
            done() { return player.F.points.gte(44)}
        },
        90: {
            requirementDescription: "90 factors",
            effectDescription: "Unlock another number upgrade",
            done() { return player.F.points.gte(90)}
        },
        108: {
            requirementDescription: "108 factors",
            effectDescription: "Unlock another factor challenge",
            done() { return player.F.points.gte(108)}
        },
        120: {
            requirementDescription: "120 factors",
            effectDescription: "'Factor Alpha' is better",
            done() { return player.F.points.gte(120)}
        },
        888: {
            requirementDescription: "888 factors",
            effectDescription: "'Factor Alpha' is much better.",
            done() { return player.F.points.gte(888)}
        },
    1000: {
            requirementDescription: "1000 factors",
            effectDescription: "'Factor Beta' is better.",
            done() { return player.F.points.gte(1000)}
        },
        1100: {
            requirementDescription: "1100 factors",
            effectDescription: "Factor Milestone 1 is better.",
            done() { return player.F.points.gte(1100)}
        },  
        1333: {
            requirementDescription: "1333 factors",
            effectDescription: "Unlock another number upgrade",
            done() { return player.F.points.gte(1333)}
        },     
        1580: {
            requirementDescription: "1580 factors",
            effectDescription: "Unlock 1 number buyable",
            done() { return player.F.points.gte(1580)}
        },  
        6000: {
            requirementDescription: "6000 factors",
            effectDescription: "Remove the first hardcap of '+', auto buy factor, and factor reset nothing",
            done() { return player.F.points.gte(6000)||hasMilestone("I", 1)||hasMilestone("MS", 2)}
        },  
        12500: {
            requirementDescription: "12500 factors",
            effectDescription: "Remove the second hardcap of '+'.",
            done() { return player.F.points.gte(12500)}
        },  
        1.25e40: {
            requirementDescription: "1.25e40 factors",
            effectDescription: "IP gain x 1e15.",
            done() { return player.F.points.gte(1.25e40)}
        }, 

    },
    upgrades: {
        11: {
            title: "Factor Alpha",
            description: "Boost points and numbers based on factors.",
            effect() {
                if (hasUpgrade('UF',71))  return player.F.points.pow(1e6).add(1)
                if (inChallenge('F',42)|inChallenge('F',43)) return 1 
                if (inChallenge('F',23)) return 1
                if (inChallenge('F',22)) return 1 
                if (player.F.points>=1108) return 4500
                if (hasMilestone('F',888)) return player.F.points.pow(1.2).add(1)
                if (hasMilestone('F',120)) return player.F.points.pow(0.65).add(1)
                return player.F.points.pow(0.4).add(1)
        
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

            cost: new Decimal(5),
            unlocked() {
                return hasMilestone("F",5)|hasMilestone("I", 1)
            },
        },
        12: {
            title: "Factor Beta",
            description: "Number boost themselves.",
            effect() {
                if (player.N.points.gte("ee14")) return new Decimal("ee9")
                if (hasUpgrade('UF',72))  return player.N.points.pow(0.00001).add(1)
                if (player.N.points.gte("ee9")) return new Decimal("1e50000")
                if (hasChallenge('I',32))  return player.N.points.pow(0.00005).add(1)
                if (hasChallenge('NN',21))  return player.N.points.pow(0.0001).add(1)
                if (hasChallenge('NN',12))  return player.N.points.pow(0.0025).add(1)
                if (hasChallenge('NN',11))  return player.N.points.pow(0.006).add(1)
                if (hasChallenge('I',22))  return player.N.points.pow(0.016).add(1)
                else if (hasMilestone('I',28)) return player.N.points.pow(0.025).add(1)
                if (inChallenge('F',42)|inChallenge('F',43)) return 1 
                if (inChallenge('F',22)) return 1 
                if (player.N.points>=1.078752e+144) return 1e35
                
                if (hasMilestone('F',1000)) return player.N.points.pow(0.243).add(1)
                if (hasUpgrade('F',24)) return player.N.points.pow(0.2).add(1)
             
                return player.N.points.pow(0.15).add(1)
        
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(9),
            unlocked(){
                return hasUpgrade("F", 11)|hasMilestone("I", 1)
            },
    },
    13: {
        title: "Factor Gamma",
        description(){ if(hasUpgrade('UF',11))  return "Unlock 3 Number upgrades."
        else return "Unlock 2 Number upgrades and 2 challenges, you can buy max factor."},
        cost: new Decimal(15),
        unlocked(){
            return hasUpgrade("F", 12)|hasMilestone("I", 1)
        },
},
14: {
    title: "Factor Delta",
    description: "Remove the second hardcap of '3'",
    cost: new Decimal(36),
    unlocked(){
        return hasMilestone("UF", 1)|hasMilestone("I", 1)&&!hasUpgrade("F", 51)
    },
},
15: {
    title: "Factor Epsilon",
    description(){ if(hasUpgrade('UF',11))  return "Number ^2"
    else return "Unlock a number buyable and Number x2"},
    cost: new Decimal(60),
    unlocked(){
        return hasChallenge("F", 23)|hasMilestone("I", 1)
    },
},
21: {
    title: "Factor Zeta",
    description: "Unlock 1 factor challenge",
    cost: new Decimal(125),
    unlocked(){
        return player.UF.best.gte(3) ||hasMilestone("I", 1) ||hasMilestone("MS", 1)
    },
},
22: {
    title: "Factor Eta",
    description: "Unlock the first upgrade factor challenge.",
    cost: new Decimal(135),
    unlocked(){
        return hasMilestone("I", 1)||(hasUpgrade('F',21)&&hasChallenge('F',33))||hasMilestone("MS", 1)
    },
},
23: {
    title: "Factor Theta",
    description: "Remove the fourth hardcap of '2'.",
    cost: new Decimal(169),
    unlocked(){
        return hasMilestone("I", 1)||hasUpgrade('F',22)&&!hasUpgrade("F", 51)||hasMilestone("MS", 1)
    },
},
24: {
    title: "Factor Iota",
    description: "Boost 'Factor Beta' and unlock 1 more factor upgrade." ,
    cost: new Decimal(375),
    unlocked(){
        return hasMilestone("I", 1)||hasMilestone('UF',6)||hasMilestone("MS", 1)
    },
},
25: {
    title: "Factor Kappa",
    description: "Unlock 2 factor challenges." ,
    cost: new Decimal(460),
    unlocked(){
        return hasMilestone("I", 1)||hasUpgrade('F',24)||hasMilestone("MS", 1)
    },
},
31: {
    title: "Factor Lambda",
    description: "boost Factor milestone 1. " ,
    cost: new Decimal(271777777),
    unlocked(){
        return hasMilestone("FS", 1)
    },
},
32: {
    title: "Factor Mu",
    description: "Unlock the third Infinity challenge " ,
    cost: new Decimal(555555555),
    unlocked(){
        return hasUpgrade("F", 31)
    },
},
33: {
    title: "Factor Nu",
    description: "Factor is cheaper." ,
    cost: new Decimal(1.11e9),
    unlocked(){
        return hasUpgrade("F", 32)
    },
},
34: {
    title: "Factor Xi",
    description: "Unlock 1 Negative number Upgrade" ,
    cost: new Decimal(2.09e10),
    unlocked(){
        return hasUpgrade("F", 33)
    },
},
35: {
    title: "Factor Omicron",
    description: "Unlock 1 number Upgrade" ,
    cost: new Decimal(2.7e10),
    unlocked(){
        return hasUpgrade("F", 34)
    },
},
41: {
    title: "Factor Pi",
    description: "Upgrade Factors are cheaper and you can buy max it." ,
    cost: new Decimal(9.5e10),
    unlocked(){
        return hasUpgrade("F", 35)
    },
},
42: {
    title: "Factor Rho",
    description: "Factor boost Negative numbers gain and unlock 1 upgrade." ,
    cost: new Decimal(8.55e11),
    unlocked(){
        return hasUpgrade("F", 41)
    },
},
43: {
    title: "Factor Sigma",
    description: "Boost 'Factor Lambda'" ,
    cost: new Decimal(1.25e16),
    unlocked(){
        return hasUpgrade("F", 42)
    },
},
44: {
    title: "Factor Tau",
    description: "Upgrade factors are cheaper." ,
    cost: new Decimal(2.5e27),
    unlocked(){
        return hasUpgrade("F", 43)
    },
},
45: {
    title: "Factor Upsilon",
    description: "Unlock 4 upgrade and Number ^1.1" ,
    cost: new Decimal(2.6e27),
    unlocked(){
        return hasUpgrade("F", 44)
    },
},
16: {
    title: "Factor Phi",
    description: "The '+' effect is always 1.79e308" ,
    cost: new Decimal(7.9e27),
    unlocked(){
        return hasUpgrade("F", 45)
    },
},
26: {
    title: "Factor Chi",
    description: "The 'x' effect is always 1.79e308" ,
    cost: new Decimal(1e28),
    unlocked(){
        return hasUpgrade("F", 45)
    },
},
36: {
    title: "Factor Psi",
    description: "The '/' effect is always 3.08" ,
    cost: new Decimal(1.35e28),
    unlocked(){
        return hasUpgrade("F", 45)
    },
},
46: {
    title: "Factor Omega ",
    description: "Unlock Mathematics Symbol and Infinity point gain x100." ,
    cost: new Decimal(1e31),
    unlocked(){
        return hasUpgrade("F", 45)
    },
},

51: {
    title: "Ω",
    description: "Remove some useless upgrade and IP ^2.",
    cost: new Decimal("0"),
    unlocked(){
        {return hasChallenge('I',42)}
    },
    style: {width: "700px"}
},
    },
    challenges: {
        11: {
            name: "/ factor",
            challengeDescription: "Numbers and points gain x0.3",
            goal: new Decimal(1000000),
            rewardDescription(){return "Numbers and Points x3"},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 2)},
        },
        12: {
            name: "No upgrade factor",
            challengeDescription: "'2' is useless",
            canComplete(){return player.N.points.gte("100000000")},
            goalDescription: "100,000,000 Numbers",
            rewardDescription(){return "Numbers and Points x3"},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 8)},
          
        },
        13: {
            name: "2 in 1",
            challengeDescription: "You are trapped in / and No upgrade factor.",
            canComplete(){return player.N.points.gte("3.14e9")},
            goalDescription: "3.14e9 Numbers",
            rewardDescription(){return "Unlock a number upgrade."},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 12)},
          
        },
        21: {
            name: "No cap factor",
            challengeDescription: "'6', '7' and '8' are useless.",
            canComplete(){return player.N.points.gte("3.14e11")},
            goalDescription: "3.14e11 Numbers",
            rewardDescription(){return "Factor will not reset upgrades and numbers x1.5."},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 13)},
          
        },
        22: {
            name: "No factor factor",
            challengeDescription: "Factor milestone 4 and upgrades are useless.",
            canComplete(){return player.N.points.gte("3.14e18")},
            goalDescription: "3.14e18 Numbers",
            rewardDescription(){return "Points and Numbers x2"},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 13)},
          
        },
        23: {
            name: "3 in 1",
            challengeDescription: "You are trapped in 2 in 1, No cap and no factor factor.",
            canComplete(){return player.N.points.gte("420420420")},
            goalDescription: "420,420,420 Numbers",
            rewardDescription(){return "Factors are cheaper and unlock a factor upgrade."},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 44)},
          
        },
        31: {
            name: "Super / factor",
            challengeDescription: "Points and Numbers / 1e6",
            canComplete(){return player.N.points.gte("3140")},
            goalDescription: "3,140 Numbers",
            rewardDescription(){return "unlock a Number buyable."},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 108)},
          
        },
        32: {
            name: "Super No upgrade factor",
            challengeDescription: "'2','3' and '4' ard useless.",
            canComplete(){return player.N.points.gte("3.14e16")},
            goalDescription: "3.14e16 Numbers",
            rewardDescription(){return "'-' base x2 and unlock a factor challenge"},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 21)},
          
        },
        33: {
            name: "Super 2 in 1",
            challengeDescription: "You are trapped in super / and super No upgrade factor.",
            canComplete(){return player.N.points.gte("314")},
            goalDescription: "314 Numbers",
            rewardDescription(){return "'-' base x2 and unlock a factor upgrade"},
          unlocked(){return hasMilestone("I", 1)|(hasUpgrade('F', 21) && hasChallenge('F',32))},
          
        },
        41: {
            name: "Super no cap factor",
            challengeDescription: "'2', '3' and '4' effects are capped at 10",
            canComplete(){return player.N.points.gte("3.14e38")},
            goalDescription: "3.14e38 Numbers",
            rewardDescription(){return "Factor are cheaper."},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 25)},
          
        },
        42: {
            name: "Super no factor factor",
            challengeDescription: "Factor milestone 4 and upgrades are useless.",
            canComplete(){return player.N.points.gte("3.14e45")},
            goalDescription: "3.14e45 Numbers",
            rewardDescription(){return "'-' cost base /1e4."},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 25)},
          
        },
        43: {
            name: "Super 3 in 1",
            challengeDescription: "You are trapped in Super 2 in 1, Super no cap factor,and no factor factor.",
            canComplete(){return player.N.points.gte("1e15")},
            goalDescription: "1e15 Numbers",
            rewardDescription(){return "Factor are cheaper."},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('UF', 10)},
        },
          
        },
        buyables:{
            11: {
                title: "Factor a",
                display() {
            return "Boost Number gain by " + format(tmp.F.buyables[11].effect) + "x<br>Cost : " + format(new Decimal("5").pow(getBuyableAmount("F", 11).add(1))) + " Factors"
                },
                unlocked() { return hasUpgrade('N',44) },
                canAfford() { 
                  return player.F.points.gte(new Decimal("5").pow(getBuyableAmount("F", 11).add(1))) 
                },
                buy() { 
                    {
                  player.F.points = player.F.points.minus(new Decimal("5").pow(getBuyableAmount("F", 11).add(1)))
                    }
                    setBuyableAmount("F", 11, getBuyableAmount("F", 11).add(1))
                },
                effect() {
                    if (inChallenge("NN", 21)&&hasChallenge("NN", 21)) eff =  new Decimal(1)
                else eff = new Decimal("30").pow(getBuyableAmount("F", 11))     
                    return  eff = eff   
                      
                },
                
               
            },
            12: {
                title: "Factor b",
                display() {
            return "Boost Point gain by " + format(tmp.F.buyables[12].effect) + "x<br>Cost : " + format(new Decimal("7").pow(getBuyableAmount("F", 12).add(1))) + " Factors"
                },
                unlocked() { return hasUpgrade('N',45) },
                canAfford() { 
                  return player.F.points.gte(new Decimal("7").pow(getBuyableAmount("F", 12).add(1))) 
                },
                buy() { 
                    {
                  player.F.points = player.F.points.minus(new Decimal("7").pow(getBuyableAmount("F", 12).add(1)))
                    }
                    setBuyableAmount("F", 12, getBuyableAmount("F", 12).add(1))
                },
                effect() {
                    if (inChallenge("NN", 21)&&hasChallenge("NN", 21)) eff =  new Decimal(1)
                  else eff = new Decimal("24").pow(getBuyableAmount("F", 12))     
                    return  eff = eff   
                      
                }
            },
            13: {
                title: "Factor c",
                display() {
            return "Boost Number gain by " + format(tmp.F.buyables[13].effect) + "x<br>Cost : " + format(new Decimal("12").pow(getBuyableAmount("F", 13).add(1))) + " Factors"
                },
                unlocked() { return hasMilestone('NN',1e28) },
                canAfford() { 
                  return player.F.points.gte(new Decimal("12").pow(getBuyableAmount("F", 13).add(1))) 
                },
                buy() { 
                    {
                  player.F.points = player.F.points.minus(new Decimal("12").pow(getBuyableAmount("F", 13).add(1)))
                    }
                    setBuyableAmount("F", 13, getBuyableAmount("F", 13).add(1))
                },
                effect() {
                if (inChallenge("NN", 21)&&hasChallenge("NN", 21)) eff =  new Decimal(1)
                else eff =  new Decimal(player.F.points.add(1).log(10).pow(3).add(1)).pow(getBuyableAmount("F", 13))
                    return  eff 
                      
                }
            },

        },
    tabFormat: {
        "Milestones":{
    
          content:[
        "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
        "blank",
        "resource-display",
        "blank",
        "blank",
        "milestones",
          ]},
      
      "Upgrades":{
        unlocked(){return hasMilestone('F',5)||hasMilestone("I", 1)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "upgrades",
        ]
      },
      "Challenges":{
        unlocked(){return (hasMilestone('F',2)||hasMilestone("I", 1))&&(!inChallenge("NN", 12)&&!hasChallenge("NN", 12))},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          ["display-text",function(){
            let s = "There are upgrades that require being in a challenge (Number Upgrade)."
            return s
          }],
          "challenges",
        ]
      },
      "Buyables":{
        unlocked(){return hasUpgrade('N',44)&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))},
        content:[
      "main-display",
        "blank",
      ["prestige-button",function(){return ""}],
      "blank",
      "resource-display",
      "blank",
      "blank",
      "buyables",
        ]},
      },

      doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("I", 2) && resettingLayer=="I") keep.push("milestones")
        if (hasMilestone("I", 3) && resettingLayer=="I") keep.push("challenges")
        if (hasMilestone("IP", 1) && resettingLayer=="IP") keep.push("challenges")
        if (hasMilestone("IP", 4) && resettingLayer=="IP") keep.push("upgrades")
        if (hasMilestone("IP", 4) && resettingLayer=="IP") keep.push("milestones")
        if (hasMilestone("I", 4) && resettingLayer=="I") keep.push("upgrades")
        if (hasMilestone("MS", 3) && resettingLayer=="MS") keep.push("upgrades")
        if (hasMilestone("MS", 3) && resettingLayer=="MS") keep.push("milestones")
        if (hasMilestone("MS", 3) && resettingLayer=="MS") keep.push("challenges")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
      },
      automateStuff(){
        if(hasMilestone("I",69)){
          if(layers.F.buyables[11].canAfford())setBuyableAmount("F",11,player.F.points.log(5).floor().add(1))
          if(layers.F.buyables[12].canAfford())setBuyableAmount("F",12,player.F.points.log(7).floor().add(1))
          if(layers.F.buyables[13].canAfford())setBuyableAmount("F",13,player.F.points.log(12).floor().add(1))
        }
    },
    autoUpgrade(){
        if  (hasMilestone('MS',1)) return true
        else return false
    },
      
      


      layerShown(){return hasUpgrade('N',14)||hasMilestone('IP',1)||hasMilestone('FS',1)||hasMilestone('F',1)||hasMilestone('UF',1)||hasMilestone('I',1)},
})
addLayer("I", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#606060",
    requires: new Decimal("1.8e308"), // Can be a function that takes requirement increases into account
    resource(){return "Infinity"
    }, 
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: new Decimal("1.8e308"),
    exponent: 1,
    branches:["F","UF"],
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for Infinity", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.I.unlocked) doReset("I") },
        unlocked() {return hasMilestone('I', 1)} // Determines if you can use the hotkey, optional
    },
    ],
    milestones: {
        1: {
            requirementDescription: "1 Infinity",
            effectDescription: "Number gain ^1.05 and point gain x100, keep upgrade on factor reset. Keep the seventeenth factor milestone on reset.",
            done() { return player.I.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Infinity",
            effectDescription: "Number gain ^1.05, keep Factor milestone and upgrade factor milestone on reset.",
            done() { return player.I.points.gte(2) }
        },
        3: {
            requirementDescription: "3 Infinity",
            effectDescription: "keep Factor challenge on reset, and '9' to '16' on ALL reset.",
            done() { return player.I.points.gte(3) }
        },
        4: {
            requirementDescription: "4 Infinity",
            effectDescription: "keep Factor Upgrade, Negative number Upgrade and Negative number milestone on reset, Negative number x10.",
            done() { return player.I.points.gte(4) }
        },
        5: {
            requirementDescription: "5 Infinity",
            effectDescription: "Unlock more challenge.",
            done() { return player.I.points.gte(5) }
        },
        6: {
            requirementDescription: "6 Infinity",
            effectDescription: "Unlock 1 Negative number Upgrade and Negative number is cheaper in IC.",
            done() { return player.I.points.gte(6) }
        },
        7: {
            requirementDescription: "7 Infinity",
            effectDescription: "Unlock 1 Negative number Upgrade and Negative number is cheaper again in IC.",
            done() { return player.I.points.gte(7) }
        },
        8: {
            requirementDescription: "8 Infinity",
            effectDescription: "You can buy max Infinity.",
            done() { return player.I.points.gte(8) }
        },
        28: {
            requirementDescription: "28 Infinity",
            effectDescription: "Remove the hardcap of 'Factor beta' but nerf it.",
            done() { return player.I.points.gte(28) }
        },
        69: {
            requirementDescription: "69 Infinity (NICE)",
            effectDescription: "Infinity boost Negative Numbers gain and auto buy factor and number buyable.",
            done() { return player.I.points.gte(69) }
        },
        90000: {
            requirementDescription: "90000 Infinity ",
            effectDescription: "Unlock 2 Infinity challenge.",
            done() { return player.I.points.gte(90000) }
        },
    },
    challenges: {
        11: {
            name: "IC1",
            challengeDescription: "Number gain ^0.3",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.1."},
          unlocked(){return hasMilestone("NN", 4e21)},
        },
        12: {
            name: "IC2",
            challengeDescription: "Number buyable is no effect. ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.2."},
          unlocked(){return hasMilestone("I", 5)},
        },
        21: {
            name: "IC3",
            challengeDescription: "Number gain ^(1/6). ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.3."},
          unlocked(){return hasUpgrade("F", 32)},
        },
        22: {
            name: "IC Ω ",
            challengeDescription: "Number gain ^(1/30000). ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.6 but nerf factor beta."},
          unlocked(){return hasMilestone("MS", 40)},
        },
        
        31: {
            name: "IC5",
            challengeDescription: "Number gain ^0.09. ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.4."},
          unlocked(){return hasUpgrade("NN", 33)},
        },
        32: {
            name: "IC ω",
            challengeDescription: "Number gain ^(1/1900000). ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.7 but nerf factor beta."},
          unlocked(){return hasUpgrade("IP", 64)},
        },
        41: {
            name: "IC7",
            challengeDescription: "Number gain ^0.011. ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.5."},
          unlocked(){return hasAchievement("A", 46)},
        },
        42: {
            name: "IC ♾",
            challengeDescription: "Number gain ^0.001. ",
            canComplete(){return player.points.gte("1.8e308")},
            goalDescription: "1.80e308 Points",
            rewardDescription(){return "Unlock 1 Factor Upgrade."},
          unlocked(){return hasMilestone("MS", 1)},
          
        },

      
            51: {
                name: "Boost or nerf 1",
                challengeDescription: "Number ^0.9 but NN ^1.2",
                canComplete(){
                    if(hasUpgrade('UF',23)) return player.N.points.gte(1e1000)
                    else return player.N.points.gte("ee100")},
                goalDescription: "Do IP reset in this challenge to get more IP",
                rewardDescription(){ 
                    if(hasChallenge('I',51)) return "Number ^1.1"
                    else return "??????"
                },
              unlocked(){return hasUpgrade('IP',45)},
            },
            52: {
                name: "Boost or nerf 2",
                challengeDescription: "Number ^0.75 but NN ^1.4",
                canComplete(){
                    if(hasUpgrade('UF',23)) return player.N.points.gte(1e1000)
                    else return player.N.points.gte("ee100")},
                goalDescription: "Do IP reset in this challenge to get more IP",
                rewardDescription(){ 
                    if(hasChallenge('I',52)) return "Number ^1.1"
                    else return "??????"
                },
              unlocked(){return hasUpgrade('IP',45)},
            },
    
            61: {
                name: "Boost or nerf 3",
                challengeDescription: "Number ^0.6 but NN ^1.8",
                canComplete(){
                    if(hasUpgrade('UF',23)) return player.N.points.gte(1e1000)
                    else return player.N.points.gte("ee100")},
                goalDescription: "Do IP reset in this challenge to get more IP",
                rewardDescription(){ 
                    if(hasChallenge('I',61)) return "Number ^1.1"
                    else return "??????"
                },
              unlocked(){return hasMilestone('I',90000)},
            },
            62: {
                name: "Boost or nerf 4",
                challengeDescription: "Number ^0.1 but NN ^3.",
                canComplete(){
                    if(hasUpgrade('UF',23)) return player.N.points.gte(1e1000)
                    else return player.N.points.gte("ee100")},
                goalDescription: "Do IP reset in this challenge to get more IP",
                rewardDescription(){ 
                    if(hasChallenge('I',62)) return "Unlock 1 layer"
                    else return "??????"
                },
              unlocked(){return hasUpgrade('IP',65)},
            },


    },
    tabFormat: {
        "Milestones":{
          content:[
        "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
        "blank",
        "resource-display",
        "blank",
        "blank",
        "milestones",
          ]},
      
      "Normal Challenges":{
        unlocked(){return hasMilestone('NN',4e21)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          ["row", [ ["challenge", 11], ["challenge", 12]]], ["row", [ ["challenge", 21], ["challenge", 22]]], ["row", [ ["challenge", 31], ["challenge", 32]]], ["row", [ ["challenge", 41],["challenge", 42]]]
       ],
      },
        
    
    "Boost or nerf":{
        unlocked(){return hasUpgrade('IP',45)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          ["row", [ ["challenge", 51], ["challenge", 52]]],["row", [ ["challenge", 61], ["challenge", 62]]]
        ]
    },
      },
    canBuyMax(){
        return hasMilestone('I',8) 
      },
    layerShown(){return hasMilestone('UF',11)||hasMilestone('IP',1)||hasMilestone('FS',1)||hasMilestone('I',1)},
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("MS", 3) && resettingLayer=="MS") keep.push("milestones")
        if (resettingLayer=="E") keep.push("challenges")
        if (resettingLayer=="E") keep.push("milestones")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
})
addLayer("Link", {
	startData() { return {unlocked: true}},
	color: "#ff8888",
	symbol: "L",
	row: "side",
	position: -1,
	layerShown() { return true },
	tooltip: "Link",
    tabFormat: [
		"blank", "blank", "blank",
        ["raw-html", "<h1><a href=https://docs.google.com/document/d/1oT5siVj4lT8nnmHjPmAiSQL1NVSmNXQT8bpgUUqjBkM/edit target=_blank>Hardcap table</a></h1><br><h1><a href=https://docs.google.com/document/d/1Re0J_14Ivl_ON4CyqXWk-6nwZnxFfzoG3rxbQqe4Tgg/edit target=_blank>Save bank</a></h1>"],
	],
})
addLayer("A", {
    name: "Achievement",
	startData() { return {unlocked: true}},
	color: "#ffff00",
	symbol: "A",
	row: "side",
	position: 0,
	layerShown() { return true },
    tooltip: "Achievements", 
    achievements: {
        11: {
            name: "First",
            tooltip:"Get the first upgrade, reward: point x1.25 ",
            done()  {
                if (hasUpgrade('N',11)) return true
            }
        },
        12: {
            name: "Super click",
            tooltip:"Get the fourth upgrade, reward: Number x3.",
            done()  {
                if (hasUpgrade('N',14)) return true
            }
        },
        13: {
            name: "Factor",
            tooltip:"Get 1 factor.",
            done()  {
                if (hasMilestone('F',1)) return true
            }       
         },
         14: {
            name: "Challenged",
           tooltip:"complete / factor. Reward: Number x2.",
            done()  {
                if (hasChallenge('F',11)) return true
            }
        },
        15: {
            name: "Automation",
            tooltip:"Get 5 factors.",
            done()  {
                if (hasMilestone('F',5)) return true
            }
        },
        16: {
            name: "Ten Upgrade",
            tooltip:"Get 10 upgrade.",
            done()  {
                if (hasUpgrade('N',23)) return true
            }
        },
        17: {
            name: "More and more",
            tooltip:"Get 1 upgrade factor.",
            done()  {
                if (hasMilestone('UF',1)) return true
            }
        },
        21: {
            name: "Base++",
            tooltip:"Get 12 Number upgrade.",
            done()  {
                if (hasUpgrade('N',32)) return true
            }
        },
        22: {
            name: "Buyable challenge?",
            tooltip:"Complete Buyable upgrader once.",
            done()  {
                if (challengeCompletions('UF', 11)>=1) return true
            }
        },
        23: {
            name: "Buyable challenge!",
            tooltip:"Complete Buyable upgrader three times.",
            done()  {
                if (challengeCompletions('UF', 11)>=3) return true
            }
        },
        24: {
            name: "~2^10 factor",
            tooltip:"Get 1000 factor",
            done()  {
                if (hasMilestone('F', 1000)) return true
            }
        },
        25: {
            name: "one to fifteen",
            tooltip:"Get 15 Number upgrade",
            done()  {
                if (hasUpgrade('N', 35)) return true
            }
        },
        26: {
            name: "Super Challenged",
            tooltip:"Complete Super 3 in 1",
            done()  {
                if (hasChallenge('F', 43)) return true
            }
        },
      
        27: {
            name: "Inflatity",
            tooltip:"Get 1 Infinity.",
            done()  {
                if (hasMilestone('I', 1)) return true
            }
        },
        31:{
            name: "Omega Cheaper",
            tooltip:"Get 18 Number Upgrade, reward: Number x5.",
            done()  {
                if (hasUpgrade('N',43)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },
        32:{
            name: "Second infinity",
            tooltip:"Get 2 Infinity, reward: Unlock 1 upgrade.",
            done()  {
                if (hasMilestone('I',2)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },
        33:{
            name: "Free Infinity",
            tooltip:"Get 3 Infinity.",
            done()  {
                if (hasMilestone('I',3)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },
        34:{
            name: "True Infinity",
            tooltip:"Get 1.8e308 point.",
            done()  {
                if (player.points.gte(1.79e308)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },
        35:{
            name: "Impossible?",
            tooltip:"Get 1.8e258 Number in IC2, reward: Number x1e50 in Row 1, 3 Infinity Challenge.",
            done()  {
                if (player.N.points.gte(1.79e258)&&inChallenge('I',12)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        36:{
            name: "OM",
            tooltip:"Get 1 Factor shift.",
            done()  {
                if (player.FS.points.gte(1)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        37:{
            name: "I find the miss one!",
            tooltip:"Get '-3'",
            done()  {
                if (hasUpgrade('NN',13)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        41:{
            name: "Don't forget achievements",
            tooltip:"Get 1e50 Negative numbers in IC5, reward: Unlock 1 Number buyable.",
            done()  {
                if (player.NN.points.gte(1e50)&&inChallenge('I',31)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        42:{
            name: "I forget achievements",
            tooltip:"Get 1 Infinity point.",
            done()  {
                if (player.IP.points.gte(1)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        43:{
            name: "twofinity challenge",
            tooltip:"Complete Infinity Point challenge 1",
            done()  {
                if (hasChallenge('IP',11)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        44:{
            name: "Nine egg",
            tooltip:"Get IP upgrade 33.",
            done()  {
                if (hasUpgrade('IP',33)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        45:{
            name: "Omega Upgrade",
            tooltip:"Get 23 Factor Upgrade.Reward:Number x1e5",
            done()  {
                if (hasUpgrade('F',36)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        }, 
        46:{
            name: "Don't forget achievements again.",
            tooltip:"Get 1e25000 Number in IC3. Reward: Unlock 1 Infinity challenge.",
            done()  {
                if (player.N.points.gte("1e25000")&&inChallenge('I',21))  return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        }, 
        47:{
            name: "+ - x / ^",
            tooltip:"Get 1 Mathematics Symbol",
            done()  {
                if (hasMilestone('MS',1))  return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        }, 
        51:{
            name: "Five 1",
            tooltip:"Get e11111 IP, reward: IP gain ^1.05 and x 1e40",
            done()  {
                if (player.IP.points.gte("1e11111"))  return true
            },
            unlocked(){
                return hasMilestone('MS',1)
            }
        }, 
    }
    
})
addLayer("FS", {
    name: "Factor shift", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#966400",
    requires: new Decimal(100000000), // Can be a function that takes requirement increases into account
    resource(){return "Factor shift"}, 
    baseResource: "Factors", // Name of resource prestige is based on
    baseAmount() {return player.F.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base:1000,
    exponent(){
        if(player.FS.points>=4) return 2.5
        else if(player.FS.points>=3) return 1.5
        else return 1
    },
    branches:["F"],
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult=new Decimal(1) 
        if (hasUpgrade('F',51)) mult = mult.times(2)
        return mult
    },
    resetsNothing(){
        return hasMilestone('MS',1);
    },autoPrestige(){
        return hasMilestone('MS',40);
    },
    hotkeys: [
        {key: "F", description: "Shift + F: Reset for Factor shift", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.FS.unlocked) doReset("FS") },
        unlocked() {return hasMilestone('I', 1)} // Determines if you can use the hotkey, optional
    },
    ],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        1: {
            requirementDescription: "1 Factor shift",
            effectDescription: "Per factor shift make factor cheaper.",
            done() { return player.FS.points.gte(1) }
        },
    },
    layerShown(){return hasMilestone('NN',1e50)||hasMilestone('IP',1)||hasMilestone('FS',1)}
})
addLayer("IP", {
    name: "Infinity point", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -10, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#80ffff",
    requires(){ 
        if(inChallenge('E',11)&&(!player.E.IPpower.gte(1))) return new Decimal(1e400)
        else return  new Decimal("1.8e308")
}, // Can be a function that takes requirement increases into account
    resource(){return "Infinity point"
    }, 
    baseResource: "Negative numbers", // Name of resource prestige is based on
    baseAmount() {if(hasChallenge('NN',32)||inChallenge('NN',32))return player.N.points
else return player.NN.points}, // Get the current amount of baseResource
    type(){
     return  "normal"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        if(inChallenge('NN',32)||hasChallenge('NN',32)) return 0.0001
        if(hasUpgrade('IP',13))return 0.005
else return 0.01
    },
 
    prestigeButtonText() { 
        return "Reset for <b>" + formatWhole(tmp[this.layer].resetGain) + "</b> Infinity points" +
         (Decimal.gte(tmp[this.layer].resetGain, 1000) ? "" : "<br/>Next at " + formatWhole(tmp[this.layer].nextAt) + " Negative numbers")
    },      
    branches:["NN","I"],
     // Prestige currency exponent
     hotkeys: [
        {key: "I", description: "Shift + I: Reset for Infinity point", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.IP.unlocked) doReset("IP") },
        unlocked() {return hasMilestone('IP', 1)} // Determines if you can use the hotkey, optional
    },
    ],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('F',46)) mult = mult.times(1e15)
if(hasUpgrade('F',46)) mult = mult.times(100)
if(hasAchievement('A',51)) mult = mult.times(1e40)
if (hasUpgrade('MS',13))mult = mult.times(player.MS.x.pow(100))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult=new Decimal(1) 
        if (hasUpgrade('F',51)) mult = mult.times(2)
        if (hasUpgrade('E',13)) mult = mult.times(5)
        if (hasUpgrade('IP',54)) mult = mult.times(1.1)
        if (hasUpgrade('IP',55)) mult = mult.times(1.05)
        if (hasAchievement('A',51)) mult = mult.times(1.05)
        if (hasMilestone('MS',2)) mult = mult.times(1.1)
        if (hasMilestone('MS',40)) mult = mult.times(1.1)
        if(inChallenge('E',11)&&(!player.E.IPpower.gte(1))) mult = mult.times(0)
        return mult
    },
    softcap(){
        if(player.IP.points.gte("1e6000000"))  return new Decimal("1e6000000")
        else return new Decimal("1e1000000")},
    softcapPower(){
        if(player.IP.points.gte("1e6000000")) return new Decimal("0.002")
        else if(hasUpgrade('MS',31)) return new Decimal("0.2")
        else return new Decimal("0.00000001")},
    milestones: {
        1: {
            requirementDescription: "1 Infinity points",
            effectDescription: "Keep '0' and Factor challenge on reset.",
            done() { return player.IP.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Infinity points",
            effectDescription: "Keep Negative numbers upgrades and milestone on reset.",
            done() { return player.IP.points.gte(2) }
        },
        4: {
            requirementDescription: "3 Infinity points",
            effectDescription: "Keep factor upgrades and milestone on reset.",
            done() { return player.IP.points.gte(3) }
        },
        6: {
            requirementDescription: "4 Infinity points",
            effectDescription: "gain 100% of Negative numbers on reset per second and keep upgrade factor milestone on reset.",
            done() { return player.IP.points.gte(4)||hasMilestone("MS", 2) }
        },
        26: {
            requirementDescription: "1e26 Infinity points",
            effectDescription: "Factor are cheaper.",
            done() { return player.IP.points.gte(1e26) }
        },
        10000: {
            requirementDescription: "1e10000 Infinity points",
            effectDescription: "NN gain ^1.05",
            done() { return player.IP.points.gte("1e10000") }
        },
        17000: {
            requirementDescription: "1e17000 Infinity points",
            effectDescription: "Unlock Exponentiation.",
            done() { return player.IP.points.gte("1e17000") }
        },
        20000: {
            requirementDescription: "1e20000 Infinity points",
            effectDescription: "Unlock Exponentiation prestige.",
            done() { return player.IP.points.gte("1e20000") }
        },
        38500: {
            requirementDescription: "1e38500 Infinity points",
            effectDescription: "Unlock Negative numbers Challenge.",
            done() { return player.IP.points.gte("1e38500") }
        },
        1000000: {
            requirementDescription: "1e1000000 Infinity points",
            effectDescription: "Remove the hardcap of Exponentiation point and prestige point gain.",
            done() { return player.IP.points.gte("1e1000000") }
        },
        6000000: {
            requirementDescription: "1e6000000 Infinity points",
            effectDescription: "IP upgrade 43 has no effect but Number gain ^3.",
            done() { return player.IP.points.gte("1e6000000") }
        },
        30000000: {
            requirementDescription: "1e30000000 Infinity points",
            effectDescription: "gain 100% of Infinity point on reset per second",
            done() { return player.IP.points.gte("1e30000000") }
        },
        4.4e12: {
            requirementDescription: "e4.444e12 Infinity points",
            effectDescription: "Boost '9'",
            done() { return player.IP.points.gte("e4.444e12") }
        },
    },
    doReset(resettingLayer) {
        let keep = [];
    
        if (resettingLayer=="E") keep.push("milestones")
        if (resettingLayer=="E"&&hasMilestone('E',3)) keep.push("upgrades")
        if (resettingLayer=="E"&&hasMilestone('E',5)) keep.push("challenges")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    passiveGeneration(){return hasMilestone('IP',30000000)? 1 : 0},
    upgrades:{
        11: {
            title: "UltraLuigi (Easter Egg 1, 2 and 3)",
            description: "Unlock 1 Negative numbers buyable.",
            cost: new Decimal(5),
            unlocked(){
                return true
            },
        

    },
    12: {
        title: "TrueDiego ΔΔΔ (Easter Egg 1)",
        description: "Unlock 1 Infinity point Challenge",
        cost: new Decimal(10),
        unlocked(){
            return hasUpgrade('IP',11)
        },
},
21: {
    title: "JashinFanatic (Easter Egg 1 and 3)",
    description: "Auto buy Negative numbers buyable and Infinity point boost Negative numbers gain.",
    cost: new Decimal(10),
    unlocked(){
        return hasUpgrade('IP',11)
    },
},
22: {
    title: "_lx5=nitro (Easter Egg 1)",
    description: "Remove the hardcap of -2 but nerf it.",
    cost: new Decimal(100),
    unlocked(){
        return hasUpgrade('IP',12)&&hasUpgrade('IP',21)
    },
},
13: {
    title: "Elund (Easter Egg 1, 2 and 3)",
    description: "Remove the hardcap of -4 but nerf it and nerf IP gain.",
    cost: new Decimal(3000),
    unlocked(){
        return hasUpgrade('IP',12)
    },
},
23: {
    title: "garnet420 (Easter Egg 1 and 3)",
    description: "Unlock 2 Infinity point challenge.",
    cost: new Decimal(200000),
    unlocked(){
        return hasUpgrade('IP',13)&&hasUpgrade('IP',22)
    },
},
31: {
    title: "♾InFiIipity♾ (Easter Egg 1)",
    description: "Unlock 1 Infinity point challenge.",
    cost: new Decimal(1e9),
    unlocked(){
        return hasUpgrade('IP',21)
    },
},
32: {
    title: "luenix (Easter Egg 1 and 2)",
    description: "Boost '-4'",
    cost: new Decimal(1e14),
    unlocked(){ 
        return hasUpgrade('IP',31)&&hasUpgrade('IP',22)
    },
},
33: {
    title: "Eternity308 (Easter Egg 1)",
    description: "Unlock 2 Infinity point Challenge.",
    cost: new Decimal(1e15),
    unlocked(){
        return hasUpgrade('IP',32)&&hasUpgrade('IP',23)
    },
},
44: {
    title: "Rabbit (Easter Egg 3)",
    description: "Negative numbers x 1e80000 but '^' and '-+' have no effect",
    cost: new Decimal("1e4100"),
    unlocked(){
        return hasUpgrade('IP',33)
    },
},
45: {
    title: "Mike95358 (Easter Egg 3)",
    description: "Unlock 2 Infinity challenge  ",
    cost: new Decimal("1e5500"),
    unlocked(){
        return hasUpgrade('IP',44)
    },
},
46: {
    title: "Elliott (Easter Egg 3)",
    description: "Boost Number gain base on Infinity.",
    cost: new Decimal("1e6400"),
    unlocked(){
        return hasUpgrade('IP',45)
    },
},
54: {
    title: "Crabble (Easter Egg 3)",
    description: "IP gain ^1.1",
    cost: new Decimal("1e7900"),
    unlocked(){
        return hasUpgrade('IP',45)
    },
},
55: {
    title: "foxes1338 (Easter Egg 3)",
    description: "IP gain ^1.05",
    cost: new Decimal("1e9300"),
    unlocked(){
        return hasUpgrade('IP',54)
    },
},
56: {
    title: "beatable (Easter Egg 3)",
    description: "'Factor Lambda' has no effect but Number gain ^1.75",
    cost: new Decimal("1e10700"),
    unlocked(){
        return hasUpgrade('IP',55)
    },
},
64: {
    title: "starkirby (Easter Egg 3)",
    description: "Unlock 1 Infinity challenge",
    cost: new Decimal("1e228888"),
    unlocked(){
        return hasUpgrade('IP',56)
    },
},
65: {
    title: "Antimatter Dimensions player777 (Easter Egg 3)",
    description: "Unlock 1 Infinity challenge.",
    cost: new Decimal("1e777777"),
    unlocked(){
        return hasUpgrade('IP',64)
    },
},
66: {
    description: "Unlock 1 NN challenge.",
    cost: new Decimal("1e1161161"),
    unlocked(){
        return hasUpgrade('IP',65)
    },
},
    },
    
    challenges:{
        11: {
            name: "Infinity 1",
            challengeDescription: "Number gain ^0.9 . ",
            canComplete(){if(hasChallenge('IP',12)) return player.NN.points.gte("1e1000")
            else return player.NN.points.gte("1.8e308")},
            goalDescription: "1.80e308 Negative numbers (1e1000 Negative numbers after complete Infinity 2)",
            rewardDescription(){return "Negative numbers ^1.1."},
          unlocked(){return hasUpgrade('IP',12)},
        },
          12: {
            name: "Infinity 2",
            challengeDescription: "'-4' is no effect. ",
            canComplete(){ if(hasChallenge('IP',11)) return player.NN.points.gte("1e1000")
            else return player.NN.points.gte("1.8e308")},
            goalDescription: "1.80e308 Negative numbers (1e1000 Negative numbers after complete Infinity 1)",
            rewardDescription(){return "Negative numbers ^1.15."},
          unlocked(){return hasUpgrade('IP',31)},
        },
        21: {
            name: "Eternity 1",
            challengeDescription: "Number gain ^0.5 . ",
            canComplete(){
                if(hasChallenge('IP',22)) return player.NN.points.gte("1e1000")
                else return player.NN.points.gte("1.8e308")},
            goalDescription: "1.80e308 Negative numbers (1e1000 Negative numbers after complete Eternity 2)",
            rewardDescription(){return "Negative numbers ^1.2."},
          unlocked(){return hasUpgrade('IP',23)},

        },
        22: {
            name: "Eternity 2",
            challengeDescription: "'-2' is no effect' . ",
            canComplete(){
                if(hasChallenge('IP',21)) return player.NN.points.gte("1e1000")
                else return player.NN.points.gte("1.8e308")},
            goalDescription: "1.80e308 Negative numbers (1e1000 Negative numbers after complete Eternity 1)",
            rewardDescription(){return "Negative numbers ^1.25."},
          unlocked(){return hasUpgrade('IP',23)},
        },
        31: {
            name: "Reality 1",
            challengeDescription: "Number gain ^0.15 .",
            canComplete(){
                if(hasChallenge('IP',32)) return player.NN.points.gte("1e1000")
                else return player.NN.points.gte("1.8e308")},
            goalDescription: "1.80e308 Negative numbers (1e1000 Negative numbers after complete Reality 2)",
            rewardDescription(){return "Numbers ^1.3."},
          unlocked(){return hasUpgrade('IP',33)},
        },
        32: {
            name: "Reality 2",
            challengeDescription: "'-2', '-3' and '-4' is no effect.",
            canComplete(){
                if(hasChallenge('IP',31)) return player.NN.points.gte("1e1000")
                else return player.NN.points.gte("1.8e308")},
            goalDescription: "1.80e308 Negative numbers (1e1000 Negative numbers after complete Reality 1)",
            rewardDescription(){return "Numbers ^1.35."},
          unlocked(){return hasUpgrade('IP',33)},
        },
    },
    clickables: {
        11:{
            display() {return "Reset Infinity challenge"},
            canClick(){return true},
            onClick(){player.IP.challenges[11] = 0
                player.IP.challenges[12] = 0 }
            },
        12:{
        display() {return "Reset Eternity challenge"},
        canClick(){return true},
        onClick(){player.IP.challenges[21] = 0
            player.IP.challenges[22] = 0 }
        },
        13:{
            display() {return "Reset Reality challenge"},
            canClick(){return true},
            onClick(){player.IP.challenges[31] = 0
                player.IP.challenges[32] = 0 
               }
            },
     
    },

    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone('NN',1.79e308)||hasMilestone('IP',1)},
    tabFormat: {
        "Milestones":{
          content:[
        "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
        "blank",
        "resource-display",
        "blank",
        "blank",
        "milestones",
          ]},
          "Upgrades":{
            content:[
              "main-display",
              "blank",
            ["prestige-button",function(){return ""}],
              "blank",
              "blank",
              "upgrades",
            ]
        },
      
      "Challenges":{
        unlocked(){return hasUpgrade('IP',21)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "challenges",
          "clickables",

        ]
    },

    
      },
})
addLayer("MS", {
    name: "Mathematics Symbol", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        x: new Decimal(1),
        y: new Decimal(1),
        xgain: new Decimal(0),
        ygain: new Decimal(0),
        Exponentiation: new Decimal(0),
        Prestige: new Decimal(0),
        Prestige2: new Decimal(0),
        gainb:new Decimal(0),
    }},
    color: "#8000ff",
    requires: new Decimal("1e1800"), // Can be a function that takes requirement increases into account
    resource(){return "Mathematics Symbol"}, 
    baseResource: "Infinity point", // Name of resource prestige is based on
    baseAmount() {return player.IP.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base:new Decimal("1e2700"),
    exponent(){
        if(player.MS.points>=4)  return 20
        return 2
        
    },
    branches:["IP","I","FS"],
    hotkeys: [
        {key: "m", description: "M: Reset for Mathematics Symbol", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.MS.unlocked) doReset("MS") },
        unlocked() {return hasMilestone('MS', 1)} // Determines if you can use the hotkey, optional
    },
    ],
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        1: {
            requirementDescription: "1 Mathematics Symbol",
            effectDescription: "Auto buy Number upgrade and Factor Upgrade and Number, points x1e20, FS reset nothing and Unlock 1 IC.",
            done() { return player.MS.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Mathematics Symbol",
            effectDescription: "Keep IP milestone 4, F milestone 4, 16 and UF milestone 6 and 7 on reset. IP gain ^1.1. Remove the hardcap of NN gain.",
            done() { return player.MS.points.gte(2) }
        },
        3: {
            requirementDescription: "3 Mathematics Symbol",
            effectDescription: "Keep F content and I milestones on reset, IP boost point gain.",
            done() { return player.MS.points.gte(3) }
        },
        4: {
            requirementDescription: "1 prestige point",
            effectDescription: "Boost X and Y gain based on Prestige points and X, Y gain x2.",
            done() { return player.MS.Prestige.gte(1) }
        },
        8: {
            requirementDescription: "8 prestige point",
            effectDescription: "You can't get any prestige point.",
            done() { return player.MS.Prestige.gte(8) }
        },
        40: {
            requirementDescription: "4 Mathematics Symbol",
            effectDescription: "IP ^1.1 and unlock 1 IC. Auto buy FS. Number x10.",
            done() { return player.MS.points.gte(4) }
        },
        41: {
            requirementDescription: "1 Super prestige point.",
            effectDescription: "Super prestige point boost X and Y gain and Y +1.",
            done() { return player.MS.Prestige2.gte(1) }
        },
        42: {
            requirementDescription: "2 Super prestige point.",
            effectDescription: "Get 25 prestige point on reset and unlock 1 upgrade.",
            done() { return player.MS.Prestige2.gte(2) }
        },
        55: {
            requirementDescription: "5 Super prestige point.",
            effectDescription: "Get 100 prestige point on reset.",
            done() { return player.MS.Prestige2.gte(5) }
        },
        400: {
            requirementDescription: "40 Super prestige point.",
            effectDescription: "You can't get any super prestige point and remove the hardcap of Exponentiation point gain.",
            done() { return player.MS.Prestige2.gte(40) }
        },
    },
    update(diff){
        let xgain = new Decimal(0)

        let ygain = new Decimal(0)
        if(hasMilestone('MS',400)) player.MS.Exponentiation=(Decimal.pow(player.MS.x,player.MS.y))
        else if(player.MS.Exponentiation.gte("1e6000")) return player.MS.Exponentiation=new Decimal("1e6000")
        else if(hasMilestone('IP',1000000)) player.MS.Exponentiation=(Decimal.pow(player.MS.x,player.MS.y))
        else if(player.MS.Exponentiation.gte("1e2500")&&!hasUpgrade('IP',66)) return player.MS.Exponentiation=new Decimal("1e2500")
        else player.MS.Exponentiation=(Decimal.pow(player.MS.x,player.MS.y))
        if(hasUpgrade("MS",11))xgain=new Decimal(1)
        if(hasUpgrade("MS",12))ygain=new Decimal(0.01)
        if(hasUpgrade('UF',23)) player.MS.y=player.MS.y.plus(ygain.times(diff).times(player.MS.x.add(1).log(10).add(1).log(10).add(1).log(10).add(1)).times(player.MS.Exponentiation.add(1).log(10).add(1).log(10).pow(0.5)).times(18).times(player.MS.Prestige.add(1)).add(1).pow(player.MS.Prestige2.add(1).pow(0.5).times(1.5)))
        else if(hasMilestone('MS',41)) player.MS.y=player.MS.y.plus(ygain.times(diff).times(player.MS.x.add(1).log(10).add(1).log(10).add(1).log(10).add(1)).times(player.MS.Exponentiation.add(1).log(10).add(1).log(10).pow(0.5)).times(18).times(player.MS.Prestige.add(1)).add(1).pow(player.MS.Prestige2.add(1).pow(0.5)))
        else if(hasUpgrade('IP',66)) player.MS.y=player.MS.y.plus(ygain.times(diff).times(player.MS.x.add(1).log(10).add(1).log(10).add(1).log(10).add(1)).times(player.MS.Exponentiation.add(1).log(10).add(1).log(10).pow(0.5)).times(18).times(player.MS.Prestige.add(1)))
        else if(hasMilestone('MS',4))  player.MS.y=player.MS.y.plus(ygain.times(diff).times(player.MS.x.add(1).log(10).add(1).log(10).add(1).log(10).add(1)).times(player.MS.Exponentiation.add(1).log(10).add(1).log(10).pow(0.5)).times(6).times(player.MS.Prestige.add(1)))
        else if (hasUpgrade('MS',25))player.MS.y=player.MS.y.plus(ygain.times(diff).times(player.MS.x.add(1).log(10).add(1).log(10).add(1).log(10).add(1)).times(player.MS.Exponentiation.add(1).log(10).add(1).log(10).pow(0.5)).times(3))
        else if (hasUpgrade('MS',24)) player.MS.y=player.MS.y.plus(ygain.times(diff).times(player.MS.x.add(1).log(10).add(1).log(10).add(1).log(10).add(1)).times(player.MS.Exponentiation.add(1).log(10).add(1).log(10).pow(0.5)).times(2))
        else if (hasUpgrade('MS',22))player.MS.y=player.MS.y.plus(ygain.times(diff).times(player.MS.x.add(1).log(10).add(1).log(10).add(1).log(10).add(1)).times(player.MS.Exponentiation.add(1).log(10).add(1).log(10).pow(0.5)))
        else if (hasUpgrade('MS',14))player.MS.y=player.MS.y.plus(ygain.times(diff).times(player.MS.x.add(1).log(10).add(1).log(10).add(1).log(10).add(1)))
        else player.MS.y=player.MS.y.plus(ygain.times(diff))
        if(hasUpgrade('UF',23)) player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.y.add(1)).times(player.MS.Exponentiation.add(1).log(10).pow(0.5)).pow(1.25).times(15).times(player.MS.Prestige.add(1)).pow(player.MS.Prestige2.add(1).pow(0.5).times(1.5)))
        else if(hasMilestone('MS',41)) player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.y.add(1)).times(player.MS.Exponentiation.add(1).log(10).pow(0.5)).pow(1.25).times(15).times(player.MS.Prestige.add(1)).pow(player.MS.Prestige2.add(1).pow(0.5)))
        else if(hasUpgrade('IP',66)) player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.y.add(1)).times(player.MS.Exponentiation.add(1).log(10).pow(0.5)).pow(1.25).times(15).times(player.MS.Prestige.add(1)))
        else if(hasMilestone('MS',4)) player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.y.add(1)).times(player.MS.Exponentiation.add(1).log(10).pow(0.5)).pow(1.25).times(5).times(player.MS.Prestige.add(1)))
        else if (hasUpgrade('MS',25))  player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.y.add(1)).times(player.MS.Exponentiation.add(1).log(10).pow(0.5)).pow(1.25).times(2.5))
        else if (hasUpgrade('MS',23))  player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.y.add(1)).times(player.MS.Exponentiation.add(1).log(10).pow(0.5)).pow(1.25))
        else if (hasUpgrade('MS',21))  player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.y.add(1)).times(player.MS.Exponentiation.add(1).log(10).pow(0.5)))
        else if (hasUpgrade('MS',15))  player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.y.add(1)))
        else if (hasUpgrade('MS',13)) player.MS.x=player.MS.x.plus(xgain.times(diff).times(player.IP.points.add(1).log(10).add(1).log(10).add(1)))
        else  player.MS.x=player.MS.x.plus(xgain.times(diff))
    },
    upgrades: {
        11: {
            title: "^",
            description: "x +1 per second",
            cost: new Decimal("1"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation"
        },
        12: {
            title: "^2",
            description: "y +0.01 per second",
            cost: new Decimal("30"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation"
        },
        13: {
            title: "^3",
            description: "IP boost X gain and X boost IP gain.",
            cost: new Decimal("1000"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation"
        },
        14: {
            title: "^4",
            description: "X boost Y gain.",
            cost: new Decimal("1000000"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation"
        },
        15: {
            title: "^5",
            description: "Y boost X gain",
            cost: new Decimal("1e10"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation"
        },
        21: {
            title: "^6",
            description: "Exponentiation points boost X gain",
            cost: new Decimal("1e20"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation",
     
        },
        22: {
            title: "^7",
            description: "Exponentiation points boost Y gain",
            cost: new Decimal("1e35"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation",
     
        },
        23: {
            title: "^8",
            description: "X gain ^1.25",
            cost: new Decimal("1e50"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation",
     
        },
        24: {
            title: "^9",
            description: "Y gain *2",
            cost: new Decimal("1e70"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation",
     
        },
        25: {
            title: "^10",
            description: "Boost point gain base on exponentiation point and X gain x2.5, Y gain *1.5.",
            cost: new Decimal("1e90"),
            currencyDisplayName: "Exponentiation points",
            currencyLayer:"MS",
            currencyInternalName:"Exponentiation",
     
        },
        31: {
            title: "^^1",
            description: "point gain ^2 and remove the hardcap of IP gain but nerf IP gain.",
            cost: new Decimal("1e1600000"),
            currencyDisplayName: "points",
            currencyInternalName:"points",
            unlocked(){return player.MS.Prestige2.gte(2)}
     
        },
  
    },
    clickables:{
        
            11:{
                display() {return "Reset Your x and y for 1 Prestige point (Req: 1e150 Exponentiation points)."},
                canClick(){return player.MS.Exponentiation.gte("1e150")&&!player.MS.Prestige.gte("100")&&((!hasMilestone('MS',8))||(hasMilestone('IP',1000000)))},
                onClick(){
                    player.MS.Prestige=player.MS.Prestige.plus(1)
                    player.MS.x=new Decimal(1)

                    player.MS.y=new Decimal(1) 
                    player.MS.Exponentiation=new Decimal(1) 
                },
        
    },
    12:{
        display() {return "Reset Your x, y, prestige point and MS milestone for 1 Super Prestige point (Req: 1e4000 Exponentiation points and 25 prestige point.)."},
        canClick(){return player.MS.Exponentiation.gte("1e4000")&&player.MS.Prestige.gte("25")&&(!player.MS.Prestige2.gte("2")||(hasUpgrade('UF',22))&&(!player.MS.Prestige2.gte("40")))},
        onClick(){
         
            player.MS.Prestige2=player.MS.Prestige2.plus(1)
            player.MS.x=new Decimal(1)
            player.MS.milestones = []
            player.MS.y=new Decimal(1) 
            player.MS.Exponentiation=new Decimal(1) 
            if(player.MS.Prestige2.gte(5)) {player.MS.Prestige=new Decimal(100)}
            else if(player.MS.Prestige2.gte(2)) {player.MS.Prestige=new Decimal(25)}
            else {player.MS.Prestige=new Decimal(0)}
        
        },

},
},

    layerShown(){return hasUpgrade('F',46)||hasMilestone('MS',1)},
    tabFormat: {
        "Milestones": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "milestones"
            ]
        },
        "Exponentiation": {
            unlocked(){
return hasMilestone('IP',17000)||hasMilestone('MS',40)
            },
            content: [
                "main-display",
                "prestige-button",
                "blank",

            ["display-text",function(){
              let s=""
              s+="Your x is "+format(player.MS.x)+"<br>"
              s+="Your y is "+format(player.MS.y)+"<br>"
           
              s+="x^y = "+format(Decimal.pow(player.MS.x,player.MS.y))+"<br>"
              return s
            }],
        "blank",
            ["display-text",function(){
              let s="You have "+format(player.MS.Exponentiation)+" Exponentiation points."
              return s}],
              "blank",
             "upgrades",
            ],
        },
        "Prestige": {
            unlocked(){
                return hasMilestone('IP',20000)||hasMilestone('MS',40)
                            },
            content: [
                "main-display",
                "prestige-button",
                "blank",
    
            ["display-text",function(){
              let s=""
              s+="Your x is "+format(player.MS.x)+"<br>"
              s+="Your y is "+format(player.MS.y)+"<br>"
           
              s+="x^y = "+format(Decimal.pow(player.MS.x,player.MS.y))+"<br>"
             
              return s
            }],
        "blank",
            ["display-text",function(){
              let s="You have "+format(player.MS.Exponentiation)+" Exponentiation points.<br>"
              s+="Your have  "+format(player.MS.Prestige)+" prestige point<br>"
              s+="Your have  "+format(player.MS.Prestige2)+" super prestige point<br>"
              return s}],
              "blank",
             "clickables",
            ],
        },
    },
   


        
})
addLayer("E", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0), 
        Npower: new Decimal(1),     
        Ppower: new Decimal(1),    
        NNpower: new Decimal(1),   
        IPpower: new Decimal(1),  
        CP: new Decimal(0),  
        CPget: new Decimal(0),      // "points" is the internal name for the main resource of the layer.
    }},
    canReset(){if(hasMilestone('E',22))  return player.N.points.gte("e9e15")
        else return inChallenge('I',62)&&player.N.points.gte("e9e15")},

    color: "#80ff80",                       // The color for this layer, which affects many elements.
    resource: "Eternity points",            // The name of this layer's main prestige resource.
    resource(){return "Eternity points"}, 
    row: 3,                                 // The row this layer is on (0 is the first row).

    baseResource: "Numbers",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.N.points },  // A function to return the current amount of baseResource.

    requires: function(){

		return new Decimal("e9e15");
	},            
    prestigeButtonText() { 
        return "Reset for <b>" + formatWhole(tmp[this.layer].resetGain) + "</b> Eternity points" 
    

    },                                    
    type: "custom",                         
    exponent: 1,     
    hotkeys: [
        {key: "e", description: "E: Reset for Eternity points", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.E.unlocked) doReset("E") },
        unlocked() {return hasMilestone('E', 1)} // Determines if you can use the hotkey, optional
    },
    ],
    getResetGain() {
        if(!player.N.points.gte("e9e15")) return 0
        else if(!player.N.points.gte("ee16")&&player.N.points.gte("e9e15")) return 1
        else if(hasUpgrade('E',12)&&hasUpgrade('E',14)) return formatWhole(player.N.points.log(10).log(10).minus(15).times(player.E.CP.add(1).pow(2)).times(5).times(upgradeEffect('E',14)))
        else if(hasUpgrade('E',14))  return formatWhole(player.N.points.log(10).log(10).minus(15).times(player.E.CP.add(1).pow(2)).times(upgradeEffect('E',14)))
        else if(hasUpgrade('E',12))  return formatWhole(player.N.points.log(10).log(10).minus(15).times(player.E.CP.add(1).pow(2)).times(5))
        else return formatWhole(player.N.points.log(10).log(10).minus(15).times(player.E.CP.add(1).pow(2)))
    },
    getNextAt: function(){
        if(!player.N.points.gte("e9e15")) return "e9.000e15"
        return "e" + Decimal.pow(10, new Decimal(tmp[this.layer].resetGain).add(16))
	},

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)


        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    milestones:{
        1: {
            requirementDescription: "1 Eternity points",
            effectDescription: "Keep IP and I milestone, Infinity challenge and Negative numbers challenge on reset. Number ^1.2.",
            done() { return player.E.points.gte(1) }
        },
        3: {
            requirementDescription: "3 Eternity points",
            effectDescription: "Keep IP upgrade on reset.",
            done() { return player.E.points.gte(3) }
        },
        5: {
            requirementDescription: "5 Eternity points",
            effectDescription: "Keep NN upgrade and IP challenge on reset.",
            done() { return player.E.points.gte(5) }
        },
        8: {
            requirementDescription: "8 Eternity points",
            effectDescription: "Keep UF upgrade on reset.",
            done() { return player.E.points.gte(8) }
        },
        12: {
            requirementDescription: "12 Eternity points",
            effectDescription: "Unlock 1 challenge and EP boost Number gain.",
            done() { return player.E.points.gte(12) }
        },
        21: {
            requirementDescription: "1 Challenge points",
            effectDescription: "Challenge points boost EP gain.",
            done() { return player.E.CP.gte(1) }
        },
        22: {
            requirementDescription: "100 Eternity points",
            effectDescription: "You can do reset without in Boost or Nerf 4 (Exclude challenge).",
            done() { return player.E.points.gte(100) }
        },
 300: {
            requirementDescription: "300 Eternity points",
            effectDescription: "EP boost Number gain.",
            done() { return player.E.points.gte(300) }
        },
        600: {
            requirementDescription: "600 Eternity points",
            effectDescription: "Unlock more challenge selector.",
            done() { return player.E.points.gte(600) }
        },
        603: {
            requirementDescription: "3 Challenge points",
            effectDescription: "You can buy max factor.",
            done() { return player.E.CP.gte(3) },
        },
        5000: {
            requirementDescription: "5000 Eternity points",
            effectDescription: "Unlock 1 NN chalenge.",
            done() { return player.E.points.gte(5000) },
        },
        5007: {
            requirementDescription: "7 Challenge points",
            effectDescription: "Unlock 5 EP upgrade but you only can buy Challenge points^0.5 upgrade.",
            done() { return player.E.CP.gte(7) },
        },
        5010: {
            requirementDescription: "10 Challenge points",
            effectDescription: "You can complete challenge without in Boost or Nerf 4.",
            done() { return player.E.CP.gte(10) },
        },
        500000: {
            requirementDescription: "500000 Eternity points",
            effectDescription: "Number ^1.2 if you are in E challenges.",
            done() { return player.E.points.gte(500000) },
        },
    },
    challenges:{
        11:{
            name: "Choose",
        challengeDescription: "You can choose your nerf",
        canComplete(){
            if(hasMilestone('E',5010))  return player.N.points.gte(1e1000)
        else return player.N.points.gte(1e1000)&&inChallenge('I',62)
           },
        goalDescription(){ 
            if(hasMilestone('E',5010))  return "e9e15 Number"
            else return "e9e15 Number while you are in Boost or nerf 4."},
        rewardDescription(){ 
    return "You can gain challenge point."

        },
        onExit(){
            if(player.N.points.gte("e9e15")&&player.E.CPget.gte(player.E.CP)&&inChallenge('I',62)) player.E.CP=player.E.CPget
            else if (player.N.points.gte("e9e15")&&player.E.CPget.gte(player.E.CP)&&hasMilestone('E',5010)) player.E.CP=player.E.CPget
        },
      unlocked(){return hasMilestone('E',12)},
    }
    },
    clickables:{

            11:{
                display() {return "Number ^0.5 per click. Currently: ^" +  format(player.E.Npower)},

                canClick(){return (!inChallenge('E',11))},
                onClick(){player.E.Npower = player.E.Npower.times(0.5)
                player.E.CPget = player.E.CPget.add(1)}
                },
                12:{
                    display() {return "Point ^0.3 per click. Currently: ^" +  format(player.E.Ppower)},
    
                    canClick(){return (!inChallenge('E',11))},
                    onClick(){player.E.Ppower = player.E.Ppower.times(0.3)
                        player.E.CPget = player.E.CPget.add(1)}
                    },
                    13:{
                        display() {if(player.E.NNpower.gte(1)) return "You can't get NN. Currently: false"
                    else return "You can't get NN. Currently: true"},
        unlocked(){return hasMilestone('E',600)},
                        canClick(){return (!inChallenge('E',11)&&(player.E.NNpower.gte(1)))},
                        onClick(){player.E.NNpower = player.E.NNpower.times(0)
                            player.E.CPget = player.E.CPget.add(2)}
                        },
                        14:{
                            display() {if(player.E.IPpower.gte(1)) return "You can't get IP. Currently: false"
                        else return "You can't get IP. Currently: true"},
            unlocked(){return hasUpgrade('UF',31)},
                            canClick(){return (!inChallenge('E',11)&&(player.E.IPpower.gte(1)))},
                            onClick(){player.E.IPpower = player.E.IPpower.times(0)
                                player.E.CPget = player.E.CPget.add(2)}
                            },
                41:{
                    display() {return "Clear selector data"},
    
                    canClick(){return true},
                    onClick(){
                        player.E.Npower = new Decimal(1)
                        player.E.Ppower = new Decimal(1)
                        player.E.NNpower = new Decimal(1)
                        player.E.IPpower = new Decimal(1)
                        player.E.CPget = new Decimal(0)
                    }
                    },
                    42:{
                        display() {return "Reset challenge points."},
        
                        canClick(){return true},
                        onClick(){
                            player.E.CP = new Decimal(0)
                        }
                        },
                        51:{
                            display() {return "Reset E upgrade."},
            
                            canClick(){return true},
                            onClick(){
                                player.E.upgrades = []
                            }
                            },
         

    },
    update(diff){
        player.E.upgrades=player.E.upgrades.slice(0,player.E.CP.pow(0.5))
      
      },
    upgrades: {
        canAfford(){
            return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(1))
            },
        11: {
            title: "1",
            description: "Number ^2",
            cost: new Decimal("0"),
            canAfford(){
                return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },

        
        },
        12: {
            title: "2",
            description: "EP gain x5.",
            cost: new Decimal("0"),
      
            canAfford(){
                return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },

        },
        13: {
            title: "3",
            description: "Boost '9' and '0'.",
            cost: new Decimal("0"),
            canAfford(){
                return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },
},

        14: {
            title: "4",
            description: "EP boost themselves.",
            cost: new Decimal("0"),
            effect(){return player.E.points.add(1).log(10).add(1).log(10).add(1).pow(2)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            canAfford(){
                return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },
        },
      
        15: {
            title: "5",
            description: "Point ^2",
            cost: new Decimal("0"),
            canAfford(){
                return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },
          
   
        },
    },

    layerShown() { return (hasChallenge('I',62)) },          // Returns a bool for if this layer's node should be visible in the tree.
    branches:["I"],
    tabFormat: {
        "Milestones": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){
                    let s=""
                   
                 
                    if(!hasMilestone('E',22)) s+="You can reset while you are in Boost or nerf 4.<br>"
                    return s
                  }],
                "milestones"
            ]
        },
        "Challenges": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "challenges",
                ["row",[ ["clickable",11], ["clickable",12], ["clickable",13], ["clickable",14]]],
                ["row",[ ["clickable",41], ["clickable",42]]],
            ["display-text",function(){
                let s=""
             
                s+="You Will get "+format(player.E.CPget)+" Challenge points.<br>"
                s+="You have "+format(player.E.CP)+" Challenge points. (Based on best)<br>"

                return s
              }],

            ]
        },
        "Upgrades": {
            unlocked(){return (hasMilestone('E',5007))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "upgrades",
                ["clickable",51],
            ]
        },
    },


})