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
	num: "1.1",
	name: "Not end.",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v1.1</h3><br>
- Added challenge point.<br>
- Added 4 upgrade.<br>
- Added 4 buyable.<br>
- Added 5 clickable.<br>
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
if(hasUpgrade('p',11)) gain=gain.times(upgradeEffect('p',11))
if(hasUpgrade('p',12)) gain=gain.pow(upgradeEffect('p',12))
if(hasUpgrade('p',21)) gain=gain.times(upgradeEffect('p',21))
if(hasUpgrade('p',22)) gain=gain.pow(upgradeEffect('p',22))
if(hasUpgrade('p',31)) gain=gain.times(upgradeEffect('p',31))
if(hasUpgrade('p',14)) gain=gain.times(1e10)
if(hasUpgrade('p',41)) gain=gain.times(upgradeEffect('p',32))     
if(hasUpgrade('a',11)) gain=gain.times(upgradeEffect('a',11))    
if(hasMilestone('c',0))     gain=gain.times(100)
if(hasUpgrade('cp',11)) gain=gain.times(upgradeEffect('cp',11))   
if(hasUpgrade('cp',14))gain=gain.times(player.cp.bank1.add(1).log(2).add(1).pow(2))   
else if(hasUpgrade('cp',12))gain=gain.times(player.cp.bank1.add(1).log(10).add(1).pow(2))   
 
if(hasUpgrade('cp',13))gain=gain.times(buyableEffect('cp',11))   
	return gain
}


// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	
]

// Determines when the game "ends"
function isEndgame() {
	return player.cp.points.gte(new Decimal(8))
}



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
}