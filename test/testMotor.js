
var five = require("johnny-five");

var board = new five.Board();



board.on("ready", function() {

    motor = require("../modules/motor.js");

    // globals = require("../modules/state.js");

    // touch = require("../modules/touch.js");

    console.log('peen')

    // if the motors potion is set to the default position (not touching the lock)
    //     yes, continue,
    //     no, throw error., try and get to defualt potion.
    
    // servo.action('efwfw')
    // servo.action(23123)
    // servo.action([1,1,1])

    // if the computer things the door have been closed?
    //     yes, continue
    //     no, throw error


    motor.open()
    motor.open()
    motor.open()

    setTimeout(function() {

        motor.close()
        motor.open()
        motor.close()


    }, 2000);

    
    // if there is a key in the lock?

    //     yes, throw error
    //     no, continue

    // setTimeout(()=>{

    //     globals.change(false)

    //     servo.action(true)

    // },12000)


});


try {


    // if the door closed
    //     yes, continue,
    //     no, throw error

    // setTimeout(()=>{

    //     console.log('where the door being open is checked')
    //     // servo.position = 19;

    //     // servo.action(true)

    // },8000)



    // if there is a key in the lock?

    //     yes, throw error
    //     no, continue

    // setTimeout(()=>{

    //     globals.change(false)

    //     servo.action(true)

    // },12000)

    // setTimeout(()=>{

    //     servo.action(true)

    //     setTimeout(() => {

    //         if(servo.isMoving) {

    //             console.log('the attribute of the servo says its moving, cool')
                
    //         }

    //     },10);
        

    // },5000)   



}

catch (err){

    console.log(err)
}

finally {



}



