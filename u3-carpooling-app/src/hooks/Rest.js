import React, {useState} from "react";
import {View, Text, Button} from "react-native";

export default function RestPage () {
       
        // Simply change the body, with the appropriate key-val pairs 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            // adapt this body for purposes

            // body: JSON.stringify({"operation" : "select", "table" : "User", "email" : "william@bath.ac.uk"})
            
        };
        
        fetch("http://u3pool.ddns.net:3333/api", requestOptions)
        .then((response) => {
            if (response.status === 200) {
                console.log("success");

                //logs the response to console
                response.text().then((text) => {
                    console.log("text: " + text);
                })
                
                //returns the stringified response from server
                return response.text();
            } else {
                
                // if there is an error eg it will log it here
                response.text().then((text) => {
                    console.log("error msg: " + text);    
                })
                
                // rather than throw an error for this, its better to just return false to show the page
                // hey the query didnt go through, handle it now or display to user or whatever

                // for the moment returns false, so you can handle for error by just ensuring it isnt a false value.
                return false;
            }
        })
        .catch((error) => {
            
            // if it cant connect to the db it will return this error msg.
            console.log("connection error has taken place");
            // console.error(error);
            return Error("Could not connect to db at the moment");

        });
}


// function foo (arg_dict) {
    

//     // idea is I want you to call this function and pass in your parameters in dict form
//     // so you will say:
//     // {"operation" : "...", "table": "...", and so on until you have finished all args }

//     // this will be stored in a list I believe, so i will take it out of the list, and apply it in the body below

    
//     // Simple POST request with a JSON body using fetch
    
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },

//         // replace teststring with :
//         // '{"operation" : "insert", "table" : "User", "name" : "James", "email" : "jd123@bath.ac.uk"}'

//         // if sending to vehicle db for look up
//         // '{"operation" : "vehiclelookup", "registrationNumber" : "XX00 XXX"}'

//         body: JSON.stringify({ teststring: 'test string!' })
//     };

//     fetch("http://u3pool.ddns.net:3333/api/debug", requestOptions)
//     .then((response) => {
//         if (response.status === 200) {
//             console.log("success");

//             //un jsonify it via response.json (atm server returns as a string, usually will be JSON) to turn into 
//             return response.text();
//         } else {
//             throw new Error('Something went wrong on API server!');
//         }
//     })

//     // in this way I believe we can cut out this .then, this func should just return the js object. and then 
//     // we process it differently depending on how we want to deal with it (depends on context)
    
//     .then((response) => {
//         // essentially define some variables for the response that should be returned
//         // save to these variables, eg response.body.(attribute)

//         // note may need to turn into a json obj by using json.parse(response) first, not sure yet need to play around first            
//         var abc = response;
//         console.log(arg1)
//         console.log("here is abc: ", abc);
//         //console.log(response);

//     }).catch((error) => {
//         console.error(error);
//     });
// }
