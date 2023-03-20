const Question = require("../models/question");
const User = require("../models/user");
const data = require("../data/data");
const idUtils = require("../../utils/idUtils");

module.exports = {
    addUser: async (user) => {
        const client = data.getConnection()
        try {
            await client.connect();
            const userResult = await client.db("qizurdDB").collection("users").insertOne(user);
            if (userResult) {
                return true;
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
    },
    removeUser: async (userId) => {
        const client = data.getConnection()
        try {
            await client.connect();
            const deleteResult = await client.db("qizurdDB").collection("users").deleteOne( { _id: userId } )
            return deleteResult.deletedCount === 1;
        } 
        catch {
            return false;
        } 
        finally {
            await client.close();
        }
    },
    getUserBy: (key, value) => {
        return data.getUserBy(key,value);
    },
    updateUser: async (userData) =>{
        const client = data.getConnection()
        try {
            await client.connect();
            const updateResult = await client.db("qizurdDB").collection("users").updateOne( {_id:userData._id}, userData )
            return updateResult.modifiedCount === 1
        } 
        catch {
            return false;
        } 
        finally {
            await client.close();
        }
    },
    buildUsersFromUserData: (userData) => {
        users = userData.map(u => new User(u));
        userData.forEach(user => user.quizzes.forEach(quiz => {
            const userObj = this.getUser(user.id)
            const studentsObjArr = quiz.students.map(student=>userObj.getStudent(student.id));
            const questionObjArr = quiz.questions.map(question => new Question(question));
            const quizObj = new Quiz(quiz);
            quizObj.import({
                quizTitle: quiz.quizTitle,
                description: quiz.description,
                questions: questionObjArr,
                students: studentsObjArr
            })
            userObj.addOrUpdateQuiz(quizObj);
        }))
    },
    createAuthToken: (userId) => {
        const authToken = idUtils(40);
        data.storeNewAuthToken(authToken, userId);
        return authToken;
    },
    checkAuthToken: (authToken) => {
        return data.checkAuthTokenValidity(authToken);
    }
}