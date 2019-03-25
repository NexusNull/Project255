/**
 * Created by Nexus on 27.08.2017.
 */

/**
 * This Object serves as a storage for data that relates to an active client.
 * @param client
 * @param socket
 * @param game
 * @constructor
 */
var autoIncrement = 0;
var AnonClient = function (socket, game) {
    this.id = autoIncrement++;
    this.socket = socket;
    this.isConnected = true;
    this.game = game;
};

AnonClient.prototype.connected = function () {
    var self = this;

    this.isConnected = true;

    console.log("Anonymous client " + this.id + " connected");

    this.socket.on("disconnect", function () {
        self.disconnected();
    });

    let setup = {
        worlds: {},
        clients: [],
    };

    for (let id in this.game.worlds) {
        setup.worlds[id] = this.game.worlds[id].accessible();
    }

    for (let i = 0; i < this.game.clients.length; i++) {
        setup.clients[i] = this.game.clients[i].accessible();
    }

    this.socket.emit("setup", setup);
};

AnonClient.prototype.sendGameStateUpdates = function () {
    if (this.socket && this.isConnected) {
        let data = {
            worlds: {},
        };

        for (let worldName in this.game.worlds) {
            data.worlds[worldName] = {
                entities: [],
                chunksUpdates: {}
            };
            let world = this.game.worlds[worldName];

            for(let id in world.entities){
                data.worlds[worldName].entities[id] = world.entities[id].accessible();
            }

            for(let chunk of world.getChanges()){
                data.worlds[worldName].chunksUpdates[chunk.x + " " + chunk.y] = {};
                let tileChanges = []
                for(let tile of chunk.getChanges()){
                    tileChanges.push(tile.accessible());
                }
                data.worlds[worldName].chunksUpdates[chunk.x + " " + chunk.y].tileChanges = tileChanges;
            }

        }

        this.socket.emit("gameStateUpdates", data)
    }
};

AnonClient.prototype.disconnected = function () {
    console.log("Anonymous Client " + this.id + " disconnected.");
    this.socket = null;
    this.isConnected = false;
};


module.exports = AnonClient;
