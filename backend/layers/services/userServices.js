let users = [];

module.exports = {
    addUser: (user) => {
        users.push(user);
    },

    removeUser: (userId) => {
        users = users.filter(user=>user.id != userId);
    },

    getUser: (userId) => {
        return users.filter(user=>user.id == userId)[0];
    }
}