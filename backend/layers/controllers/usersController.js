const User = require("../models/user");
const userServices = require("../services/userServices");
const data = require("../data/data");

module.exports = {
    registerUser: (req,res) => {
        const userInfo = req.body;
        if (data.registerUser(userInfo.userName, userInfo.password)) {
            const newUser = new User({name: userInfo.userName});
            userServices.addUser(newUser);
            console.log("new user id:",newUser.id)
            res.status(200).send(newUser.export());
        } else {
            res.status(400).send({message:"unable to register user"});
        }
        
    },

    userLogin: async (req,res) => {
        const userInfo = req.body;
        const loginAttempt = await data.checkPassword(userInfo.userName, userInfo.password);
        if (loginAttempt) {
            const returningUser = userServices.getUserByName(userInfo.userName);
            res.status(200).send(returningUser.export());
        } else {
            res.status(400).send({message:"error logging in"});
        }
    },

    getUserById: (req, res) => {
        const userId = req.params.userId;
        console.log("userid:",userId)
        if (data.isKnownId(userId)) {
            try {
                const user = userServices.getUser(userId);
                console.log("user:",user)
                if (user) {
                    res.status(200).send(user.export());
                } else {
                    res.status(400).send({message:"unable to get user with information provided"});
                }
            } catch(err) {
                console.log(err)
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            console.log("second 400")
            res.status(400).send({message:"unable to get user with information provided"});
        }
    }
}