const {MongoClient, ServerApiVersion} = require("mongodb");
const dbUtils = require("../../utils/dbUtils");
const userServices = require("../services/userServices");
const User = require("../models/user");

const client = new MongoClient(dbUtils.url, {
    sslKey: dbUtils.cert,
    sslCert: dbUtils.cert,
    serverApi: ServerApiVersion.v1
});
const bcrypt = require("bcrypt");

const issuedIdMap = new Map();
let passwordData = [];

module.exports = {
    registerUser: (userName, password) => {
        if (passwordData.map(data=>data.userName).includes(userName)) return false;
        bcrypt.hash(password, 10, (err, hash) => {
            if (err !== undefined) return false;
            passwordData.push({userName, hash});
        })
        return true;
    },

    checkPassword: async (userName, password) => {
        const matchingUserNameData = passwordData.filter(data=>data.userName === userName)[0];
        if (matchingUserNameData == null) return false;
        const result = await bcrypt.compare(password, matchingUserNameData.hash);
        return result;
    },
    isKnownId: (id, addIfNot) => {
        const alreadyIssued = issuedIdMap.get(id) == true;
        if (addIfNot && !alreadyIssued) {
            issuedIdMap.set(id, true)
        } 
        return alreadyIssued;
    },
    addIdManually: (id) => {
        issuedIdMap.set(id, true);
    },
    loadDataFromDB: async () => {

        try {
            await client.connect();
            const usersDataArray = await client.db("qizurdDB").collection("users").find({}).toArray();
            passwordData = await client.db("qizurdDB").collection("pwHashes").find({}).toArray();
            const issuedIdDataArray = await client.db("qizurdDB").collection("issuedId").find({}).toArray();

            console.log(`- userDataArray has ${usersDataArray.length} entries`);
            console.log(`- passwordData has ${passwordData.length} entries`);
            console.log(`- issuedIdDataArray has ${issuedIdDataArray.length} entries`);

            usersDataArray.forEach(userData=>{
                userServices.addUser(new User(userData));
            })
            issuedIdDataArray.forEach(issuedIdData=>{
                issuedIdMap.set(issuedIdData._id, true)
            })
            console.log("Data Loaded Successfully");
        } finally {
            await client.close();
        }
    },

    saveDataToDB: async () => {
        try {
            await client.connect();
            const upsertOption = {upsert: true}

            const userData = userServices.getAllUserData("_id");
            const issuedIdArr = [];
            issuedIdMap.forEach((val, key) => issuedIdArr.push({_id: key}));

            if (userData.length > 0) {
                const userResult = await client.db("qizurdDB").collection("users").insertMany(userData, upsertOption);
                console.log(`- ${userResult.insertedCount} user documents were inserted`);
            }

            if (passwordData.length > 0) {
                const passwordResult = await client.db("qizurdDB").collection("pwHashes").insertMany(passwordData, upsertOption);
                console.log(`- ${passwordResult.insertedCount} hash documents were inserted`);
            }

            if (issuedIdArr.length > 0) {
                const issuedIdDataResult = await client.db("qizurdDB").collection("issuedId").insertMany(issuedIdArr, upsertOption);
                console.log(`- ${issuedIdDataResult.insertedCount} id documents were inserted`);
            }
            
            console.log("Data Saved Successfully");
        } finally {
            await client.close();
        }
        
    },

    testDBConnection: async () => {
        
        try {
            await client.connect();
            const databasesList = await client.db().admin().listDatabases();
            console.log("Databases List:");
            databasesList.databases.forEach(db => {
                console.log(`- ${db.name}`);
            })
        } finally {
            await client.close();
        }
    }
}