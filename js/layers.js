addLayer("D", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "Dimensions",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "antimatter",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal("eeeeeeeee10"),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    tooltip(){return "Dimensions"},
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

buyables:{
11:{

    cost() { return new Decimal(10).times(new Decimal(1000).pow(Decimal.floor(getBuyableAmount('D',11).div(10))))},
    display() { return "cost: " + new Decimal(10).times(new Decimal(1000).pow(Decimal.floor(getBuyableAmount('D',11).div(10))))},
    canAfford() { return player.points.gte(this.cost()) },
    buy() {
        player.points = player.points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    style: {'height':'50px','width':'150px',"font-size": "15px",},
}
},








tabFormat: {
"Dimensions":{content:[
    ["row", [ ["raw-html","1st dimension "+getBuyableAmount('D',11)+"d"], "buyables"]]],
   },
"Upgrades":{content:["upgrades"]}},
})