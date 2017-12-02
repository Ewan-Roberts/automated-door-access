'use strict';

let five = require("johnny-five");
let board = new five.Board();

board.on("ready", function() {

    let touch = require("../modules/touch.js");

    touch.on("allow", () => {

        console.log('hi')
    })


/* later */

    // var foo = new five.Sensor({
    //     pin: "A3",
    //     threshold: 2
    // });

    // foo.on("change", () => {

    //     console.log(foo.value)
    
    // })

    // var foo2 = new five.Sensor({
    //     pin: 8
    // });

    // foo2.on("data", () => {

    //     console.log(foo2.value)
    
    // })

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



