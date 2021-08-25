let modInfo = {
	name: "The normal tree",
	id: "game",
	author: "3^3=7",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "3.50",
	name: "milestone tree?",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v3.50</h3><br>
- Added 11 milestone.<br>
- Added 4 upgrade.<br>
- Added 1 buyable.<br>
- Endgame: 50 milestones.<br>
<h3>v3.41</h3><br>
- Added 2 layers.<br>
- Added 21 milestone.<br>
- Added 6 upgrade.<br>
- Endgame: 41 milestones.<br>
<h3>v3.20</h3><br>
- Added 9 milestone.<br>
- Added 3 upgrade.<br>
- Endgame: 20 milestones.<br>
<h3>v3.0</h3><br>
- Added milestones.<br>
- Added 3 upgrade.<br>
- Added 11 milestone.<br>
- Endgame: 11 milestones.<br>
<h3>v2.2</h3><br>
- Added timewall shrinker.<br>
- Added 18 upgrade.<br>
- Added 2 milestone.<br>
- Added 4 challenge.<br>
- Endgame: 7 simple nerf Completions.<br>
<h3>v2.1</h3><br>
- Added 5 upgrade.<br>
- Endgame: 1000 timewall.<br>
<h3>v2.0</h3><br>
- Added 8 upgrade.<br>
- Added 4 challenge.<br>
- Endgame: Go to timewall universe.<br>
<h3>v1.2.1</h3><br>
- Added 2 upgrade.<br>
- Added 3 challenge.<br>
- Endgame: 4900 challenge point.<br>
<h3>v1.2</h3><br>
- Added challenge coin.<br>
- Added 5 upgrade.<br>
- Added 7 milestone.<br>
- Endgame: C2 - C6 upgrade.<br>
<h3>v1.1.1</h3><br>
- Added 6 upgrade.<br>
- Added 2 clickable.<br>
- Added 3 milestone.<br>
- Added 1 challenge.<br>
- Endgame: 25 challenge point.<br>
<h3>v1.1</h3><br>
- Added challenge point.<br>
- Added 4 upgrade.<br>
- Added 1 buyable.<br>
- Added 4 clickable.<br>
- Endgame: 8 challenge point.<br>
<h3>v1.0</h3><br>
- Added distance.<br>
- Added achievement.<br>
- Added 2 upgrade.<br>
- Added 6 milestone.<br>
- Endgame: 1F100 point.<br>
<h3>v0.4.1</h3><br>
- Added 5 upgrade.<br>
- Added 3 milestone.<br>
- Added 1 challenge.<br>
- Endgame: 1e66666 presstige point.<br>
<h3>v0.4</h3><br>
- Added code.<br>
- Added 4 upgrade.<br>
- Added 4 milestone.<br>
- Endgame: 1e80 Amoebas.<br>
<h3>v0.3</h3><br>
- Added Amoebas.<br>
- Added 5 upgrade.<br>
- Added 3 milestone.<br>
- Endgame: 52 boosters and 3.14e17 Amoebas.<br>
<h3>v0.2</h3><br>
- Added booster.<br>
- Added 7 upgrade.<br>
- Added 3 milestone.<br>
- Endgame: 20 boosters.<br>
<h3>v0.1</h3><br>
- Added 9 upgrade.<br>
- Endgame: 1e26 prestige points.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
		
    let gain = new Decimal(1)
//normal universe

if(hasUpgrade('p',11)) gain=gain.times(upgradeEffect('p',11))
if(hasUpgrade('p',12)) gain=gain.pow(upgradeEffect('p',12))
if(hasUpgrade('p',21)) gain=gain.times(upgradeEffect('p',21))
if(hasUpgrade('p',22)) gain=gain.pow(upgradeEffect('p',22))
if(hasUpgrade('p',31)) gain=gain.times(upgradeEffect('p',31))
if(hasUpgrade('p',14)) gain=gain.times(1e10)
if(hasUpgrade('p',41)) gain=gain.times(upgradeEffect('p',32))     
if(hasUpgrade('a',11)) gain=gain.times(upgradeEffect('a',11))    
if(hasMilestone('c',0))     gain=gain.times(100)
//challenge universe

if(hasUpgrade('cp',11)) gain=gain.times(upgradeEffect('cp',11))  
if(hasUpgrade('cp',42))gain=gain.times(player.cp.bank1.add(1).log(2).add(1).pow(6).pow(upgradeEffect('cp',22)))
else if(hasUpgrade('cp',22))gain=gain.times(player.cp.bank1.add(1).log(2).add(1).pow(2).pow(upgradeEffect('cp',22))) 
else if(hasUpgrade('cp',14))gain=gain.times(player.cp.bank1.add(1).log(2).add(1).pow(2))   
else if(hasUpgrade('cp',12))gain=gain.times(player.cp.bank1.add(1).log(10).add(1).pow(2))   
if(hasUpgrade('cp',43)) gain=gain.times(player.cp.bank2.add(1).pow(0.3).pow(upgradeEffect('cp',25)))
else if(hasUpgrade('cp',25))gain=gain.times(player.cp.bank2.add(1).pow(0.2).pow(upgradeEffect('cp',25)))
else if(hasUpgrade('cp',23))gain=gain.times(player.cp.bank2.add(1).pow(0.2))
if(hasUpgrade('cp',13))gain=gain.times(buyableEffect('cp',11))  
if(hasUpgrade('cp',35))     gain=gain.times(100) 
if(hasMilestone('cc',0))     gain=gain.times(3) 
if(hasMilestone('cc',1))     gain=gain.times(3) 
if(hasMilestone('cc',2))     gain=gain.times(3) 
if(hasMilestone('cc',3))     gain=gain.times(3) 
if(hasMilestone('cc',4))     gain=gain.times(3) 
if(hasMilestone('cc',5))     gain=gain.times(3) 
if(hasMilestone('cc',6))     gain=gain.times(3) 
if(hasMilestone('cc',6))     gain=gain.times(player.cc.points.add(1).pow(0.85)) 
if(hasUpgrade('cp',41))gain=gain.pow(1.01) 
if(hasUpgrade('cp',42))gain=gain.pow(1.01) 
if(hasUpgrade('cp',43))gain=gain.pow(1.01) 
if(hasUpgrade('cp',44))gain=gain.pow(1.01) 
if(hasUpgrade('cp',44))gain=gain.pow(1.25) 
if(hasUpgrade('cp',45))gain=gain.pow(1.01) 
if(hasUpgrade('cp',45))gain=gain.pow(1.5) 
if(inChallenge('cc',11))gain=gain.pow(0.9) 
if(inChallenge('cc',101))gain=gain.pow(0.75) 
if(inChallenge('cc',102))gain=gain.pow(0.4) 
if(hasChallenge('cp',12))gain=gain.pow(player.cp.points.add(1).pow(player.cp.points))
//timewall universe

if(hasUpgrade('t',11)) gain=gain.times(tmp.t.effect)
if(hasUpgrade('t',12)&&!inChallenge('ts',21)) gain=gain.times(upgradeEffect('t',12))  
if(inChallenge('ts',21))gain=gain.div(upgradeEffect('t',12))  
if(hasUpgrade('t',13)&&!player.points.gte(10)) gain=gain.times(3)
if(hasUpgrade('ts',23)&&!inChallenge('ts',22))gain=gain.times(player.ts.timewallpower.add(1).add(1).pow(0.3))
else if(hasUpgrade('ts',14)&&!inChallenge('ts',22)) gain=gain.times(player.ts.timewallpower.add(1).log(2).add(1).pow(5))
else if((!hasUpgrade('ts',11)||hasUpgrade('ts',12))&&!inChallenge('ts',22))gain=gain.times(player.ts.timewallpower.add(1).log(10).add(1).pow(5))
if(hasUpgrade('ts',15)) gain=gain.times(upgradeEffect('ts',15))
gain=gain.times( new Decimal(10).pow(challengeCompletions('ts',21)))
if(hasUpgrade('t',25))gain=gain.pow(1.5)
if(hasUpgrade('ts',21))gain=gain.pow(1.25)
if(hasUpgrade('t',34))gain=gain.pow(1.3)
if(inChallenge('ts',11))gain=gain.pow(0.5)
if(hasUpgrade('ts',25)) gain=gain.pow(new Decimal(1.05).pow(challengeCompletions('ts',11)))
if(hasUpgrade('t',35)) gain=gain.pow(new Decimal(1.05).pow(challengeCompletions('ts',12)))
if(hasUpgrade('ts',31))gain=gain.tetrate(10)
//milestone universe

if(player.ach.uni.gte(3)) gain = new Decimal(0)
if(player.m.points.gte(1)) gain = gain.add(1)
if(player.m.points.gte(2)) gain = gain.times(4)
if(hasUpgrade('P',31))gain = gain.times(new Decimal(2).add(buyableEffect('P',11).times(5)).pow(player.m.points))
else if(player.m.points.gte(3)) gain = gain.times(new Decimal(2).pow(player.m.points))
if(player.m.points.gte(4)) gain = gain.times(tmp.m.milestone4Effect)
if(player.m.points.gte(10)) gain = gain.times(new Decimal(1).add(player.P.upgrades.length))
if(hasUpgrade('P',11)) gain = gain.times(upgradeEffect('P',11))
if(hasUpgrade('P',12)) gain = gain.times(upgradeEffect('P',12))
if(hasUpgrade('sp',11)) gain = gain.times(upgradeEffect('sp',11))
if(hasUpgrade('sp',12)) gain = gain.times(upgradeEffect('sp',12))
	return gain
}


// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){
		 if(player.ach.uni.gte(3)) return "You are in milestone universe"
    else if(player.ach.uni.gte(2)) return "You are in timewall universe"
	else if(player.ach.uni.gte(1)) return "You are in challenge universe"
	else return "You are in normal universe"
	}
]

// Determines when the game "ends"
function isEndgame() {
return player.m.points.gte(50)}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
	if(!player.ach.uni.gte(3)){
		player.m.points=new Decimal(0)
		player.m.milestone=[]
		player.P.points=new Decimal(0)
		player.P.upgrades=[]

	}

}