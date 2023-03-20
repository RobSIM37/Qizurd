const dbUtils = require("../../utils/dbUtils");
const {MongoClient, ServerApiVersion} = require("mongodb");
const timeUtil = require("../../utils/timeUtils");
const bcrypt = require("bcrypt");

const authTokenTTL = 72;

const newConnection = () => {
    return new MongoClient(dbUtils.url, {
        sslKey: dbUtils.cert,
        sslCert: dbUtils.cert,
        serverApi: ServerApiVersion.v1
    });
}

const getUserBy = async (key, value) => {
    const client = data.getConnection()
    const matchObj = {}
    matchObj[key] = value;
    try {
        await client.connect();
        const userData = await client.db("qizurdDB").collection("users").findOne( matchObj )
        if (userData) {
            const user = new User(userData);
            return user;
        } else {
            return false;
        }
    } 
    catch {
        return false;
    } 
    finally {
        await client.close();
    }
}
const verifyUserDoesNotExist = (userName) => {
    const user = getUserBy("name", userName);
    return user;
}
module.exports = {
    getConnection: () => {
        return newConnection();
    },
    getUserBy: async (key, value) => {
        return getUserBy(key, value)
    },
    registerUser: async (userName, password) => {
        if (!userName || !password) return false
        const userExists = verifyUserDoesNotExist(userName);
        if (userExists) return false;
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err !== undefined) return false;
            const client = newConnection();
            try {
                await client.connect();
                const passwordResult = await client.db("qizurdDB").collection("pwHashes").insertOne({userName, hash})
                if (passwordResult) {
                    return true;
                } else {
                    return false;
                }
            }
            catch {
                return false
            }
            finally {
                client.close();
            }
        })
        return true;
    },
    checkPassword: async (userName, password) => {
        const client = newConnection();
        try {
            await client.connect();
            const passwordResult = await client.db("qizurdDB").collection("pwHashes").findOne({userName});
            if (passwordResult) {
                const result = await bcrypt.compare(password, passwordResult.hash);
                return result;
            } else {
                return false;
            }
        }
        catch {
            return false;
        }
        finally {
            client.close();
        }
    },
    storeNewAuthToken: async (authToken, userId) => {
        const client = newConnection();
        try {
            const authTokenObj = {
                userId,
                authToken,
                issueTime: Date.now()
            }
            const existingAuth = await client.db("qizurdDB").collection("authTokens").findOne({userId})
            if (existingAuth) {
                const authTokenStoreResult = await client.db("qizurdDB").collection("authTokens").updateOne({_id:existingAuth.id},authTokenObj);
                if (authTokenStoreResult) {
                    return true;
                } else {
                    return false;
                }
            } else {
                const authTokenStoreResult = await client.db("qizurdDB").collection("authTokens").insertOne(authTokenObj);
                if (authTokenStoreResult) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        finally{
            client.close();
        }
    },
    checkAuthTokenValidity: async (authToken) => {
        const client = newConnection();
        try {
            const authObj = await client.db("qizurdDB").collection("authTokens").findOne({authToken});
            if (!authObj) return false;
            const timeSinceIssue = Date.now() - authObj.issueTime;
            if (timeUtil.convertFromMilliseconds(timeSinceIssue, "hour") <= authTokenTTL) {
                return authObj.userId;
            } else {
                return false;
            }
        }
        finally{
            client.close();
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