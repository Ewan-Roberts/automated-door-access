'use strict';


let five = require("johnny-five");
let board = new five.Board();

let clock = require("../modules/clock.js");

let globals = require("../modules/state.js");

let server = require("../modules/server.js");

board.on("ready", function() {

    let servo = require("../modules/lockServo.js");

    let knock = require("../modules/touch.js");

    // let circleButton = require("../modules/circleButton.js");

    let proximity = require("../modules/proximity.js");

    servo.action(true)
    
    clock.startTimer(5000)

    knock.on("allow", () => {

        servo.action(true)

        clock.startTimer(5000)

    })

    clock.on("timer", () => {

        servo.action(false)

    })

    // circleButton.on('hit', () => {

    //     servo.action(!globals.check())

    // })

    server.on('data', res => {
    
        servo.action(res)

    });

    proximity.on("change", function() {

        console.log("cm: ", this.cm)

        if(this.cm < 15){
            
            servo.action(true)

            clock.startTimer(5000)
        }
 
    });
    

});

// try {

//     setTimeout(()=>{

//         checkDefault()
//         checkErrorsForNonBool()

//     },3000)

//     setTimeout(()=>{
//         //if the door is closed
//         doorState = false;
//         //if the global state is definately close
//         globalState = false;
//         //somone doesnt have a key in the lock
//         resisiter = 50

//         servo.action(true)

//         setTimeout(() => {

//             if(servo.isMoving) {

//                 console.log('the attribute of the servo says its moving, cool')
                
//             }

//         },10);
        

//     },4000)   



// }

// catch (err){

//     console.log(err)
// }

// finally {



// }

// var checkDefault = () => {

//     if(servo.position === (servo.range[0] + servo.range[1])/2) {

//         console.log('check default of servo test passed')

//     } else {

//         throw "not at default on start up"
//     }

// }

// var checkErrorsForNonBool = () => {


//     servo.action('efwfw')
//     servo.action(23123)
//     servo.action([1,1,1])


// }



