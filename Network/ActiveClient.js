/**
 * Created by Nexus on 27.08.2017.
 */

var JobEnum = require("../Enum/JobData");
var Unit = require("../Entities/Unit");

/**
 * This Object serves as a storage for data that relates to an active client.
 * @param {Client} client
 * @param socket
 * @param game
 * @constructor
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
        if (entity.world != null) {
            if (!setup.worlds[entity.world.name]) {
                setup.worlds[entity.world.name] = entity.world;
            }
            setup.entities[id] = entity.accessible();
        }
    }

    for (let id in setup.worlds) {
        setup.worlds[id] = setup.worlds[id].accessible();
    }

    for (let i = 0; i < this.game.clients.length; i++) {
        setup.clients[i] = this.game.clients[i].accessible();
    }

    this.socket.emit("setup", setup);

    this.socket.on("gameQueueJobs", function (data) {
        /**
         * @typedef {Array<job>} data
         * @typedef {object} job
         * @typedef {number} job.entityId - The Id if the entity that is supposed to execute the job
         * @typedef {JobEnum.type} job.type - JobEnum.type of job type
         * @typedef {object} job.options - Options for the job execution
         */
        if (Array.isArray(data)) {
            if (data.length > 1000)
                return;
            for (var i = 0; i < data.length; i++) {
                if (data[i]) {
                    let job = data[i];
                    if (typeof job.type === "number" && JobEnum.Name[job.type]) {
                        if (typeof job.entityId === "number" && game.entities[job.entityId].owner.id === self.client.id) {
                            let entity = game.entities[job.entityId];
                            if (entity instanceof Unit) {
                                /**
                                 * @typedef {Unit} entity
                                 */

                                entity.queueJob(job);
                            }
                        }
                    }
                }
            }
        }
    })
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

        let chunks = game.worlds["World"].getChanges();
        while (!chunks.done) {
            let chunk = chunks.next();
        }
        this.socket.emit("gameStateUpdates", data)
    }
};

ActiveClient.prototype.sendGameStateUpdates = function () {
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

            for (let id in world.entities) {
                data.worlds[worldName].entities[id] = world.entities[id].accessible();
            }

            for (let chunk of world.getChanges()) {
                data.worlds[worldName].chunksUpdates[chunk.x + " " + chunk.y] = {};
                let tileChanges = [];
                for (let tile of chunk.getChanges()) {
                    tileChanges.push(tile.accessible());
                }
                data.worlds[worldName].chunksUpdates[chunk.x + " " + chunk.y].tileChanges = tileChanges;
            }

        }

        this.socket.emit("gameStateUpdates", data)
    }
};
ActiveClient.prototype.disconnected = function () {
    console.log("Client " + this.client.id + " disconnected.");
    this.socket = null;
    this.isConnected = false;
};


module.exports = ActiveClient;
