const { MongoClient, ServerApiVersion } = require("mongodb");
const dbUtils = require("../../utils/dbUtils");

const newConnection = () => {
    return new MongoClient(dbUtils.url);
  };
  
module.exports = {
    findOne: async (collectionName, matchObj) => {
        const connection = newConnection();
        try {
            await connection.connect();
            const value = await connection.db("qizurdDB").collection(collectionName).findOne(matchObj);
            return value;
        }
        finally {
            connection.close();
        }
    },
    insertOne: async (collectionName, obj) => {
        const connection = newConnection();
        try {
            await connection.connect();
            const value = await connection.db("qizurdDB").collection(collectionName).insertOne(obj);
            return value;
        }
        finally {
            connection.close();
        }
    },
    updateOne: async (collectionName, matchingObj, updateObj) => {
        const connection = newConnection();
        try {
            await connection.connect();
            const value = await connection.db("qizurdDB").collection(collectionName).updateOne(matchingObj, updateObj);
            return value;
        }
        finally {
            connection.close();
        }
    }
}