/**
 * Created by Nexus on 27.08.2017.
 */


var ActiveClient = function (client, socket, game) {
    this.client = client;
    this.socket = socket;
    this.isConnected = true;
    this.game = game;
};

ActiveClient.prototype.connected = function () {
    var self = this;

    this.isConnected = true;

    console.log("client " + this.client.id + " connected");

    this.socket.on("disconnect", function () {
        self.disconnected();
    });

    let setup = {
        worlds: {},
        entities: {},
        clients: [],
    };

    for (let id in this.client.entities) {
        let entity = this.client.entities[id];
        if (!setup.worlds[entity.world.name]) {
            setup.worlds[entity.world.name] = entity.world;
        }
        setup.entities[id] = entity.accessible();
    }

    for (let id in setup.worlds) {
        setup.worlds[id] = setup.worlds[id].accessible();
    }

    for (let i = 0; i < this.game.clients.length; i++) {
        setup.clients[i] = this.game.clients[i].accessible();
    }

    this.socket.emit("setup", setup);
};

ActiveClient.prototype.sendGameStateUpdates = function () {
    if (this.socket && this.isConnected) {
        let data = {
            entities: [],
        };
        for (let id in this.client.entities) {
            let entity = this.client.entities[id];
            data.entities[id] = entity.accessible();
        }
        this.socket.emit("gameStateUpdates", data)
    }
};

ActiveClient.prototype.disconnected = function () {
    console.log("Client " + this.id + " disconnected.");
    this.socket = null;
    this.isConnected = false;
};


module.exports = ActiveClient;
