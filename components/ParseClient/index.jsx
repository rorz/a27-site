import React from 'react';
import Parse from 'parse';

Parse.initialize("6uR4yf7DtE");
Parse.serverURL = 'https://api.sendcoin.io/1'

export default class ParseClient extends React.Component {
  
}

export function newSubsciber(emailAddress, callback) {

    var Subscriber = Parse.Object.extend("Subscriber");
    var newSubsciber = new Subscriber();

    newSubsciber.set('emailAddress', emailAddress);

    newSubsciber.save(null, {
        success: function(gameScore) {
            // Execute any logic that should take place after the object is saved.
            // alert('Registration success! You\'ll hear from us soon.');
            callback('success');
        },
        error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            // alert('Unable to register for the following reason:\n\n' + error.message);
            callback(error.message);
        }
    });

}

export function sendMail(messageObject, callback) {
    Parse.Cloud.run("ecoservicesSendMail", {
        toEmail: messageObject.email,
        name: messageObject.name,
        body: messageObject.message
    }).then(function(result) {
        // make sure the set the enail sent flag on the object
        console.log("result :" + JSON.stringify(result))
    }, function(error) {
        // error
        console.log("error :" + JSON.stringify(error))
    });
}

export function requestMeeting(emailAddress, callback) {

    const data = {
        toEmail: 'rory@johnstoneek.com',
        name: 'MEETING _ REQUEST',
        body: 'MEETING _ REQUEST FROM ' + emailAddress
    }

    Parse.Cloud.run("ecoservicesSendMail", data, {
        success: function(result) {
            // Execute any logic that should take place after the object is saved.
            // alert('Registration success! You\'ll hear from us soon.');
            callback('OK');
            console.log("result :" + JSON.stringify(result))
        },
        error: function(result, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            // alert('Unable to register for the following reason:\n\n' + error.message);
            callback('ERROR');
            console.log("error :" + JSON.stringify(error))
        }
    });
}
