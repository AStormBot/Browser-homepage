const headerNames = {
	"normal": {
		"morning": [
			"Wake the fuck up, {username}, sunshine doesn’t wait for lazy asses.",
			"{username}, you're not a damn alarm clock—get up and own this bitch of a day.",
			"Rise and grind, sexy beast. Your chaos is overdue.",
			"Stretch like a champ, or roll back into bed and dream of getting laid.",
			"Coffee’s calling, and it wants your hot mess energy, {username}.",
			"Put on your badass face and slap the morning awake.",
			"You’re the sunrise with attitude, {username}.",
			"The day’s got shit coming, but you’re coming harder.",
			"Be the reason this day regrets messing with you, {username}.",
			"If the world’s on fire, you better look hot while walking through it."
		],
		"afternoon": [
			"Afternoon slump? Shove it. You’re a damn machine, {username}.",
			"Break time? Only if you’re breaking necks with that energy.",
			"{username}, your middle finger deserves a rest. Or maybe a coffee.",
			"Fuck the routine—shake things up and dominate this bitch of a day.",
			"You got this, {username}. Now throw your sass at the next task.",
			"Run this shit like it owes you rent.",
			"Sexy and productive—how the hell do you do it, {username}?",
			"Even the sun’s jealous of your afternoon glow.",
			"You're like a damn hurricane in a pencil skirt—or no skirt."
		],
		"evening": [
			"Evening's here, {username}. Drop the stress and pick up the sex appeal.",
			"Wrap up your shit and slide into chill mode like a boss.",
			"Dinner, drinks, or domination—you choose, {username}.",
			"Today’s done. Now light a candle, or light someone up.",
			"That ass deserves a sofa, a drink, and no responsibility.",
			"You’re still hot after all this bullshit—damn, {username}.",
			"Take a breath. Or take someone’s breath."
		],
		"night": [
			"Another night, {username}, and you're still not in bed? Go fuckin' sleep already.",
			"You're sexy even in silence, {username}. The night gets hard without you.",
			"Rest, {username}. Tomorrow you’ll crush it like a goddamn beast.",
			"The stars ain't the only thing burning tonight, {username}—your ass is on fire.",
			"Sweet dreams, badass. Try not to fuckin' dream in HTML again.",
			"{username}, the bed's not just for sleep. Use it. Or imagine it.",
			"The moon’s up. The world’s quiet. Your mind? A damn battlefield.",
			"Go to sleep, {username}. You’ve already fucked the day enough.",
			"No more screens. Just close your eyes and let that chaos shut the fuck off.",
			"The night wants to wrap its dark arms around you, {username}. Let it."
		]
	},
	"student": {
		"morning": [
			"Wake your tired ass up, {username}, pencils won’t suck themselves.",
			"Time to get dragged through hell again. School's waiting, {username}.",
			"You got a test today? Fuck that, walk in like a damn legend.",
			"Throw your hoodie on, fake a smile, and dominate that class.",
			"Books don’t own you, {username}. But today they might try.",
			"Get up and give zero shits, but ace it anyway.",
			"Brush your teeth, but don't brush off that confidence, {username}.",
			"School’s a joke, but you’re the punchline that slaps.",
			"Survive the day and maybe sext during lunch.",
			"Go be that hot nerd with the deadly grades, {username}.",
			"No sleep? Still hotter than anyone in class.",
			"{username}, rise like caffeine-fueled chaos."
		],
		"afternoon": [
			"Homework can fuck off. You're getting laid by knowledge, {username}.",
			"Walk through the hallway like it’s your bitch.",
			"Lunch sucked? The rest of the day can choke on your attitude.",
			"Slap those textbooks with your genius. Or your thick thighs.",
			"You're not learning. You're surviving a warzone. Respect.",
			"You’re the reason the school firewall crashes, {username}.",
			"Grades? Meh. That ass? Certified A+.",
			"You could sleep through this lecture and still be iconic.",
			"Doodle in the margins and still score better than half the class."
		],
		"evening": [
			"School’s over. Time to take off the innocent act, {username}.",
			"Netflix, snacks, and absolutely no thoughts. That’s the plan.",
			"Burn your notes or burn calories. Either works.",
			"You survived the day. Now survive this pile of bullshit assignments.",
			"Sexy and exhausted. A scholar's curse.",
			"Homework? More like hellwork. Light it up, {username}.",
			"Study break or mental breakdown—either way, you’re hot."
		],
		"night": [
			"You did your best today. Now lie down and let the world shut the fuck up.",
			"Grades will wait. Right now, your body needs cuddles or chaos.",
			"Your brain is a battlefield. Rest that beautiful disaster.",
			"Dream about cheating on tests and lovers. Both are fun.",
			"Let the textbooks cry in the corner. You’re done for tonight.",
			"You’re not a machine, {username}. But you’re hot enough to be factory-made.",
			"Wrap yourself in a blanket. Or someone. Your choice.",
			"Fuck the deadlines. It’s sleep o’clock, {username}.",
			"You’re more than that GPA. You’re a goddamn masterpiece with a sleep deficit."
		]
	},
	"boss": {
		"morning": [
			"The boardroom can wait till you finish looking hot as hell, {username}.",
			"Command respect, or just command coffee first.",
			"Another day to dominate—no pants required, {username}.",
			"You run shit, even in bedhead."
		],
		"afternoon": [
			"Meetings? More like motherfucking interruptions.",
			"Crush those targets and flash that power stare, {username}.",
			"CEO of fuck-you energy right here.",
			"You're not just the boss. You're the fantasy HR warns about."
		],
		"evening": [
			"Clock out and vibe. Or clock into something naughty, {username}.",
			"You made the hard calls. Now make the soft landing.",
			"Emails off. Wine on. Legs up.",
			"Running a business ain't as hard as running from rest. Take it."
		],
		"night": [
			"Stop fucking working, {username}. Your desk won't miss you.",
			"You're not a machine. Machines get updates. You get burnout.",
			"Even the CEO of badassery needs a pillow sometimes.",
			"Clock out, boss. Your brain's in goddamn overtime.",
			"You deserve a night of nothing. Maybe some cuddles. Or something dirtier.",
			"Get off the damn Slack and onto your mattress.",
			"Big deals can wait. Your mental health can’t, {username}.",
			"You’re hot when you're focused. You're hotter when you're asleep and not emailing."
		]
	},
	"gamer": {
		"morning": [
			"Wake the fuck up and queue, {username}.",
			"Don’t miss the drop, miss breakfast instead.",
			"You’re a spawn point of destruction.",
			"Wipe the crust off your eyes and wreck noobs.",
			"Joystick or joyride? It’s too early to choose."
		],
		"afternoon": [
			"Another match? Fuck yeah. Who needs real life?",
			"Loot and load, legend.",
			"Caffeine, rage, and your hot self? Lethal trio.",
			"Slay them with bullets or booty. Up to you.",
			"If you’re not top fragging, you’re top teasing."
		],
		"evening": [
			"Tired hands, hot win streak. Worth it.",
			"Victory tastes better with a little moaning.",
			"Trash talk and tight shorts. A combo.",
			"End the day like you end lobbies—in flames and finesse.",
			"Your KD ratio is only rivaled by your sex appeal."
		],
		"night": [
			"Your eyes are bloodshot, your heart’s racing, and you still look sexy as fuck.",
			"It’s 3AM, and you're gaming like it’s foreplay.",
			"Whisper sweet nothings to your headset mic. Or scream like a goddamn legend.",
			"Let the light of your monitor reflect off your sexy exhaustion.",
			"One more match? Nah. One more climax of chaos."
		]
	},
	"programmer": {
		"morning": [
			"Wake the fuck up, {username}, your IDE is dry without your dirty-ass logic.",
			"Coffee, code, and chaos—your morning threesome.",
			"Drag your sexy ass to the desk. Bugs are waiting to be spanked.",
			"Write code like you fuck—precise, filthy, and confident.",
			"Your fingers belong on keys... or someone else's buttons.",
			"Morning logic or morning wood? Both work.",
			"Semicolons trembling from your big brain energy.",
			"You don’t wake up, {username}, you boot up with a fucking roar.",
			"Your syntax slaps harder than reality.",
			"Debug your life while looking like a goddamn snack."
		],
		"afternoon": [
			"Hit those APIs like they owe you orgasmic performance.",
			"Forget lunch—devour these bugs and maybe some ass.",
			"Code hard, commit harder, {username}.",
			"Who needs a framework? You run raw, hot, and full stack.",
			"You’re not just compiling, you’re fucking dominating.",
			"Let that DOM submit to your damn will.",
			"You're a dirty little debugger with a genius streak.",
			"Push your code and push their damn buttons.",
			"Your brain’s a goddamn server and it’s running hot."
		],
		"evening": [
			"Sit back, unzip your hoodie, and seduce some functions.",
			"Code after dark? That’s when the real kinks emerge.",
			"Your console.log isn’t the only thing spitting fire.",
			"Refactor your energy into a fuckin’ masterpiece.",
			"Hard drive? You’re the cause, {username}.",
			"You touch more lines of code than lovers—tragic and hot.",
			"That stack overflow ain’t accidental—it’s your sex appeal.",
			"Leave the bugs gasping. You’re a one-dev wrecking crew."
		],
		"night": [
			"Keyboard beneath your fingers, chaos in your mind, {username}—pure fuckin’ power.",
			"Your IDE is wet and waiting. Don’t leave it hanging.",
			"It’s not insomnia, it’s foreplay with variables.",
			"You write scripts the way others write love letters—with lust.",
			"Fuck sleep. You’ve got a session with temptation and terminal.",
			"You're the reason tabs stay open—and legs too, probably.",
			"Typing late? Nah. You’re teasing the compiler into moaning.",
			"Crash the system, break the rules, fuck the clock.",
			"Your repo is dirty, your mind’s filthier, and that’s hot as hell."
		]
	}

}


