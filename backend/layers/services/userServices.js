const dataServices = require("./dataServices");
const idUtils = require("../../utils/idUtils");
const timeUtils = require("../../utils/timeUtils");
const bcrypt = require("bcrypt");

module.exports = {
    userAlreadyExists: async (userName) => {
        const user = await dataServices.findOne("users", {"name": userName})
        if (user) {
            return true;
        } else {
            return false;
        }
    },
    addNewUser: async (userName) => {
        const newId = idUtils();
        const newUser = {
            "_id": newId,
            "id": newId,
            "name": userName,
            "quizzes": [],
            "students": []
        }
        await dataServices.insertOne("users", newUser);
        return newUser;
    },
    updateUser: async (user) => {
        await dataServices.updateOne("users", {"_id": user._id},{
            $set: {
                "students": user.students,
                "quizzes": user.quizzes
            }
        })
    },
    createAuthToken: async (userId) => {
        const authToken = idUtils(40);
        await dataServices.insertOne("authTokens",
        {
            "_id": userId,
            "authToken": authToken,
            "timeCreated": Date.now()
        })
        return authToken
    },
    replaceAuthToken: async (userId) => {
        const authToken = idUtils(40);
        await dataServices.updateOne("authTokens",
        {"_id": userId},
        {
            $set: {
                "authToken": authToken,
                "timeCreated": Date.now()
            }   
        })
        return authToken;
    },
    checkAuthToken: async (authToken) => {
        const authObj = await dataServices.findOne("authTokens", {"authToken": authToken});
        if (authObj) {
            const timeSinceIssue = Date.now() - authObj.timeCreated;
            if (timeUtils.convertFromMilliseconds(timeSinceIssue, "hour") < 72) {
                const user = await dataServices.findOne("users", {"_id":authObj._id})
                return user
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    hashAndStorePassword: async (userId, password) => {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (!err) {
                await dataServices.insertOne("pwHashes",
                {
                    "_id": userId,
                    "hash": hash
                })
            }
        });
    },
    checkPassword: async (userName, password) => {
        const hashObj = await dataServices.findOne("pwHashes", {"_id": userName});
        const result = await bcrypt.compare(password, hashObj.hash);
        return result;
    },
    getUserBy: async (matchingObj) => {
        const user = await dataServices.findOne("users", matchingObj);
        return user;
    },
    addOrUpdateQuiz: (user, quiz) => {
        existingQuizIndex = user.quizzes.map(existingQuiz => existingQuiz.id).indexOf(quiz.id)
        if (existingQuizIndex === -1) {
            user.quizzes.push(quiz);
        } else {
            user.quizzes[existingQuizIndex] = quiz;
        }
    },
    addOrUpdateStudent: (user, student) => {
        const existingStudentIndex = user.students.map(student=>student.id).indexOf(student.id)
        if (existingStudentIndex === -1){
            user.students.push(student)
        } else {
            user.students[existingStudentIndex] = student;
        }
    }
}