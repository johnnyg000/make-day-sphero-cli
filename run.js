#!/usr/bin/env node
var sphero = require("sphero");
var spheroId = process.argv[2];
var orb = sphero(spheroId);

const streamData = require("./lib/dataStream")
const stdin = process.openStdin()

stdin.addListener("data", function(data) {
  let command = "orb." + data.toString().trim()
  try {
    let result = eval(command)
    console.log(`Executing: ${result}`)
  } catch (error) {
    console.error(error)
  }
})

orb.connect(() => {
  console.log("Connected... Make it do stuff")

  orb.on("imuAngles", function(data) {
		streamData.imuAngles(data)
	})

	orb.on("odometer", function(data) {
		streamData.odometer(data)
	})

	orb.on("gyroscope", function(data) {
		streamData.gyroscope(data)
	})

	orb.on("velocity", function(data) {
		streamData.velocity(data)
	})

	orb.on("accelOne", function(data) {
		streamData.accelOne(data)
	})
	orb.on("accelerometer", function(data) {
		streamData.accelerometer(data)
	})
	orb.on("motorsBackEmf", function(data) {
		streamData.motorsBackEmf(data)
	})
})

orb.disconnect(() => {

})

// orb.connect(function () {
//   console.log('connected to sphero')
//   orb.setRawMotors({lmode: 0x01, lpower: 100, rmode: 0x02, rpower: 200})
//   orb.color("green");
//   orb.color("cyan");
//   orb.roll(100, 0)
// });