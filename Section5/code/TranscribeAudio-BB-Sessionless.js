// Following code based on the Watson Developer Cloud Node SDK Examples

// If you have not installed Watson Node SDK, install is using following command
// npm install watson-developer-cloud

'use strict';
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
var CombinedStream = require('combined-stream');

var speechToText = new SpeechToTextV1({
  username: '<YOUR WATSON STT USERNAME>' //'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: '<YOUR WATSON STT PASSWORD>' //'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
});

/*
    This code will print the entire response to the console when it
    receives the 'data' event. Some applications will want to write
    out only the transcribed text, to the console or to a file.
    To do this, remove `objectMode: true` from the `params` object.
    Then, uncomment the block of code at Line 30.
*/

var combinedStream = CombinedStream.create();
combinedStream.append(fs.createReadStream('../data/QuarterlyReport.wav'));

var recognizeParams = {
  audio: combinedStream,
  content_type: 'audio/wav',
  objectMode: true,
  model: 'en-US_BroadbandModel',
  //model: 'en-US_NarrowbandModel',
  word_confidence: true,
  timestamps: true,
  keywords: ['SEC', '10K', 'ten K'],
  'keywords_threshold': 0.5,
  profanity_filter: true,
  smart_formatting: true,
  speaker_labels: true
  //'max_alternatives': 3
};

speechToText.recognize(recognizeParams, function(error, speechRecognitionResults) {
  if (error) {
    console.log(error);
  } else {
    // pipe out the transcription to a file
    fs.writeFile('QuarterlyReportWav-Node-Sessionless.json', JSON.stringify(speechRecognitionResults, null, 2), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("Transcription results were saved in a file!");
    });
  }
});
