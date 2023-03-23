const userServices = require("../services/userServices");

module.exports = {
    registerUser: async (req, res) => {
        const {userName, password} = req.body;
        if (!userName || !password) res.status(400).send({ message: "unable to register user" });
        try {
            const userAlreadyExists = await userServices.userAlreadyExists(userName);
            if (!userAlreadyExists) {
                userServices.hashAndStorePassword(userName, password);
                const newUser = await userServices.addNewUser(userName, password);
                newUser["authToken"] = await userServices.createAuthToken(newUser._id);
                res.status(200).send(newUser);
            } else {
                res.status(400).send({ message: "unable to register user" });
            }
        }
        catch (err){
            res.status(400).send({ message: "unable to register user" });
        }
    },
    userLogin: async (req, res) => {
        const {userName, password} = req.body;
        if (!userName || !password) res.status(400).send({ message: "unable to login" });
        try {
            const loginAttempt = userServices.checkPassword(userName, password);
            if (loginAttempt) {
                const user = await userServices.getUserBy({"name": userName});
                if (user) {
                    user["authToken"] = await userServices.replaceAuthToken(user._id);
                    res.status(200).send(user);
                } else {
                    res.status(400).send({ message: "unable to login" });
                }
            } else {
                res.status(400).send({ message: "unable to login" });
            }
        }
        catch (err){
            res.status(400).send({ message: "unable to login" });
        }
    },
    getUserWithAuth: async (req, res) => {
        const authToken = req.params.authToken;
        if (!authToken) res.status(400).send({ message: "unable to login" });
        try {
            const returningUser = await userServices.checkAuthToken(authToken)
            if (returningUser) {
                returningUser["authToken"] = await userServices.replaceAuthToken(returningUser._id);
                res.status(200).send(returningUser);
            } else {
                res.status(400).send({ message: "unable to login" });
            }
        }
        catch (err){
            res.status(400).send({ message: "unable to login" });
        }
    }
}