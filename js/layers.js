addLayer("N", {
    name: "Numbers", // This is optional, only used in a few places, If absent it just uses the layer id.
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
    resource: "Numbers", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (inChallenge('I', 11)||inChallenge('I', 12)||inChallenge('I', 31)) mult = mult.times(1e50)
        if (hasAchievement("A", 14)) mult = mult.times(2)
        if (inChallenge('F', 33)|inChallenge('F',43)) mult = mult.times(0.000001)
        if (inChallenge('F', 31)) mult = mult.times(0.000001)
        if (hasMilestone('F',1580)) mult = mult.times(buyableEffect('N',13))
        if (hasMilestone('F',8)) mult = mult.times(2)
        if (hasUpgrade('F',15)) mult = mult.times(buyableEffect('N',11))
        if (hasUpgrade('N',44)) mult = mult.times(buyableEffect('F',11))
        if (hasMilestone('NN',1e28)) mult = mult.times(buyableEffect('F',13))
        if (hasUpgrade('F',15)&& !inChallenge('F',42)) mult = mult.times(2)
        if (inChallenge('F', 23)) mult = mult.times(0.3)
        if (hasChallenge('F', 21)) mult = mult.times(1.5)
        if (hasChallenge('F', 11)) mult = mult.times(3)
        if (hasUpgrade('NN', 11)) mult = mult.times(1e4)
        if (hasChallenge('F', 22)) mult = mult.times(2)
        if (hasAchievement("A", 12)) mult = mult.times(3)
        if (hasUpgrade('F',12)) mult = mult.times(upgradeEffect('F', 12))
        if (inChallenge('F', 11)) mult = mult.times(0.3)
        if (inChallenge('F', 13)) mult = mult.times(0.3)
        if (hasChallenge('F', 12)) mult = mult.times(3)
        if (hasAchievement("A", 33)) mult = mult.times(5)
       if (hasUpgrade('N',14)) mult = mult.times(upgradeEffect('N', 14))
       if (hasUpgrade('F',11)) mult = mult.times(upgradeEffect('F', 11))
        if (hasMilestone('F', 1)) mult = mult.times(player.F.points.add(1))
        if (hasMilestone('F', 1100)) mult = mult.times(player.F.points.add(1))
        if (hasMilestone('UF', 52)) mult = mult.times(player.UF.points.pow(3).add(1))
        if (hasMilestone('UF', 128)) mult = mult.times(player.UF.points.pow(3).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult=new Decimal(1) 
        if (hasMilestone('UF',11)) mult = mult.times(buyableEffect('N',21))
        if (hasUpgrade('NN',32)) mult = mult.times(1.25)
        if (hasMilestone('I',1)) mult = mult.times(1.05)
        if (hasMilestone('I',2)) mult = mult.times(1.05)
        if (inChallenge('I',11)) mult = mult.times(0.3)
        if (inChallenge('I',31)) mult = mult.times(0.09)
        if (inChallenge('I',21)) mult = mult.times(0.166666)
        if (hasChallenge('I',11)) mult = mult.times(1.1)
        if (hasChallenge('I',12)) mult = mult.times(1.2)
        if (hasChallenge('I',21)) mult = mult.times(1.3)
        if (hasChallenge('I',31)) mult = mult.times(1.4)
        if (hasUpgrade('F',31)) mult = mult.times(player.F.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1))
        if (hasUpgrade('F',43)) mult = mult.times(player.F.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1))
        return mult

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
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
        player[this.layer].upgrades.push(...extraUpgrades)
    },
    upgrades: {
        11: {
            title: "1",
            description: "Points gain x4.",
            cost: new Decimal(2),
        },
        12: {
            title: "2",
            description:"Numbers boost point gain.",
            cost: new Decimal(5),
            effect() {
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
                return hasUpgrade("N", 11)|hasMilestone("I", 1)
            },
        },
        13: {
            title: "3",
            description: "Points boost themselves",
            cost: new Decimal(20),
            effect() {
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
                return hasUpgrade("N", 12)|hasMilestone("I", 1)
            },
        },
        14: {
            title: "4",
            description: "Points boost Numbers gain.",
            cost: new Decimal(60),
            effect() {
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
                return hasUpgrade("N", 13)|hasMilestone("I", 1)
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
                    {return hasMilestone('UF',16)}
                },
        },
        43: {
            title: "18",
            description: "Upgrade factors are cheaper.",
            cost: new Decimal("3.14e378"),
            unlocked(){
                {return hasMilestone('UF',16)}
            },
    },
        44: {
        title: "19",
        description: " Unlock the first factor buyable",
        cost: new Decimal("1e413"),
        unlocked(){
            {return hasMilestone('UF',16)}
        },
    },
    45: {
        title: "20",
        description: "Unlock another buyable and a new numbers upgrade",
        cost: new Decimal("1e477"),
        unlocked(){
            {return hasMilestone('UF',16)}
        },
    },
    16: {
        title: "Master +",
        description: "The '+' effect is always 1e120",
        cost: new Decimal("1e487"),
        unlocked(){
            {return hasUpgrade('N',45)|hasMilestone("I", 2)}
        },
    },
    26: {
        title: "Master -",
        description: "The '-' effect is always 1e50",
        cost: new Decimal("1e785"),
        unlocked(){
            {return hasMilestone('I',2)}
        },
    },
    36: {
        title: "Master x",
        description: "The 'x' effect is always 1e100",
        cost: new Decimal("3.14e845"),
        unlocked(){
            {return hasMilestone('UF',128)}
        },
    },
    46: {
        title: "Master /",
        description: "The '/' effect is always 2.1 ",
        cost: new Decimal("1e895"),
        unlocked(){
            {return hasMilestone('UF',128)}
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
            {return hasUpgrade('F',35)}
        },
    },
    62: {
        title: "e",
        description: "Factor exponent is: 0.271(Factors are cheaper)",
        cost: new Decimal("1e17500"),
        unlocked(){
            {return hasUpgrade('NN',34)}
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
                else if (hasUpgrade('N',16)&&!inChallenge('I',12)) return eff = new Decimal("1e120")
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
            else if (hasUpgrade('N',41)&&(!hasUpgrade('N',36))) eff  = new Decimal(player.N.points.add(1).log(10).pow(0.65).add(1)).pow(getBuyableAmount("N", 13))
            
        else if(!hasUpgrade('N',36)) return eff  = new Decimal(player.N.points.add(1).log(10).pow(0.5).add(1)).pow(getBuyableAmount("N", 13))
        else if(hasUpgrade('N',36)) return eff = new Decimal("1e100")
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
                else if(hasUpgrade('N',46)) return eff = new Decimal("2.1") 
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

                eff = new Decimal("10").pow(getBuyableAmount("N", 22)) 
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
        unlocked(){return hasUpgrade('F',15)|hasMilestone("I", 1)},
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
    resource: "Negative numbers", // Name of prestige currency
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
        if (hasAchievement('A',41)) mult = mult.times(buyableEffect('N',22))
        if (hasUpgrade('F', 42)) mult = mult.times(player.F.points.add(1))
         if (hasMilestone('I',4)) mult = mult.times(10)
        if (hasUpgrade('NN',14)) mult = mult.times(upgradeEffect('NN', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "N", description: "shift + N: Reset for Negative number", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.UF.unlocked) doReset("NN") },
        unlocked() {return hasMilestone('I', 3)} // Determines if you can use the hotkey, optional
    },
    ],
  
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
                if (player.NN.points >=1e250) return new Decimal("1e1500")
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
                return hasUpgrade("NN", 11)
            },
        },
        13: {
            title: "-3",
            description: " Points boost themselves",
            cost: new Decimal(25),
            effect() {
                if (player.points.gte(1e2000)) return 1e300
                else if (hasUpgrade('NN',31)) return player.points.add(1).pow(0.15)
                else return 1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("NN", 31)
        },
    },
    14: {
        title: "-4",
        description: "Negative Numbers boost themselves",
        cost: new Decimal(15),
        effect() {
            if (player.NN.points >=4.6415888e+66) return 1e50
            if(hasUpgrade('NN',25)) return player.NN.points.pow(0.75).add(1)
            if (player.NN.points >=1e20) return 1e15
            if(hasUpgrade('NN',22)) return player.NN.points.pow(0.75).add(1)
            if (player.NN.points>= 2.1544347e+13) return 1e8
            
            else if (hasUpgrade('NN',21)) return player.NN.points.pow(0.6).add(1)
           
            else if (player.NN.points>= 3200000) return 400
            else return player.NN.points.pow(0.4).add(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked(){
            return hasUpgrade("NN", 12)
        },
    },
    15: {
        title: "-5",
        description: "Boost '2', '3', '4'.",
        cost: new Decimal(3141),
     
        unlocked(){
            return hasUpgrade("NN", 14)
        },
    },
    21: {
        title: "-6",
        description: "Boost '-2' and '-4'",
        cost: new Decimal(111111),
     
        unlocked(){
            return hasUpgrade("NN", 15)
        },
    },
    22: {
        title: "-7",
        description: "Boost '-2' and '-4'",
        cost: new Decimal(4.20e9),
     
        unlocked(){
            return hasUpgrade("N", 51)
        },
    },
    23: {
        title: "-8",
        description: "Boost '-2'",
        cost: new Decimal(1e20),
     
        unlocked(){
            return hasUpgrade("NN", 22)
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
            return (hasMilestone('I',6))
        
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
            return (hasMilestone('I',7))
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
                return (hasUpgrade('F',34))
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
                    return hasUpgrade("NN", 33)
                },
            },
},
    milestones: {
        3: {
            requirementDescription: "3 Negative numbers",
            effectDescription: "Keep master +, -, x, /, '2', '3', '4' and '19' on ALL resets.",
            done() { return player.NN.points.gte(3) }
        },
        4e22: {
            requirementDescription: "4e22 Negative number",
            effectDescription: "Unlock the first infinity challenge",
            done() { return player.NN.points.gte(4e22) }
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
    },
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("I", 4) && resettingLayer=="I") keep.push("milestones")
        if (hasMilestone("I", 4) && resettingLayer=="I") keep.push("upgrades")
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
    requires: new Decimal(1e30), // Can be a function that takes requirement increases into account
    resource: "Upgrade Factor", // Name of prestige currency
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base:1e10,
    exponent(){
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
            done() { return player.UF.points.gte(16) }
        },
        18: {
            requirementDescription: "18 Upgrade Factor",
            effectDescription: "upgrade factor reset nothing.",
            done() { return player.UF.points.gte(18) }
        },
        52: {
            requirementDescription: "52 Upgrade Factor",
            effectDescription: "Upgrade Factor boost point and Numbers gain.",
            done() { return player.UF.points.gte(52) }
        },
        128: {
            requirementDescription: "128 Upgrade Factor",
            effectDescription: "Unlock 2 Number upgrade and boost the eighth milestone.",
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
            challengeDescription: "'+' and '-' is no effect (You can do 4 times)",
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
  "Challenges":{
    unlocked(){return hasUpgrade('F',22)},
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
  canBuyMax(){
    return hasUpgrade('F',41) 
  },
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
    resource: "Factors", // Name of prestige currency
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 50,
    exponent(){
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
        unlocked() {return hasUpgrade('N', 15)} // Determines if you can use the hotkey, optional
    },
    ],
    canBuyMax(){
        return hasUpgrade('F',13) 
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
            done() { return player.F.points.gte(5)}
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
            done() { return player.F.points.gte(6000)|hasMilestone("I", 1)}
        },  
        12500: {
            requirementDescription: "12500 factors",
            effectDescription: "Remove the second hardcap of '+'.",
            done() { return player.F.points.gte(12500)}
        },  

    },
    upgrades: {
        11: {
            title: "Factor Alpha",
            description: "Boost points and numbers base on factors.",
            effect() {
                
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
            description: "Number boost themselves gain.",
            effect() {
                if (hasMilestone('I',28)) return player.N.points.pow(0.025).add(1)
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
        description: "Unlock 2 Number upgrade and 2 challenge, you can buy max factor.",
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
        return hasMilestone("UF", 1)|hasMilestone("I", 1)
    },
},
15: {
    title: "Factor Epsilon",
    description: "Unlock number buyable and Number x2",
    cost: new Decimal(60),
    unlocked(){
        return hasChallenge("F", 23)|hasMilestone("I", 1)
    },
},
21: {
    title: "Factor Zeta",
    description: "Unlock a challenge",
    cost: new Decimal(125),
    unlocked(){
        return player.UF.best.gte(3) |hasMilestone("I", 1)
    },
},
22: {
    title: "Factor Eta",
    description: "Unlock 1 upgrade factor challenge.",
    cost: new Decimal(135),
    unlocked(){
        return hasMilestone("I", 1)|(hasUpgrade('F',21)&&hasChallenge('F',33))
    },
},
23: {
    title: "Factor Theta",
    description: "Remove the fourth hardcap of '2'.",
    cost: new Decimal(169),
    unlocked(){
        return hasMilestone("I", 1)|hasUpgrade('F',22)
    },
},
24: {
    title: "Factor Iota",
    description: "Boost 'Factor Beta' and unlock 1 more factor upgrade." ,
    cost: new Decimal(375),
    unlocked(){
        return hasMilestone("I", 1)|hasMilestone('UF',6)
    },
},
25: {
    title: "Factor Kappa",
    description: "Unlock 2 factor challenge." ,
    cost: new Decimal(460),
    unlocked(){
        return hasMilestone("I", 1)|hasUpgrade('F',24)
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
    description: "Unlock 1 Infinity challenge " ,
    cost: new Decimal(555555555),
    unlocked(){
        return hasUpgrade("F", 31)
    },
},
33: {
    title: "Factor Xi",
    description: "Factor is cheaper." ,
    cost: new Decimal(1.11e9),
    unlocked(){
        return hasUpgrade("F", 32)
    },
},
34: {
    title: "Factor Omicron",
    description: "Unlock 1 Negative number Upgrade" ,
    cost: new Decimal(2.09e10),
    unlocked(){
        return hasUpgrade("F", 33)
    },
},
35: {
    title: "Factor Pi",
    description: "Unlock 1 number Upgrade" ,
    cost: new Decimal(2.7e10),
    unlocked(){
        return hasUpgrade("F", 34)
    },
},
41: {
    title: "Factor Rho",
    description: "Upgrade Factor are cheaper and you can buy max it." ,
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
    description: "Noost 'Factor Lambda'" ,
    cost: new Decimal(1.25e16),
    unlocked(){
        return hasUpgrade("F", 42)
    },
},

},
    challenges: {
        11: {
            name: "/ factor",
            challengeDescription: "Number and point gain x0.3",
            goal: new Decimal(1000000),
            rewardDescription(){return "Number and Point x3"},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 2)},
        },
        12: {
            name: "No upgrade factor",
            challengeDescription: "'2' is no effect",
            canComplete(){return player.N.points.gte("100000000")},
            goalDescription: "100,000,000 Numbers",
            rewardDescription(){return "Number and Point x3"},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 8)},
          
        },
        13: {
            name: "2 in 1",
            challengeDescription: "You trap in / and No upgrade factor.",
            canComplete(){return player.N.points.gte("3.14e9")},
            goalDescription: "3.14e9 Numbers",
            rewardDescription(){return "Unlock one number upgrade."},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 12)},
          
        },
        21: {
            name: "No cap factor",
            challengeDescription: "'6', '7' and '8' is no effect.",
            canComplete(){return player.N.points.gte("3.14e11")},
            goalDescription: "3.14e11 Numbers",
            rewardDescription(){return "Factor will not reset upgrade and number x1.5."},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 13)},
          
        },
        22: {
            name: "No factor factor",
            challengeDescription: "Factor milestone 4 and upgrades is no effect.",
            canComplete(){return player.N.points.gte("3.14e18")},
            goalDescription: "3.14e18 Numbers",
            rewardDescription(){return "Point and Number x2"},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 13)},
          
        },
        23: {
            name: "3 in 1",
            challengeDescription: "You trap in 2 in 1, No cap and no factor factor.",
            canComplete(){return player.N.points.gte("420420420")},
            goalDescription: "420,420,420 Numbers",
            rewardDescription(){return "Factor is cheaper and unlock 1 factor upgrade."},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 44)},
          
        },
        31: {
            name: "Super / factor",
            challengeDescription: "Point and Number / 1e6",
            canComplete(){return player.N.points.gte("3140")},
            goalDescription: "3,140 Numbers",
            rewardDescription(){return "unlock 1 Number buyable."},
          unlocked(){return hasMilestone("I", 1)|hasMilestone('F', 108)},
          
        },
        32: {
            name: "Super No upgrade factor",
            challengeDescription: "'2','3' and '4' is no effect",
            canComplete(){return player.N.points.gte("3.14e16")},
            goalDescription: "3.14e16 Numbers",
            rewardDescription(){return "'-' base x2 and unlock 1 challenge"},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 21)},
          
        },
        33: {
            name: "Super 2 in 1",
            challengeDescription: "You trap in super / and super No upgrade factor.",
            canComplete(){return player.N.points.gte("314")},
            goalDescription: "314 Numbers",
            rewardDescription(){return "'-' base x2 and unlock 1 factor upgrade"},
          unlocked(){return hasMilestone("I", 1)|(hasUpgrade('F', 21) && hasChallenge('F',32))},
          
        },
        41: {
            name: "Super no cap factor",
            challengeDescription: "'2', '3' and '4' effect is cap at 10",
            canComplete(){return player.N.points.gte("3.14e38")},
            goalDescription: "3.14e38 Numbers",
            rewardDescription(){return "Factor is cheaper."},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 25)},
          
        },
        42: {
            name: "Super no factor factor",
            challengeDescription: "Factor milestone 4 and upgrades are no effect.",
            canComplete(){return player.N.points.gte("3.14e45")},
            goalDescription: "3.14e45 Numbers",
            rewardDescription(){return "'-' cost base /1e4."},
          unlocked(){return hasMilestone("I", 1)|hasUpgrade('F', 25)},
          
        },
        43: {
            name: "Super 3 in 1",
            challengeDescription: "You trap in Super 2 in 1, Super no cap factor,and no factor factor.",
            canComplete(){return player.N.points.gte("1e15")},
            goalDescription: "1e15 Numbers",
            rewardDescription(){return "Factor is cheaper."},
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
                    eff = new Decimal("30").pow(getBuyableAmount("F", 11))     
                    return  eff = eff   
                      
                }
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
                    eff = new Decimal("24").pow(getBuyableAmount("F", 12))     
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
                    eff =  new Decimal(player.F.points.add(1).log(10).pow(3).add(1)).pow(getBuyableAmount("F", 13))
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
        unlocked(){return hasMilestone('F',5)|hasMilestone("I", 1)},
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
        unlocked(){return hasMilestone('F',2)|hasMilestone("I", 1)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "challenges",
        ]
      },
      "Buyables":{
        unlocked(){return hasUpgrade('N',44)},
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
        if (hasMilestone("I", 4) && resettingLayer=="I") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
      },
      


    layerShown(){return true}
})
addLayer("I", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#262626",
    requires: new Decimal("1.8e308"), // Can be a function that takes requirement increases into account
    resource: "Infinity", // Name of prestige currency
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
        {key: "i", description: "I: Reset for Infinity Factor", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.UF.unlocked) doReset("I") },
        unlocked() {return hasChallenge('N', 22)} // Determines if you can use the hotkey, optional
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
            effectDescription: "Endgame.",
            done() { return player.I.points.gte(69) }
        },
    },
    challenges: {
        11: {
            name: "IC1",
            challengeDescription: "Number gain ^0.3",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.1."},
          unlocked(){return hasMilestone("NN", 4e22)},
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
        31: {
            name: "IC5",
            challengeDescription: "Number gain ^0.09. ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.4."},
          unlocked(){return hasUpgrade("NN", 33)},
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
      
      "Challenges":{
        unlocked(){return hasMilestone('NN',4e22)},
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
    canBuyMax(){
        return hasMilestone('I',8) 
      },
    layerShown(){return true}
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
                return (hasMilestone('I',1))
            }
        },
        32:{
            name: "Second infinity",
            tooltip:"Get 2 Infinity, reward: Unlock 1 upgrade.",
            done()  {
                if (hasMilestone('I',2)) return true
            },
            unlocked(){
                return (hasMilestone('I',1))
            }
        },
        33:{
            name: "Free Infinity",
            tooltip:"Get 3 Infinity.",
            done()  {
                if (hasMilestone('I',3)) return true
            },
            unlocked(){
                return (hasMilestone('I',1))
            }
        },
        34:{
            name: "True Infinity",
            tooltip:"Get 1.8e308 point.",
            done()  {
                if (player.points.gte(1.79e308)) return true
            },
            unlocked(){
                return (hasMilestone('I',1))
            }
        },
        35:{
            name: "Impossible?",
            tooltip:"Get 1.8e258 Number in IC2, reward: Number x1e50 in Row 1, 3 Infinity Challenge.",
            done()  {
                if (player.N.points.gte(1.79e258)&&inChallenge('I',12)) return true
            },
            unlocked(){
                return (hasMilestone('I',1))
            }
        },  
        36:{
            name: "OM",
            tooltip:"Get 1 Factor shift.",
            done()  {
                if (player.FS.points.gte(1)) return true
            },
            unlocked(){
                return (hasMilestone('I',1))
            }
        },  
        37:{
            name: "I find the miss one!",
            tooltip:"Get '-3'",
            done()  {
                if (hasUpgrade('NN',13)) return true
            },
            unlocked(){
                return (hasMilestone('I',1))
            }
        },  
        41:{
            name: "Don't forget achievements",
            tooltip:"Get 1e50 Negative numbers in IC5, reward: Unlock 1 Number buyable.",
            done()  {
                if (player.NN.points.gte(1e50)&&inChallenge('I',31)) return true
            },
            unlocked(){
                return (hasMilestone('I',1))
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
    resource: "Factor shift", // Name of prestige currency
    baseResource: "Factors", // Name of resource prestige is based on
    baseAmount() {return player.F.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base:1000,
    exponent(){
return 1
    },
    branches:["F"],
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        1: {
            requirementDescription: "1 Factor shift",
            effectDescription: "Per factor shift make factor cheaper.",
            done() { return player.FS.points.gte(1) }
        },
    },
})