const User = require("../models/user");
const userServices = require("../services/userServices");
const data = require("../data/data");

module.exports = {
    registerUser: (req,res) => {
        const userInfo = req.body;
        if (data.registerUser(userInfo.userName, userInfo.password)) {
            const newUser = new User({userName: userInfo.userName});
            userServices.addUser(newUser);
            res.status(200).send(newUser.export());
        } else {
            res.status(400).send({message:"unable to register user"});
        }
        
    },

    userLogin: (req,res) => {
        const userInfo = req.body;
        const loginAttempt = data.checkPassword(userInfo.userName, userInfo.password);
        if (loginAttempt.userData) {
            const returningUser = new User({userName: loginAttempt.userData.userName, existingId: loginAttempt.userData.id})
            returningUser.import(loginAttempt.userData);
            userServices.addUser(returningUser);
            res.status(200).send(returningUser.export());
        } else {
            res.status(400).send(loginAttempt.err);
        }
    }
}