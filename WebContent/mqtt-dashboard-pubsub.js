var host = 'test.mosquitto.org';
var port = 8080;
var path = '';
var clientId = 'browser-client' + parseInt( Math.random() * 100, 10);

var topicSUB = 'devfest/bdm/#';
var topicPUB = 'devfest/bdm/door/command';
var useTLS = false;

//Create a client instance
client = new Paho.MQTT.Client(host, port, path, clientId);
console.log("MQTT client created");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
console.log("MQTT client.connect()");
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("Connected (event 'onConnect')" )
	
	//client.subscribe("World");
	client.subscribe(topicSUB, {qos: 0});
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
	console.log("Connection Lost")
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:"+responseObject.errorMessage)
	}
}

// called when a message arrives
function onMessageArrived(message) {
	console.log( "["+message.destinationName+"] : " + message.payloadString);
  	if ( message.destinationName == "devfest/bdm/temperature") {
  		document.getElementById("val1").value = message.payloadString ;
  		gauge1.set(message.payloadString);
  	}
  	else if ( message.destinationName == "devfest/bdm/humidity") {
  		document.getElementById("val2").value = message.payloadString ;
  		gauge2.set(message.payloadString);
  	}
  	else if ( message.destinationName == "devfest/bdm/door/state") {
  		document.getElementById("doorState").value = message.payloadString ;
  	}
}
