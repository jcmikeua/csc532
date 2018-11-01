'use strict';

var Alexa = require('alexa-sdk');


var handlers = {

  // Open Nutrition Assistant 
  'LaunchRequest': function() {
    this.attributes.foodEaten = {
     'foodItem': {
        'name': [],
        'quantity': []
     }
    }
    this.response
        .speak('Welcome to Nutrition Assistant. Did you eat anything today?')
        .listen('Did you eat anything today?');
    this.emit(':responseReady');
  },
  
 'RecordAFood': function() {
   
    var foodItemName = this.attributes.foodEaten.foodItem.name;
    foodItemName.push(this.event.request.intent.slots.foods.value);
    var quantityEatenInput = this.attributes.foodEaten.foodItem.quantity;
    quantityEatenInput.push(this.event.request.intent.slots.quantities.value);
    
    var itemName = this.attributes.foodEaten.foodItem.name;
    var quantityEaten = this.attributes.foodEaten.foodItem.quantity;
    
    this.response
        .speak('Ok, you said you ate '+ quantityEaten + ' ' + itemName + ' . I will record that. Did you eat anything else?')
        .listen('Did you eat anything else?'); 
    this.emit(':responseReady');
  },
  

  // Stop
  'AMAZON.StopIntent': function() {
    this.response.speak('Ok, let\'s play again soon.');
    this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
    this.response.speak('Ok, let\'s play again soon.');
    this.emit(':responseReady');
  },

  // Save state
  'SessionEndedRequest': function() {
    console.log('session ended!');
    this.emit(':saveState', true);
  }

};


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context, callback);
  alexa.dynamoDBTableName = 'nutritionAssistant';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

