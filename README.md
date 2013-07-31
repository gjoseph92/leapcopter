Leapcopter
==========

A [node.js](http://www.nodejs.org) bridge between the [Leap JavaScript API](https://github.com/leapmotion/leapjs) and [@felixge's AR.DRONE library](https://github.com/felixge/node-ar-drone).

### To run:
  0. Install node and npm
  1. Download the repo and `npm install`
  2. Connect to the AR.Drone
  3. `node control.js`

### Controls:
  - Your hand is the quadcopter; angle it to control pitch and roll
  - Hold your hand higher to go up, lower to go down
  - When the Leap can't clearly see your hand, the drone will hover
  - Hold your hand a couple centimeters over the Leap to land
  - Keep your fingers splayed wide so the Leap can clearly see your hand's orientation
  - Tip: put your hand over the Leap for a moment so it starts taking off, then remove it until takeoff is done. That way the drone will be stably hovering when you start controlling it.
