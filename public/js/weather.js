weather = {

    "forcast" : function (description) {

        return weatherData.weather[0].description;

    },
    "temp" : function() {

        var rounded = Math.round(weatherData.main.temp_max)

        return rounded;

    },

    'warmth' : function() {

        var heat = ''

        var degree = weatherData.main.temp_max

        if (degree >18 ) {

            heat = ' warm '

        }

        if (degree <=18) {

            heat = ' cold; you should bring a jumper. '

        }

        return heat;

    },

    'sunrise': function () {


        var time = moment.unix(weatherData.sys.sunrise).format('HH:mm')


        return time


    },

    'sunset': function () {

        var time = moment.unix(weatherData.sys.sunset).format('HH:mm')

        return time

    }



}