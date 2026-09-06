const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

async function connectTestDb() {
    mongo = await MongoMemoryServer.create();

    const uri = mongo.getUri();

    await mongoose.connect(uri);
}

async function clearTestDb() {
    const collections = mongoose.connection.collections;

    for (const key of Object.keys(collections)) {
        await collections[key].deleteMany({});
    }
}

async function closeTestDb() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if (mongo) {
        await mongo.stop();
    }
}

module.exports = {
    connectTestDb,
    clearTestDb,
    closeTestDb
};