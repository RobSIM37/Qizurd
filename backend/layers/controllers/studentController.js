const studentServices = require("../services/studentServices");
const userServices = require("../services/userServices");

module.exports = {
   addOrUpdateStudent: (req, res) => {
      const reqData = req.body;
      try {
         console.log("reqData:",reqData)
         const addedStudent = studentServices.addOrUpdateStudent(reqData.userId, reqData)
         if (addedStudent) {
            const updatedUser = userServices.getUserBy("_id",reqData.userId);
            res.status(200).send(updatedUser.export());
         } else {
            res.status(400).send({message:"unable to add student with information provided"});
         }
      } catch(err) {
         console.log(err)
         res.status(500).send({message:"an unknown server error has prevented this transaction"});
      }
   },

   deleteStudent: (req, res) => {
      const userId = req.params.userId;
      const studentId = req.params.studentId;
      try {
         const removedStudent = studentServices.deleteStudent(userId, studentId);
         if (removedStudent) {
            const updatedUser = userServices.getUserBy("_id",userId);
            res.status(200).send(updatedUser.export());
         } else {
            res.status(400).send({message:"unable to delete student with information provided"});
         }
      } catch {
         res.status(500).send({message:"an unknown server error has prevented this transaction"});
      }
   },

   allStudents: (req, res) => {
      const userId = req.params.userId;
      try {
         const students = studentServices.getAllStudents(userId);
         if (students) {
            res.status(200).send(students.map(student => student.export()));
         } else {
            res.status(400).send({message:"unable to get students with information provided"});
         }
      } catch {
         res.status(500).send({message:"an unknown server error has prevented this transaction"});
      }
   },

   logStudentAnswer: (req,res) => {
      const {userId, quizId, questionId, studentId, correct} = req.body;
      try {
         const loggedAnswer = studentServices.logStudentAnswer(userId, studentId, quizId, questionId, correct);
         if (loggedAnswer) {
            const user = userServices.getUserBy("_id",userId);
            res.status(200).send(user.export());
         } else {
            res.status(400).send({message:"unable to log answer with information provided"});
         }
      } catch (err) {
         res.status(500).send(err);
      }
   }
}