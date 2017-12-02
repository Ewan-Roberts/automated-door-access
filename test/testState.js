
'use strict';

let globals = require("../modules/state.js");

setTimeout(() => {

	console.log(globals.state())

}, 100);


setTimeout(() => {

	console.log("current state is : " + globals.state())

	globals.change(!globals.state())

	console.log("current state is opposite : " + globals.state())	

}, 200);

setTimeout(() => {

	console.log("should return true : " + globals.check(globals.state()))

}, 300);


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



