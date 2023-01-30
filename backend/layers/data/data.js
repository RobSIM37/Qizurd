// temp code to stand in for a database
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

    checkPassword: (userName, password) => {
        const matchingUserNameData = passwordData.filter(data=>data.userName == userName)[0];
        if (matchingUserNameData == null) return false;
        let userData = null;
        let err = null;
        bcrypt.compare(password, matchingUserNameData.hash, (err, result) => {
            if (result) {
                userData = getUserData(userName);
            }
        });
        return {userData, err};
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
    },

    isKnownId: (id, addIfNot) => {
        const alreadyIssued = issuedIdMap.get(id) == true;
        if (addIfNot && !alreadyIssued) {
            issuedIdMap.set(id, true)
        } 
        return alreadyIssued;
    }
}