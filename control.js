var arDrone = require('ar-drone');
var drone  = arDrone.createClient();
var Leap = require('leapjs');
var utils = require('./utils');

controller = new Leap.Controller();

dropFrameTolerance = 5;
vScale = 0.55;
rA = new utils.Averager(3);
pA = new utils.Averager(3);
yA = new utils.Averager(3);
positionYRef = null;

function controlDrone(drone, roll, pitch, yaw, vertical) {
	drone.takeoff();
	drone.left(roll);
	drone.front(pitch);
	drone.clockwise(yaw);
	drone.up(vertical);
}

controller.on('ready', function() {
	console.log('Controller ready');
	unsteadyHands = 0;
});

controller.on('frame', function(frame) {
	if (frame.hands.length < 1 || (frame.hands.length == 1 && frame.hands[0].fingers.length < 2)) {
		unsteadyHands = utils.constrain(unsteadyHands - 1, 0, dropFrameTolerance);
		if (unsteadyHands == 0) {
			//hover
			console.log('hovering');
			drone.stop();
		}
	} else {
		if (unsteadyHands == 0) {	// first frame since a long drop
			positionYRef = frame.hands[0].palmPosition[1];
		}
		if (frame.hands[0].palmPosition[1] < 80) {
			drone.land();
			console.log('landing');
			// controller.removeAllListeners('frame');
			return;
		}

		unsteadyHands = utils.constrain(unsteadyHands + 1, 0, dropFrameTolerance);

		var rotation = frame.hands[0].palmNormal;
		var direction = frame.hands[0].direction;

		var roll = rA.avg( utils.map(rotation[0], -0.4, 0.4, -1, 1) ) * vScale;
		var pitch = pA.avg( utils.map(rotation[2], -1, 0.3, -1.0, 1.0) ) * vScale;
		var yaw = yA.avg( utils.map(direction[0], 0.3, 0.8, -1, 1) ) * vScale;

		var height = frame.hands[0].palmPosition[1] - positionYRef;
		height = utils.map(height, -100, 100, -1.0, 1.0);

		// roll = 0;
		// pitch = 0;
		// height = 0;
		yaw = 0;

		console.log('roll: ' + roll + ', pitch: ' + pitch + ', yaw: ' + yaw + ', height: ' + height);

		controlDrone(drone, roll, pitch, yaw, height);
	}
});

controller.connect();
console.log('Waiting to connect...');