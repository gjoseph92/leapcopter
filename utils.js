exports.map = function(x, start1, stop1, start2, stop2) {
	// var scale = (stop1 - start1) / (stop2 - start2);
	return ( ((x - start1) / (stop1 - start1)) * (stop2 - start2)) + start2;
};

exports.constrain = function(x, min, max) {
	return x > max ? max : (x < min ? min : x);
};

function Averager(numToAverage) {
	this.hist = [];
	this.sum = 0;
	this.numToAverage = numToAverage;
}
Averager.prototype.avg = function(x) {
	this.hist.push(x);
	this.sum += x;
	if (this.hist.length > this.numToAverage) {
		var old = this.hist.shift();
		this.sum -= old;
	}
	return this.sum / this.hist.length;
}

exports.Averager = Averager;