// temp code to stand in for a database

const {MongoClient, ServerApiVersion} = require("mongodb");
const dbUtils = require("../../utils/dbUtils");
const certificatePath = "backend/permissions/X509-cert-5519782101891610673.pem";

const bcrypt = require("bcrypt");

const issuedIdMap = new Map();
let passwordData = [];
let usersData = [];

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

    storeUserData: (userData) => {
        const userIndex = usersData.map(data => data.userName).indexOf(userData.userName);
        if (userIndex == -1) {
            usersData.push(userData);
        } else {
            usersData[userIndex] = userData;
        }
    },

    isKnownId: (id, addIfNot) => {
        const alreadyIssued = issuedIdMap.get(id) == true;
        if (addIfNot && !alreadyIssued) {
            issuedIdMap.set(id, true)
        } 
        return alreadyIssued;
    },

    loadDataFromDB: async () => {

        const client = new MongoClient(dbUtils.url, {
            sslKey: certificatePath,
            sslCert: certificatePath,
            serverApi: ServerApiVersion.v1
        });
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
    },

    saveDataToDB: () => {

    },

    testDBConnection: async () => {
        const client = new MongoClient(dbUtils.url, {
            sslKey: certificatePath,
            sslCert: certificatePath,
            serverApi: ServerApiVersion.v1
        });
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
        return "hooray"
    },
}