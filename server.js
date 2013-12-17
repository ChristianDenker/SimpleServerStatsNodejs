var app = require('express')(), server = require('http').createServer(app), io = require(
		'socket.io').listen(server), os = require('os');

server.listen(80);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	setInterval(function() {
		var d = new Date();
		var h = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours());
		var m = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
		var s = (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
		var dateString = h + ":" + m + ":" + s;

		socket.emit("update", {
			"time" : dateString,
			"hostname" : os.hostname(),
			"uptime" : os.uptime(),
			"freemem" : os.freemem(),
			"totalmem" : os.totalmem(),
			"loadaverage" : os.loadavg(),
			"cpus" : JSON.stringify(os.cpus())
		});
	}, 1000);
	// socket.emit('news', {
	// hello : 'world'
	// });
	// socket.on('my other event', function(data) {
	// console.log(data);
	// });
});