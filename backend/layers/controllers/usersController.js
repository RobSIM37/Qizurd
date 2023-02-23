const User = require("../models/user");
const userServices = require("../services/userServices");
const data = require("../data/data");

module.exports = {
    registerUser: (req,res) => {
        const userInfo = req.body;
        if (data.registerUser(userInfo.userName, userInfo.password)) {
            const newUser = new User({name: userInfo.userName});
            userServices.addUser(newUser);
            const authToken = userServices.createAuthToken(newUser.id);
            const userData = newUser.export();
            userData["authToken"] = authToken;
            res.status(200).send(userData);
        } else {
            res.status(400).send({message:"unable to register user"});
        }
        
    },

    userLogin: async (req,res) => {
        const userInfo = req.body;
        const loginAttempt = await data.checkPassword(userInfo.userName, userInfo.password);
        if (loginAttempt) {
            const returningUser = userServices.getUserByName(userInfo.userName);
            const authToken = userServices.createAuthToken(returningUser.id);
            const userData = returningUser.export();
            userData["authToken"] = authToken;
            res.status(200).send(userData);
        } else {
            res.status(400).send({message:"error logging in"});
        }
    },

    getUserWithAuth: (req, res) => {
        const authToken = req.params.authToken;
        try {
            const userId = userServices.checkAuthToken(authToken);
            if (userId) {
                const user = userServices.getUser(userId);
                replacementAuthToken = userServices.createAuthToken(userId);
                const userData = user.export();
                userData["authToken"] = replacementAuthToken;
                res.status(200).send(userData);
            } else {
                res.status(401).send({message:"unable to get user with information provided"});
            }
        } catch(err) {
            console.log(err)
            res.status(500).send({message:"an unknown server error has prevented this transaction"});
        }
    }
}