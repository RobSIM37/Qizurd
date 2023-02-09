const dataLayer = require("../layers/data/data");
const User = require("../layers/models/user");
const userServices = require("../layers/services/userServices");
const idUtils = require("./idUtils");

// const idArr = []
// for (let i=0; i<3; i++) {
//     let id = idUtils();
//     idArr.push(id);
//     dataLayer.addIdManually(id);
// }
// const usersArr = [
//     {
//         name:"Rob",
//         password: "12345",
//         id: idArr[0]
//     },
//     {
//         name:"Robby",
//         password: "67890",
//         id: idArr[1]
//     },
//     {
//         name:"Gary",
//         password: "abcde",
//         id: idArr[2]
//     }
// ]
// usersArr.forEach(user => {
//     if (dataLayer.registerUser(user.name, user.password)) {
//         userServices.addUser(new User(user))
//     }
// })

// dataLayer.saveDataToDB();

dataLayer.loadDataFromDB().then(res=>{
    const me = userServices.getUserByName("Rob");
    console.log(me.id);
});