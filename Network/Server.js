/**
 * Created by Nexus on 25.08.2017.
 */

var io = new require('socket.io');
var ActiveClient = require("./ActiveClient");
var AnonClient = require("./AnonClient");
var isSocketOpen = false;


var Server = function (game) {
    this.game = game;
    this.socketServer = null;
    this.activeClients = {};
    this.anonymousClients = {};
    var self = this;
    setInterval(function(){
        for(let id in self.activeClients){
            let client = self.activeClients[id];
            if(client.isConnected)
                continue;
            delete self.activeClients[id];
        }
        for(let id in self.anonymousClients){
            let client = self.anonymousClients[id];
            if(client.isConnected)
                continue;
            delete self.anonymousClients[id];
        }
    },1000);
};

Server.prototype.openSocket = function (port) {
    if (isSocketOpen)
        throw Error("Socket has already been opened");
    isSocketOpen = true;

    var self = this;

    this.serverSocket = new io((port) ? port : 255,{pingTimeout:2000});
    this.serverSocket.sockets.on('connection', function (socket) {

        console.log("A client connected  ip: " + socket.handshake.address);

        /**
         * @param data {Object}
         * @param data.clientId {number}
         * @param data.authentication {string}
         */
        socket.on("auth", function (data) {
            console.log(data)
            if(data && data.authentication === "anonymous"){
                let anonClient = new AnonClient(socket, self.game);
                anonClient.connected();
                self.anonymousClients[anonClient.id] = anonClient;
            } else {
                if (data && data.clientId != undefined && Number.isInteger(data.clientId)) {
                    console.log("Client "+data.clientId+ " is trying to authenticate");
                    let clientId = data.clientId;
                    let authentication = data.authentication;
                    let clientData = self.game.clients[clientId];

                    if (clientData && clientData.authenticationToken === authentication) {
                        if (!self.activeClients[clientId]) {
                            let activeClient = new ActiveClient(clientData, socket, self.game);
                            activeClient.connected();
                            self.activeClients[clientId] = activeClient;
                        } else {
                            console.log("Client connected twice");
                            socket.emit("oops", {msg: "Detected another connection with the same authentication, close all other connections before reconnecting."});
                        }
                    } else {
                        console.log("Client connected with unknown client id");
                        socket.emit("oops", {msg: "Unknown client id, create an account or check credentials."});
                    }
                }
            }
        });

    });
};

Server.prototype.sendGameStateUpdates = function () {
    for (let clientId in this.activeClients) {
        this.activeClients[clientId].sendGameStateUpdates();
    }
    for (let id in this.anonymousClients) {
        this.anonymousClients[id].sendGameStateUpdates();
    }
};

module.exports = Server;