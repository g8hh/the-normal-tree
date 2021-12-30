let modInfo = {
	name: "普通树 - The Number Tree",
	id: "factor",
	author: "3^3=7",
	pointsName:"points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "4.0",
	name: "XXX",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v4.0</h3><br>
- Added 3 milestone.<br>
- Added 1 layer.<br>
<h3>v3.55</h3><br>
- Added 5 milestone.<br>
- Added 1 upgrade.<br>
- Endgame: 55 milestones.<br>
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
- Added shapes.<br>
- Added 4 S milestone.<br>
- Endgame: 4 shapes.<br>
<h3>v0.3 Pre 1</h3><br>
- Added 1 E buyable.<br>
- Added 3 E challenge.<br>
- Added 3 E Milestone.<br>
- Endgame: 1.8e308 Infinity. (Maybe you can get much more or much less.)<br>
<h3>v0.2.6.4</h3><br>
- Added 1 E Milestone.<br>
- Added 3 UF upgrade.<br>
- Added 1 E buyable.<br>
- Endgame: 1e575 EP.<br>
<h3>v0.2.6.3</h3><br>
- Added 2 UF upgrade.<br>
- Added 5 MS upgrade.<br>
- Endgame: 1e284 EP.<br>
<h3>v0.2.6.2</h3><br>
- Added 1 O Milestone.<br>
- Added 2 MS Milestone.<br>
- Added 1 E Milestone.<br>
- Endgame: e1.5e38 Number.<br>
<h3>v0.2.6.1</h3><br>
- Added 1 UF upgrade.<br>
- Added 1 UF Challenge.<br>
- Added 1 O Milestone.<br>
- Marged v2.6.5.1 of TMT.<br>
- Endgame: 1e160 EP per second.<br>
<h3>v0.2.6</h3><br>
- Added 2 UF upgrade.<br>
- Added 1 O Challenge.<br>
- Added 1 MS milestone.<br>
- Endgame: ee24 IP.<br>
<h3>v0.2.5.4</h3><br>
- Added 5 MS upgrade.<br>
- Added 3 MS milestone.<br>
- Added 1 E milestone.<br>
- Added 1 MS clickable.<br>
- Endgame: e2e28 Numbers.<br>
<h3>v0.2.5.3</h3><br>
- Added 1 M milestone.<br>
- Added 1 E milestone.<br>
- Added 1 UF upgrade.<br>
- Added 2 MS upgrade.<br>
- Endgame: 8 MS.<br>
<h3>v0.2.5.2</h3><br>
- Added 1 M milestone.<br>
- Added 1 O milestone.<br>
- Added 1 UF upgrade.<br>
- Added 2 UF buyable.<br>
- Added 3 E milestone.<br>
- Added Guide in L layer.<br>
- Endgame: 7 MS.<br>
<h3>v0.2.5.1</h3><br>
- Added 1 M milestone.<br>
- Added 4 E milestone.<br>
- Added 1 M challenge.<br>
- Endgame: 6 MS.<br>
<h3>v0.2.5</h3><br>
- Added Ordinal and Mathematician.<br>
- Added 5 O milestone.<br>
- Added 1 M milestone.<br>
- Added 3 UF upgrade.<br>
- Endgame: e1.5e22 Number and 2 Mathematician.<br>
<h3>v0.2.4.3</h3><br>
- Added 1 UF milestone.<br>
- Added 2 EP milestone.<br>
- Endgame: 1e15 EP.<br>
<h3>v0.2.4.2</h3><br>
- Added 4 UF milestone.<br>
- Added 1 EP milestone.<br>
- Added 1 MS milestone.<br>
- Endgame: 5 MS.<br>
<h3>v0.2.4.1</h3><br>
- Added 2 UF upgrade.<br>
- Added 2 EP milestone.<br>
- Added 1 UF buyable.<br>
- Added 1 UF milestone.<br>
- Marged v2.6.5 of TMT.<br>
- Endgame: 2e7 EP and get the last Milestone in UF layer.<br>
<h3>v0.2.4</h3><br>
- Added 3 EP milestone.<br>
- Added 1 EP clickables.<br>
- Added 5 EP upgrades.<br>
- Endgame: 1e6 EP and 14 Challenge points.<br>
<h3>v0.2.3.4</h3><br>
- Added 3 EP milestone.<br>
- Added 1 EP clickables.<br>
- Added 1 NN challenge.<br>
- Added 1 UF upgrade.<br>
- Endgame: Get '+' upgrade in UF layer.<br>
<h3>v0.2.3.3</h3><br>
- Added 1 EP challenge.<br>
- Added 2 EP milestone.<br>
- Added 4 EP clickables.<br>
- Endgame: 600 EP and 2 Challenge points.<br>
<h3>v0.2.3.2</h3><br>
- Added Eternity points.<br>
- Added 5 EP milestone.<br>
- Added 1 EP challenge (placeholder).<br>
- Endgame: 20 EP.<br>
<h3>v0.2.3.1</h3><br>
- Added 5 UF upgrades.<br>
- Endgame: Complete Boost of nerf 4.<br>
<h3>v0.2.3</h3><br>
- Added 7 UF upgrades.<br>
<h3>v0.2.2.2</h3><br>
- Added 2 MS milestone.<br>
- Added 1 IP milestones.<br>
- Added 1 IP upgrade.<br>
- Added 1 NN challenge.<br>
- Added 3 UF upgrades.<br>
- Endgame: 4e11 factor and Get 3 UF Upgrade.<br>
- Added 1 easter egg. If anyone find easter egg in next 1 day add their name in The tree (Send the easter egg screenshot to me (USE DM)
If you complete the game. I will give a big hint
* Not IP Upgrade (They are people that find the easter egg)<br>
<h3>v0.2.2.1</h3><br>
- Added 1 NN challenge.<br>
- Added 2 IP upgrade.<br>
- Added 1 I challenge.<br>
- Endgame: 1e777777 IP.<br>
<h3>v0.2.2</h3><br>
- Added 3 NN challenges.<br>
- Added 1 easter egg. If anyone find easter egg in next 2 days add their name in The tree (Send the easter egg screenshot to me (USE DM)
If you complete the game. I will give a big hint
* Not IP Upgrade (They are people that find the easter egg)<br>
- Endgame: 1e82500 IP.<br>
<h3>v0.2.1.2</h3><br>
- Added 5 MS upgrade.<br>
- Added 2 MS milestone.<br>
- Endgame: 4 MS.<br>
<h3>v0.2.1.1</h3><br>
- Added Exponentiation (a thing in MS).<br>
- Added 1 IP milestone.<br>
- Added 5 MS upgrade.<br>
- Added 1 I challenge.<br>
- Endgame: 1e19000 IP and 10000 x.<br>
<h3>v0.2.1</h3><br>
- Added 2 I Challenge.<br>
- Added 5 IP Upgrade.<br>
- Endgame: 3 MS.<br>
<h3>v0.2.0.1</h3><br>
- Added 1 I Challenge.<br>
- Added 1 F Upgrade.<br>
- Added 1 IP Upgrade.<br>
- Endgame: 2 MS.<br>
<h3>v0.2</h3><br>
- Added Mathematics Symbol.<br>
- Added 1 I challenge<br>
- Added 1 MS upgrade<br>
- Endgame: 1 MS and 1e1800 IP.<br>
<h3>v0.1.9.1</h3><br>
- Added 2 IP Challenge.<br>
- Added 6 F Upgrade.<br>
- Added 1 easter egg. If anyone find easter egg in next 2 days add their name in The tree (Send the easter egg screenshot to me (USE DM)
If you complete the game. I will give a big hint
* Not IP Upgrade (They are people that find the easter egg)<br>
- Endgame: 1e100 Infinity point. <br>
<h3>v0.1.9</h3><br>
- Added 6 IP upgrades.<br>
- Added 3 IP challenge.<br>
- Added 2 IP clickable that reset challenge.<br>
- Endgame: Get IP upgrade 33.<br>
<h3>v0.1.8.1</h3><br>
- Added a hardcap for x.<br>
- Added 2 achievements.<br>
- Added 1 easter egg. (If anyone find this in next 24 hour add their name in The tree)<br>
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
- Added 1 FS mil<h3>e</h3>stone.<br>
- <h3>A</h3>dded 1 NN upgrade.<br>
- Added 5 F upgrade<h3>s</h3>.<br>
- Added 1 N upgra<h3>t</h3>e.<br>
- <h3>E</h3>ndgame: 9.6e10 Facto<h3>r</h3>.<br>
- You only find egg, no easter.<br>
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
<h3>v0.0.1 - 0.1.b</h3><br>
- Added 4 layer and achievements.<br>
- Added 1 upgrade Factors Challenge.<br>
- Added 5 Upgrade factor Milestone.<br>
- Added 10 Factors Upgrade.<br>
- Added 12 Factors Challenge.<br>
- Added 17 Factors Milestone.<br>
- Added 4 Numbers Buyable.<br>
- Added 15 Numbers Upgrade.`



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
if(player.ach.uni.gte(3)&&!player.ach.uni.gte(4)){
if(player.ach.uni.gte(3)&&!player.ach.uni.gte(4)) gain = new Decimal(0)
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
if(player.m.points.gte(56)) gain = gain.pow(player.m.points)
if(player.m.points.gte(200)) gain = gain.pow(player.m.points.pow(player.m.points))
}
if(hasUpgrade("h",11))  gain = gain.times(upgradeEffect('h',11))
if(hasUpgrade("h",14))  gain = gain.times(5)
if(hasUpgrade("h",15))  gain = gain.times(upgradeEffect('h',15))
if(hasUpgrade("h",25))  gain = gain.times(player.h.upgrades.length)
	return gain
}
function getPointGenExp(){
	let exp = new Decimal(1)
	if (hasUpgrade("MS", 33)) exp = exp.times(3)
	if (hasUpgrade("MS", 32)) exp = exp.times(3)
	if (hasUpgrade("MS", 31)) exp = exp.times(2)
	if(hasUpgrade('UF',11)) exp = exp.times(4)
	if(hasChallenge('UF',101)&&player.X.points.gte(1)) exp = exp.times(1.14)
	if(hasUpgrade('UF',25)) exp = exp.times(upgradeEffect('UF',25))
	if(hasMilestone('E',1e287)) exp = exp.times(upgradeEffect('UF',24))
	if(inChallenge('E',11)) exp = exp.times(player.E.Ppower)
	if(hasUpgrade('E',15 )) exp = exp.times(2)
	if(hasUpgrade('UF',35)) exp = exp.times(tmp.O.effect)
	if(hasChallenge('E',31)) exp = exp.times(tmp.O.effect)
	if(hasUpgrade('UF',11)&&challengeCompletions('UF',21)>=1) exp = exp.times(10)
	if(hasMilestone('O',103)) exp = exp.times(player.N.points.add(1).log(10).add(1).log(10).add(1).log(10).add(1).pow(1.05))
	if(hasUpgrade('MS',55)) exp = exp.times(player.MS.xb.add(1).log(10).add(1).pow(0.5))
	if(hasUpgrade('UF',43))exp = exp.times(player.IP.points.add(1).log(10).add(1).log(10).add(1).times(player.M.points.add(1)).times(player.F.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.points.add(1).pow(0.5)).times(buyableEffect('E',11)))
	else if(hasUpgrade('UF',42)) exp = exp.times(player.IP.points.add(1).log(10).add(1).log(10).add(1).times(player.M.points.add(1)).times(player.F.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.points.add(1).pow(0.5)).add(10).log(10))
if(inChallenge('UF',101)) exp = exp.times(0.25)
	return exp
}


// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){
	if(player.ach.uni.gte(4)) return "You are in hardcap universe"
	else if(player.ach.uni.gte(3)) return "You are in milestone universe"
    else if(player.ach.uni.gte(2)) return "You are in timewall universe"
	else if(player.ach.uni.gte(1)) return "You are in challenge universe"
	else return "You are in normal universe"
	}
]

// Determines when the game "ends"
function isEndgame() {
return hasUpgrade("he",11)}



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