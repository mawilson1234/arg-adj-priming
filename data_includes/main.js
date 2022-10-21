PennController.ResetPrefix(null) // Shorten command names (keep this line here)
// DebugOff()

SetCounter("setcounter")

var counterOverride = 3;

Sequence(
	"setcounter",
	"intro",
	"consent",
	"recording",
	// "microphonecheck",
	"instruction",
	randomize("trial_prac"),
	"warn",
	"instruction2",
	rshuffle(
		"trial",
		"filler"
	),
	"feedback", 
	SendResults(),
	"bye"
)

newTrial("intro",
	newText(
		"Welcome",
		"<p>Welcome! To participate in this experiment, you must meet the following requirements.<ol>" + 
		"<li>Your computer must have a microphone (built-in microphone is fine).</li>" + 
		"<li>Your brower must be either Chrome or Firefox. You CANNOT use Safari for this experiment.</li>" + 
		"<li>You must turn off music/video (e.g., YouTube) played in the same computer you are using to take this experiment.</li>" + 
		"<li>Please note that you will be asked to speak aloud during the experiment (read aloud words and recite memorized sentences). " + 
		"Your speech will be recorded and that's our critical data.</li></ol>" +
		"If you meet these requirements, please enter your native language and prolific ID below and click Next:"
	)
		.print()
	,

	newTextInput("Language", 'Your native language: ')
		.print()
		.log()
	,

	newTextInput("ProlificID", 'Your prolific ID: ')
		.print()
		.log()
	,
	
	newButton("Next")
		.print()
		.wait()  	
)

newTrial("consent",
	newText(
		"<p> Please click <a target='_blank' rel='noopener noreferrer' href='https://shotam.github.io/IRB/consent_online_recording.pdf'>here</a> " +
		"to download the consent form for this study. If you read and agree to participate in this study, press I Agree below. If you do not agree " +
		"to participate in this study, you can leave this study by closing the tab.</p>"
	)
		.print()
	,
	
	newButton("I Agree")
		.print()
		.wait()
)

newTrial("warn",
	newText(
		"Practice done!<p>" +
		"<b>Please note: some participants reported that the script froze in the middle " +
		"of the experiment. If this happens to you, please don't panic, and let us know via the message function " +
		"in Prolific. We will make sure that you will be compensated for the time you spent for the experiment.</b>"
	)
		.print()
	,
	
	newButton("Next")
		.print()
		.wait()
)

// InitiateRecorder(
// 	"https://umassgaplab.net/experiment/PCIbex_server.php", 
// 	"This experiment collects audio recordings. <strong>Once " +
// 	"you grant it access to your recording device, you will be " +
// 	"notified of whether you are being recorded by a label at the top of the page.</strong>"
// ).label("recording")

newTrial("microphonecheck",
	newText(
		"mic","First, we need to make sure that your microphone is working properly. Press the 'Record' " +
		"button below and say something. You should see a red squire saying 'Recording...' on the top of your " +
		"screen. Once you press 'Stop' button, you should hear the playback of your recording. You can also " +
		"re-play your recording by pressing the play button. Make sure that you turn on your audio to be able " +
		"to hear your recording. After this procedure you should see a 'Next' botton at the bottom of this page " +
		"(scroll down if you don't see the 'Next' botton.)."
	)
		.print()
	,
	
	// newMediaRecorder("recorder", "audio")
	// 	.once()
	// 	.print()
	// 	.center()
	// 	.wait()
	// 	.play()
	// 	.wait("playback")
	// ,
	
	newButton("Next")
		.print()
		.wait()
)

newTrial("instruction",
	newText(
		"Please read this instruction carefully! If you fail to understand the task, your data will NOT be usable.<p>" +
		"In each trial in this experiment, you will see two sentences one at a time. Your task is to <b>read aloud and " +
		"memorize the two sentences for later recall. You are given 5 seconds to read aloud and memorize each sentence.</b><p>" +
		"After you read and memorize two sentences, you will be prompted to recall one of them. The prompt will be 2&ndash;3 " +
		"words that appeared in one of the two sentences. For example, if you memorize 'The boy went to the store' and 'The dog " +
		"chased the cat', you may see 'boy went' as the prompt to recall the sentence 'the boy went to the store.' Please recite " +
		"the sentence that included the prompt words <b>aloud</b>.<p>" +
		"<b>TIP: Many people find it helpful to try to visualize " +
		"the situations described by sentences when you memorize them. Also, we understand this is not an easy task. So no need to " + 
		"be concerned if you are not perfect.</b>"
	)
		.print()
	,

	newButton("Click here to begin practice trials!")
		.print()
		.wait()
)

newTrial("instruction2",
	newText(
		"<p>Now, you are ready to start the experiment! Remember, your task is to:<ol>" +
		"<li>Read and memorize two sentences.</li>" +
		"<li>Recall one of the memorized sentences that contains the words presented to you. Please make sure to use all the " +
		"words presented in red font when you recall.</li></ol>"
	)
		.print()
	,

	newButton("Click here to begin the experiment.")
		.print()
		.wait()
)

var trial = label => variable => {
	var group = label === 'filler' ? 'filler' : variable.group
	var target_condition = label === 'filler' ? 'filler' : variable.target_condition
	var prime_condition = label === 'filler' ? 'filler' : variable.prime_condition
	
	return newTrial(label,
		newText("ready", "Press space when ready")
			.center()
			.print()
		,
		
		newKey("next", " ")
			.wait()
		,
		
		getText("ready")
			.remove()
		,
		
		// newMediaRecorder(variable.Item_ID, "audio")
		// 	.record()
		// ,
		
		newText("memorize1", "Read aloud & memorize (Please do not skip words!)")
			.center()
			.print()
		,
		
		newText("target", variable.target)
			.center()
			.print()
		,
		
		newTimer('t1', 5000)
			.start()
			.wait()
		,
		
		getText("memorize1")
			.remove()
		,
		
		getText("target")
			.remove()
		,
		
		newTimer('t2', 2000)
			.start()
			.wait()
		,   
		
		newText("memorize2", "Read aloud & memorize (Please do not skip words!)")
			.center()
			.print()
		,

		newText("prime", variable.prime)
			.center()
			.print()
		,
		
		newTimer('t3', 5000)
			.start()
			.wait()
		,
		
		getText("memorize2")
			.remove()
		,
		
		getText("prime")
			.remove()
		,
		
		newTimer('t4', 2000)
			.start()
			.wait()
		,
		
		newText("RPrompt", "Recall the whole sentence that included the following words (in red font):")
			.center()
			.print()
			
		,

		newCanvas("shape", 400, 400)
			.center()
			.add("center at 50%", "middle at 33%", newText(variable.cue0).color("red"))
			.add("center at 25%", "middle at 66%", newText(variable.cue1).color("red"))
			.add("center at 75%", "middle at 66%", newText(variable.cue2).color("red"))
			.print()
		,
		
		newText("whitespace", " ")
			.center()
			.print()
		,
		
		newText("RPrompt2", "Even if you can't remember the sentence, try to say a grammatical sentence using all the words above.")
			.center()
			.print()
		,
		
		newText("done", "Press space when complete.")
			.center()
			.print()
		,
		
		newTimer('t5', 1000)
			.start()
			.wait()
		,
		
		newKey("next2", " ")
			.wait()
		,
		
		newTimer('t6;', 1000)
			.start()
			.wait()
		,
		
		// getMediaRecorder(variable.Item_ID)
		// 	.stop()
	)
	.log('group',				group)
	.log('item',				variable.item)
	.log('condition',			variable.condition)
	.log('target_condition', 	target_condition)
	.log('target_verb',			variable.target_verb)
	.log('target',				variable.target)
	.log('prime_condition',		prime_condition)
	.log('prime_verb',			variable.prime_verb)
	.log('prime',				variable.prime)
	.log('cue0',				variable.cue0)
	.log('cue1',				variable.cue1)
	.log('cue2',				variable.cue2)
}

Template('practice.csv', trial('trial_prac'))
Template('stimuli.csv', trial('trial'))
Template('fillers.csv', trial('filler'))

newTrial("bye" ,
	newText(
		"Thank you for your participation! Please go to the following link to verify your participation: "+
		"<a href='https://app.prolific.co/submissions/complete?cc=2C35D14F'>https://app.prolific.co/submissions/complete?cc=2C35D14F</a>"
	)
		.print()
	,
	
	newButton()
		.wait()
)
.setOption("countsForProgressBar" , false)