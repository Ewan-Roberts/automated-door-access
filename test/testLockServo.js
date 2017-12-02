
var five = require("johnny-five");

var board = new five.Board();



board.on("ready", function() {

    servo = require("../modules/lockServo.js");

    // touch = require("../modules/touch.js");

    console.log('fwefrf32r32ew')

    // if the motors potion is set to the default position (not touching the lock)
    //     yes, continue,
    //     no, throw error., try and get to defualt potion.
    
    // servo.action('efwfw')
    // servo.action(23123)
    // servo.action([1,1,1])

    // if the computer things the door have been closed?
    //     yes, continue
    //     no, throw error

    setTimeout(()=>{

        servo.open()
        servo.close()
        servo.open()

    },500)

    
    setTimeout(()=>{

        // servo.close()
        // servo.open()


    },1000)

    
    // if there is a key in the lock?

    //     yes, throw error
    //     no, continue

    // setTimeout(()=>{

    //     globals.change(false)

    //     servo.action(true)

    // },12000)


});



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






