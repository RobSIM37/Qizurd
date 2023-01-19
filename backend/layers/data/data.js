// temp code to stand in for a database
const bcrypt = require("bcrypt");
let passwordData = [];
let usersData = [];

module.export = {
    registerUser: (userName, password) => {
        if (passwordData.map(data=>data.userName).includes(userName)) return false;
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return false;
            passwordData.push({userName, hash});
            return true;
        })
    },

    checkPassword: (userName, password) => {
        const matchingUserNameData = passwordData.filter(data=>data.userName == userName)[0];
        if (matchingUserNameData == null) return false;
        bcrypt.compare(password, matchingUserNameData.hash, (err, result) => {
            if (err) return false;
            return result;
        });
    },

    storeUserData: (userData) => {
        const userIndex = usersData.map(data => data.userName).indexOf(userData.userName);
        if (userIndex == -1) {
            usersData.push(userData);
        } else {
            usersData[userIndex] = userData;
        }
    },

    getUserData: (userName) => {
        return usersData.filter(data=>data.userName == userName)[0]
    }
}