// script.js

// Get the necessary elements
const noteTextarea = document.getElementById('note-textarea');
const startRecordBtn = document.getElementById('start-record-btn');
const recordingInstructions = document.getElementById('recording-instructions');

// Check if the browser supports Web Speech API
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();

  // Set the recognition language to the default language of the browser
  recognition.lang = window.navigator.language;

  // Handle recognition results
  recognition.onresult = function(event) {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;
    noteTextarea.value += transcript;
  };

  // Handle recognition errors
  recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
  };

  // Handle recognition end
  recognition.onend = function() {
    recordingInstructions.textContent = 'Press the Start Speech button and allow access.';
    startRecordBtn.disabled = false;
    
  };

  // Start recognition on button click
  startRecordBtn.addEventListener('click', function() {
  if (window.webkitSpeechRecognition && window.webkitSpeechRecognition !== undefined) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = window.navigator.language;
    recognition.start();

    recognition.onstart = function() {
      recordingInstructions.textContent = 'Speak now.';
    };

    recognition.onresult = function(event) {
      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript;
      noteTextarea.value += transcript;
    };

    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function() {
      recordingInstructions.textContent = 'Press the Start Speech button and allow access.';
      startRecordBtn.disabled = false;
      
    };
  } else {
    console.error('Web Speech API is not supported in this browser.');
  }
});
} else {
  console.error('Web Speech API is not supported in this browser.');
}
