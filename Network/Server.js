/**
 * Created by Nexus on 25.08.2017.
 */

var io = new require('socket.io');
var ActiveClient = require("./ActiveClient");
var isSocketOpen = false;


var Server = function (game) {
    this.game = game;
    this.socketServer = null;
    this.activeClients = {};
    var self = this;
    setInterval(function () {
        for (let id in self.activeClients) {
            let client = self.activeClients[id];
            if (client.isConnected)
                continue;
            delete self.activeClients[id];
        }
    }, 1000);
};

Server.prototype.openSocket = function (port) {
    if (isSocketOpen)
        throw Error("Socket has already been opened");
    isSocketOpen = true;

    var self = this;

    this.serverSocket = new io((port) ? port : 255, {pingTimeout: 2000});
    this.serverSocket.sockets.on('connection', function (socket) {

        console.log("A client connected  ip: " + socket.handshake.address);

        /**
         * @param data {Object}
         * @param data.clientId {number}
         * @param data.authentication {string}
         */
        socket.on("auth", function (data) {
            if (data && data.clientId != undefined && Number.isInteger(data.clientId)) {
                console.log("Client " + data.clientId + " is trying to authenticate");
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
        });

    });
};

Server.prototype.sendGameStateUpdates = function () {
    for (let clientId in this.activeClients) {
        this.activeClients[clientId].sendGameStateUpdates();
    }
};

module.exports = Server;