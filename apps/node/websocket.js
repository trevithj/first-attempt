const WebSocket = require('ws');

const doSend = (ws, msg) => {
	ws.send(msg);
	console.log('sent: %s', msg.replace(/\n/g, '|'));
}

const checkForReceipt = (ws, msg) => {
	const rows = msg.split('\n');
	if(rows[0] ==='DISCONNECT') {
		const head1 = rows[1].split(':');
		doSend(ws, `RECEIPT\nreceipt-id:${head1[1]}\n\n\0`);
		ws.isAlive = false; //terminate();
		return true; //flag termination
	}
}

let countInterval;
let count = 0;

const wss = new WebSocket.Server({ port: 8008 });

wss.on('connection', function connection(ws) {
	doSend(ws, 'CONNECTED\nversion:1.2\nserver:counter/0.2\n\n\0');
	ws.isAlive = true;
	ws.on('pong', () => {
		ws.isAlive = true;
		console.log('ping...pong');
	});

	ws.on('message', function incoming(message) {
		console.log('received: %s', message.replace(/\n/g, '|'));
		// ws.send(message); //echo
		const flag = checkForReceipt(ws, message);
		if (flag) {
			clearInterval(countInterval);
			console.log('disconnect - terminating.');
			ws.terminate();
		}
	});

	clearInterval(countInterval);//just in case
	countInterval = setInterval(() => {
		// const populationCount = Math.floor(Math.random() * 5);
		count += 1;
		const populationCount = count % 4;
		const body = JSON.stringify({ populationCount });
		doSend(ws, `MESSAGE\nsubscription:sub-0\ndestination:/population/\n\n${body}\0`);
	}, 45000);
	console.log('count interval started');
});


function noop() {}

const pingInterval = setInterval(function ping() {
	console.log('clients:', wss.clients.size);
	wss.clients.forEach(function each(ws) {
		if (ws.isAlive === false) {
			clearInterval(countInterval);
			console.log('ping terminating.');
			return ws.terminate();
		} 

		ws.isAlive = false;
		ws.ping(noop);
	});
}, 30000);


wss.on('close', function close() {
	clearInterval(pingInterval);
	clearInterval(countInterval);
	console.log('closed connection');
});
