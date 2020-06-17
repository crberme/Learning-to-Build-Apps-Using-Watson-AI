'use strict';

var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const { IamAuthenticator } = require('ibm-watson/auth');

// SPECIFY THE API KEY AND URL FOR THE NLU SERVICE INSTANCE
var nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({
    apikey: '{apikey}'
  }),
  version: '2019-07-12',
  url: '{url}'
});

var string_2_analyze = 'Broadcom Ltd. plans to raise its bid for Qualcomm Inc. to around $120 billion, according to a person with knowledge of the matter, trying to force its target to come to the table in what would be the largest-ever technology deal. The chipmaker is considering lifting its offer to about $80 to $82 per Qualcomm share, the person said, asking not to be identified because the information is private. Qualcomm Chief Executive Officer Steve Mollenkopf had dismissed Broadcom’s earlier proposal of $70 per share as not being worth consideration. Broadcom plans to announce the new bid Monday morning U.S. time, the person said. Broadcom Chief Executive Officer Hock Tan is putting pressure back on Mollenkopf and his board, who have so far refused to negotiate. By sweetening the offer, he’s also improving prospects for his nominations to Qualcomm’s board in a shareholder vote next month. A victory in that effort would void the current opposition.';

// SET THE OPTIONS FOR NLU
var options = {
  html: string_2_analyze,
  features: {
    entities: {},
    keywords: {},
    sentiment: {}
  }
};

//INVOKE NLU AND PRINT THE RESULTS
nlu.analyze(options, function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(res, null, 2));
});
