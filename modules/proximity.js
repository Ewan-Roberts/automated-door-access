'use strict';

let five = require("johnny-five");

module.exports = new five.Proximity({
  controller: "HCSR04",
  pin: 4,
  threshold: 40,
  freq: 50
});

// module.exports.state = () => {

//     return (module.exports.value < 2)

// }


// module.exports.on("change", () => {

//     let currentValue = module.exports.value - 817;

//     if(currentValue < 10) {
//         return false
//     } else {
//         knock = true
//     }

//     console.log(currentValue)

//     if(initKnockCheck === null) {
        
//         initFirstKnock() 

//     } 
//     // 

//     if(knockArray.length > 2) {

//         initFirstKnock()

//     }


// });
