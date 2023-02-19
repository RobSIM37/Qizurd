const dbUtils = require("../../utils/dbUtils");
const {MongoClient, ServerApiVersion} = require("mongodb");

const client = new MongoClient(dbUtils.url, {
    sslKey: dbUtils.cert,
    sslCert: dbUtils.cert,
    serverApi: ServerApiVersion.v1
});

const bcrypt = require("bcrypt");

const issuedIdMap = new Map();
let passwordData = [];
let userData = [];

module.exports = {
    registerUser: (userName, password) => {
        if (!userName || !password) return false
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
            console.log("adding id: ",id)
            issuedIdMap.set(id, true)
        } 
        return alreadyIssued;
    },
    addIdManually: (id) => {
        issuedIdMap.set(id, true);
    },
    getAllUserData: () => {
        return [...userData];
    },
    setAllUserData: (incommingUserData) => {
        userData = [...incommingUserData];
    },
    clearDB: async () => {
        try {
            await client.connect();
            await client.db("qizurdDB").collection("users").deleteMany();
            await client.db("qizurdDB").collection("pwHashes").deleteMany();
            await client.db("qizurdDB").collection("issuedId").deleteMany();
            console.log("DB Cleared");
        } finally {
            await client.close();
        }
    },
    loadDataFromDB: async () => {

        try {
            await client.connect();
            userData = await client.db("qizurdDB").collection("users").find({}).toArray();
            passwordData = await client.db("qizurdDB").collection("pwHashes").find({}).toArray();
            const issuedIdDataArray = await client.db("qizurdDB").collection("issuedId").find({}).toArray();

            console.log(`- userData has ${userData.length} entries`);
            console.log(`- passwordData has ${passwordData.length} entries`);
            console.log(`- issuedIdDataArray has ${issuedIdDataArray.length} entries`);

            issuedIdDataArray.forEach(issuedIdData=>{
                issuedIdMap.set(issuedIdData._id, true)
            })
            console.log("Data Loaded Successfully");
        } catch(err) {
            console.log(err)
        } finally {
            await client.close();
        }
    },

    saveDataToDB: async () => {
        try {
            await client.connect();
            const upsertOption = {upsert: true}

            const issuedIdArr = [];
            issuedIdMap.forEach((val, key) => issuedIdArr.push({_id: key}));

            if (userData.length > 0) {
                const userResult = await client.db("qizurdDB").collection("users").insertMany(userData, upsertOption);
                console.log(`- ${userResult.insertedCount} user documents were inserted`);
            }

            if (passwordData.length > 0) {
                const passwordResult = await client.db("qizurdDB").collection("pwHashes").insertMany(userData, upsertOption);
                console.log(`- ${passwordResult.insertedCount} hash documents were inserted`);
            }

            if (issuedIdArr.length > 0) {
                const issuedIdDataResult = await client.db("qizurdDB").collection("issuedId").insertMany(userData, upsertOption);
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