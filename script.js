// Get the speech recognition object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Request permission to use the microphone
if (navigator.permissions) {
  navigator.permissions.query({name: 'microphone'}).then(permissionObj => {
    if (permissionObj.state === 'granted') {
      console.log('Microphone permission granted');
    } else if (permissionObj.state === 'prompt') {
      console.log('Microphone permission prompt');
    } else {
      console.log('Microphone permission denied');
    }
  }).catch(error => {
    console.log('Error while requesting microphone permission: ' + error);
  });
}

// Set up the speech recognition settings
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

// Start the speech recognition process when the "Start Speech" button is clicked
$('#start-record-btn').click(function() {
  recognition.start();
});

// Stop the speech recognition process when the "Stop Speech" button is clicked
$('#pause-record-btn').click(function() {
  recognition.stop();
});

// Handle the recognition result
recognition.onresult = function(event) {
  let interimTranscript = '';
  let finalTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  $('#note-textarea').val(finalTranscript);
};

// Handle errors
recognition.onerror = function(event) {
  console.log('Speech recognition error: ' + event.error);
};
