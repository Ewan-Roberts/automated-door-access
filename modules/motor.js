'use strict';

let five = require("johnny-five");

let servo = new five.Servo({
    pin: 37,
    range: [0,200],
    center: true,
    isMoving: false
});

let errorCheck = state => {

    try {

        if(servo.isMoving) throw "is already moving";

        if(typeof(state) !== "boolean") throw "you have passed in a non bool";

        // if(doorState) throw "door is open";
        //TODO: if you're not centered something terrible hass happened 
        if(!servo.currentState()) throw "the door is not centered";
        
        servo.isMoving = true

        if(state){
            servo.max(400)
        } else {
            servo.min(400)
        }
 
    }
    
    catch(err) {
        
        console.log("Throw error (motor.js): " + err)

    }

}

module.exports.open = () => {

    errorCheck(true)

}


module.exports.close = () => {

    errorCheck(false)

}

module.exports.currentState = () => {
        
    return servo.position === (servo.range[0] + servo.range[1])/2;
}

servo.on("move:complete", () => {

    servo.center();

    servo.isMoving = false;

    module.exports.emit("complete")      

})



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
