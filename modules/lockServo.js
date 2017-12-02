'use strict';

let five = require("johnny-five");

let globals = require('./state.js');

let motor = require('./motor.js');

let errorCheck = (bool, callback) => {

    try {

        // if(doorState) throw "door is open";
        if(globals.state() === bool) throw "the door is already " + bool;
        
        callback()

        motor.on("complete", () => {

            globals.change(bool)

        })

        

    }
    
    catch(err) {
        
        console.log("Throw error (lockServo.js): " + err)

    }

}

module.exports.open = () => {

    errorCheck(true, motor.open)

    // motor.open()

    // motor.on("complete", () => {

    //     globals.change(true)

    // })

}


module.exports.close = () => {

    errorCheck(false, motor.close)

    // motor.on("complete", () => {

    //     globals.change(false)

    // })

}




// if the motors potion is set to the default position (not touching the lock)
//     yes, continue,
//     no, throw error., try and get to defualt potion.

// if the door closed?
//     yes, continue,
//     no, throw error

// if the computer things the door have been closed?
//     yes, continue
//     no, throw error

// if there is a key in the lock?

//     yes, throw error
//     no, continue

// if the lock is tapped in a sequence

//     no, buzz, tell them to start again
//     yes, open the door

// if someone waves their hand over the internal lock and you sense their heat
//     yes, open the door
//     no, do nothing

// if the rotor has done the full rotation

//     no, throw error, return to default 
//     yes, go back to default, set global state to open

// then, set timer for 5 minutes

// if you see someone close to the door
//     yes, reset timer to 5 mins
//     no, wait

// if after 5 mins you see noone
//     yes, close to door
//     no, reset the timer

// to close

// if is something happening/moving?
//     yes, ignore attional commands
//     no, continue


// if the motors potion is set to the default position
//     yes, continue,
//     no, throw error.

// if the door closed?
//     yes, continue,
//     no, throw error

// if the global state is open?
//     yes, continue
//     no, throw error

// if there is a key in the lock?

//     yes, throw error
//     no, continue


// if the rotor as done the full rotation

//     no, throw error, return to default 
//     yes, go back to default, set global state to close
