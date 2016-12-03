const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8071 });

wss.on('connection', ws => {
	ws.on('message', message => {
		try {
			message = JSON.parse(message);

			if(typeof message.name === 'undefined' || typeof message !== 'object') {
				throw new Error("Invalid message received");
			}

			switch(message.name) {
			case 'handshake':
				ws.send(JSON.stringify({
					mid: message.mid,
					status: 'ok'
				}));
				break;
			case 'online_users':
				ws.send(JSON.stringify({
					mid: message.mid,
					data: [
						{
							username: 'Ediootti',
							motto: '#artsy'
						},
						{
							username: 'Pellavalilja',
							motto: 'Oh, summer... Where are you?'
						},
						{
							username: 'Admin',
							motto: 'bzzzzzt.'
						}
					]
				}));
				break;
			case 'badges':
				if(typeof message.id === "undefined") {
					message.id = 1; // TODO: override to current user
				}

				ws.send(JSON.stringify({
					mid: message.mid,
					data: [
						{
							id: "ADM"
						},
						{
							id: "RADZZ"
						},
						{
							id: "KR1"
						},
						{
							id: "Z63"
						},
						{
							id: "FAN"
						}
					]
				}));
				break;
			default:
				console.error("[ERROR] Unknown message with name:", message.name);
				break;
			}
		} catch(e) {
			console.error(e);
		}
	});

	console.log("new connection");
});
