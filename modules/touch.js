'use strict';

let five = require("johnny-five");

module.exports = new five.Sensor({
  pin: "A3",
  threshold: 40
});


let knockArray = [];

let initKnockCheck = null;

let knock = false 

let password = [true,false,true]



let knockMatch = array => {


    if(array[0] == password[0]) {

        if(array)

    } else {
        return false
    }

    if(array[0] && !array[1] && array[2]) {

        console.log(array[0] && !array[1] && array[2])

        module.exports.emit("allow")

    } else {

        return false;

    }

}

let initFirstKnock = () => {
    
    knockArray = []

    if(initKnockCheck) {
        clearInterval(initKnockCheck);
    }

    initKnockCheck = setInterval(() => {
        
        if(knockArray.length < 3) {
            
            knockArray.push(knock)
            knock = false;
            knockMatch(knockArray)
            console.log(knockArray)

        }
        
    }, 2000);
}

module.exports.on("change", () => {

    let currentValue = module.exports.value - 817;

    if(currentValue < 10) {
        return false
    } else {
        knock = true
    }

    console.log(currentValue)

    if(initKnockCheck === null) {
        
        initFirstKnock() 

    } 
    // 

    if(knockArray.length > 2) {

        initFirstKnock()

    }


});
