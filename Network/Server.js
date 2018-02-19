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
};

Server.prototype.openSocket = function (port) {
    if (isSocketOpen)
        throw Error("Socket has already been opened");
    isSocketOpen = true;

    var self = this;

    this.serverSocket = new io((port) ? port : 255);
    this.serverSocket.sockets.on('connection', function (socket) {

        console.log("A client connected  ip: " + socket.handshake.address);

        /**
         * @param data {Object}
         * @param data.clientId {number}
         * @param data.authentication {string}
         */
        socket.on("auth", function (data) {
            console.log(data)
            if (data && data.clientId != undefined && Number.isInteger(data.clientId)) {

                let clientId = data.clientId;
                let authentication = data.authentication;
                let client = self.game.clients[clientId];

                if (client && client.authenticationToken === authentication) {

                    let activeClient = new ActiveClient(client, socket, self.game);
                    activeClient.connected();
                    self.activeClients[clientId] = activeClient;

                } else {

                    console.log("Client connected with unknown client id");
                    socket.emit("oops", {msg: "Unknown client id"});
                }
            }
        });
    });
};

Server.prototype.sendGameStateUpdates = function () {
    for (let clientId in this.activeClients) {
        console.log("asd")
        this.activeClients[clientId].sendGameStateUpdates();
    }
};

module.exports = Server;