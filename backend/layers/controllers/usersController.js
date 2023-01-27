const User = require("../models/user");
const userServices = require("../services/userServices");
const data = require("../data/data");

module.exports = {
    registerUser: (req,res) => {
        const userInfo = JSON.parse(req.body);
        if (data.registerUser(userInfo.userName, userInfo.password)) {
            const newUser = new User({userName: userInfo.userName});
            userServices.addUser(newUser);
            res.status(200).send(JSON.stringify(newUser.export()));
        } else {
            res.status(400).send("unable to register user");
        }
        
    },

    userLogin: (req,res) => {
        const userInfo = JSON.parse(req.body);
        if (data.checkPassword(userInfo.userName, userInfo.password)) {
            const returningUserData = data.getUserData(userInfo.userName);
            const returningUser = new User({userName: userInfo.userName, existingId: returningUserData.id})
            returningUser.import(returningUserData);
            userServices.addUser(returningUser);
            res.status(200).send(JSON.stringify(returningUser.export()));
        } else {
            res.status(400).send("unable to login user");
        }
    }
}