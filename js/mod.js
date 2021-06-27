let modInfo = {
	name: "The Number Tree",
	id: "factor",
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
	num: "0.1.8",
	name: "Infinity and Infinity point.",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.1.8</h3><br>
- Added Infinity point.<br>
- Added 3 IP upgrade.<br>
- Added 1 NN buyable.<br>
- Added 4 IP milestone.<br>
- Added 1 IP challenge.<br>
- Endgame: Complete IP callenge 1.<br>
<h3>v0.1.7.1</h3><br>
- Added 1 NN upgrade.<br>
- Added 1 F Upgrade.<br>
- Added 1 I milestone.<br>
- Endgame: 69 Infinity.<br>
<h3>v0.1.7</h3><br>
- Added 2 F upgrade.<br>
- Added 2 NN upgrade.<br>
- Added 1 I challenge.<br>
- Late game is easier.<br>
- Added 1 N buyable.<br>
- Endgame: 1e177 Negative numbers.<br>
<h3>v0.1.6.1</h3><br>
- Fix a lot of wrongly spelling (Thanks to Ice Bear).<br>
<h3>v0.1.6</h3><br>
- Added 1 FS milestone.<br>
- Added 1 NN upgrade.<br>
- Added 5 F upgrade.<br>
- Added 1 N upgrade.<br>
- Endgame: 9.6e10 Factor.<br>
<h3>v0.1.5</h3><br>
- Early game is easier.<br>
- Added 2 NN Upgrade.<br>
- Added 2 NN milestone.<br>
- Added 1 F buyable.<br>
- Added Factor Shift.<br>
- Endgame: 8 Infinity and 1 Factor Shift<br>
<h3>v0.1.4</h3><br>
- Added 1 N Upgrade.<br>
- Added 2 NN Upgrade.<br>
- Added 1 NN milestone.<br>
- Added 2 I challenge.<br>
- Endgame: 6 Infinity<br>
<h3>v0.1.3</h3><br>
- Added Negative number.<br>
- Added 6 NN Upgrade.<br>
- Added 2 NN milestone.<br>
- Endgame: 1.8e308 points<br>
<h3>v0.1.2.1</h3><br>
- Upgrade, milestone and challenge is easier(harder).<br>
<h3>v0.1.2</h3><br>
- Added 3 N Upgrade.<br>
- Added 1 UF milestone.<br>
- Endgame: 3 Infinity<br>
<h3>v0.1.1.1</h3><br>
- Fix a bug<br>
- Number Upgrade 16, 41, 42, 43, 44 and 45 is cheaper<br>
<h3>v0.1.1</h3><br>
- Added 5 Number Upgrade.<br>
- Added 3 Upgrade factor Milestone.<br>
- Added 1 Factors Milestone.<br>
- Added 2 Factor Buyable.<br>
- Added 1 Upgrade factor Challenge.<br>
- Endgame: 2 Infinity<br>
<h3>v0.1.b</h3><br>
- The game is easier.<br>
<h3>v0.1.a</h3><br>
- Fixed a lot of bug.<br>
- Fixed little grammar errors.<br>
- added achievements.<br>
<h3>v0.1</h3><br>
- Added Infinity.<br>
- Added 1 Upgrade factor Milestone.<br>
- Added 1 Factors Milestone.<br>
- Added 1 Number Buyable.<br>
- Endgame: 1 Infinity<br>
<h3>v0.0.9</h3><br>
- Added 2 Upgrade factor Milestone.<br>
- Added 3 Factors Milestone.<br>
- Added 1 Factors Challenge.<br>
- Added 2 Number Upgrade.<br>
- Added 1 Number Buyable.<br>
- Endgame: 11 Upgrade factor<br>	
<h3>v0.0.8</h3><br>
- Added 1 Upgrade factor Milestone.<br>
- Added 2 Factor Upgrade.<br>
- Added 2 Factors Milestone.<br>
- Added 2 Factors Challenge.<br>
- Endgame: 8 Upgrade factor<br>	
<h3>v0.0.7</h3><br>
- Added 1 Number Upgrade.<br>
- Added 3 Factors Upgrade.<br>
- Added 1 upgrade Factors Challenge.<br>
- Added 2 Factors Challenge.<br>
- Endgame: 6 Upgrade factor<br>	
<h3>v0.0.6</h3><br>
- Added 3 factor Milestone.<br>
- Added 1 Numbers Buyable.<br>
- Added 2 Number Upgrade.<br>
- Added 2 Factors Challenge.<br>
- Endgame: 3 Upgrade factor<br>	
<h3>v0.0.5</h3><br>
- Added 1 Upgrade factor Milestone.<br>
- Added 1 factor Milestone.<br>
- Added 1 Numbers Buyable.<br>
- Added 1 Factors Challenge.<br>
- Added 2 Factors Upgrade.<br>
- Endgame: 2 Upgrade factor<br>	
<h3>v0.0.4</h3><br>
- Added Upgrade factor.<br>
- Added 2 Numbers Upgrade.<br>
- Added 2 Factors Challenge.<br>
- Added 1 Factors Upgrade.<br>
- Endgame: 1 Upgrade factor<br>	
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

	if (hasChallenge('F',31)) gain = gain.times(buyableEffect('N',12))
	if (hasUpgrade('N',44)) gain = gain.times(buyableEffect('F',12))
	if (inChallenge('F', 33)|inChallenge('F',43)) gain = gain.times(0.000001)
	if (inChallenge('F', 31)) gain = gain.times(0.000001)
	if (hasMilestone('UF', 1)) gain = gain.times(2)
	if (hasChallenge('F', 22)) gain = gain.times(2)
	if (hasChallenge('F', 12)) gain = gain.times(3)
	if (inChallenge('F', 11)) gain = gain.times(0.3)
	if (inChallenge('F', 13)) gain = gain.times(0.3)
	if (inChallenge('F', 23)) gain = gain.times(0.3)
	if (hasChallenge('F', 11)) gain = gain.times(3)
	if (hasUpgrade('N', 11)) gain = gain.times(4)
	if (hasAchievement("A", 11)) gain = gain.times(1.25)
	if (hasUpgrade('N', 12)) gain = gain.times(upgradeEffect('N', 12))
	if (hasUpgrade('NN', 12)) gain = gain.times(upgradeEffect('NN', 12))
	if (hasUpgrade('NN', 13)) gain = gain.times(upgradeEffect('NN', 13))
	if (hasUpgrade('N', 13)) gain = gain.times(upgradeEffect('N', 13))
	if (hasMilestone('F', 1)) gain = gain.times(player.F.points.add(1))
	if (hasMilestone('UF', 52)) gain = gain.times(player.UF.points.pow(3).add(1))
	if (hasMilestone('UF', 128)) gain = gain.times(player.UF.points.pow(3).add(1))
	
	if (hasMilestone('F', 1100)) gain = gain.times(player.F.points.add(1))
	if (hasMilestone('UF', 10)) gain = gain.times(10000)
	if (hasMilestone('I', 1)) gain = gain.times(100)
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
	return hasChallenge('IP',11)
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