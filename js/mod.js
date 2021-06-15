let modInfo = {
	name: "The Number Tree",
	id: "mymod",
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
	num: "0.0.4",
	name: "Fourth",
}

let changelog = `<h1>Changelog:</h1><br>

<h3>v0.0.4</h3><br>
- Added 2 Numbers Upgrade.<br>
- Added 2 Factors Challenge.<br>
- Added 1 Factors Upgrade.<br>
- Endgame: Complete Factor challenge 5<br>	
<h3>v0.0.3</h3><br>
- Added 1 Numbers Upgrade.<br>
- Added 2 Factors Milestone.<br>
- Added 1 Factors Challenge.<br>
- Added 1 Factors Upgrade.<br>
- Endgame: 15 factors.<br>		
<h3>v0.0.2</h3><br>
- Added 1 Numbers Upgrade.<br>
- Added 3 Factors Milestone.<br>
- Added 1 Factors Challenge.<br>
- Added 1 Factors Upgrade.<br>
- Endgame: 8 factors.<br>

<h3>v0.0.1</h3><br>
- Added 6 Numbers Upgrade.<br>
- Added 2 Factors Milestone.<br>
- Added 1 Factors Challenge.<br>
- Endgame: 4 factors.`


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
	if (hasChallenge('F', 12)) gain = gain.times(3)
	if (inChallenge('F', 11)) gain = gain.times(0.2)
	if (inChallenge('F', 13)) gain = gain.times(0.2)
	if (hasChallenge('F', 11)) gain = gain.times(3)
	if (hasUpgrade('N', 11)) gain = gain.times(3)
	if (hasUpgrade('N', 12)) gain = gain.times(upgradeEffect('N', 12))
	if (hasUpgrade('N', 13)) gain = gain.times(upgradeEffect('N', 13))
	if (hasMilestone('F', 1)) gain = gain.times(player.F.points.add(1))
	if (hasUpgrade('F',11)) gain = gain.times(upgradeEffect('F', 11))


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
	return hasChallenge('F',22)
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