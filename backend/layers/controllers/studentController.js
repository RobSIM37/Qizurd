const studentServices = require("../services/studentServices");
const data = require("../data/data");
const userServices = require("../services/userServices");

module.exports = {
   addOrUpdateStudent: (req, res) => {
      const reqData = req.body;
      if (data.isKnownId(reqData.userId)) {
         try {
            const addedStudent = studentServices.addOrUpdateStudent(reqData.userId, reqData)
            if (addedStudent) {
               const updatedUser = userServices.getUser(reqData.userId);
               res.status(200).send(updatedUser.export());
            } else {
               res.status(400).send({message:"unable to add student with information provided"});
            }
         } catch(err) {
            res.status(500).send({message:"an unknown server error has prevented this transaction"});
         }
      } else {
         res.status(400).send({message:"unable to add student with information provided"});
      }
   },

   deleteStudent: (req, res) => {
      const userId = req.params.userId;
      const studentId = req.params.studentId;
      if (data.isKnownId(reqData.userId)) {
         try {
            const removedStudent = studentServices.deleteStudent(userId, studentId);
            if (removedStudent) {
               const updatedUser = userServices.getUser(userId);
               res.status(200).send(updatedUser.export());
            } else {
               res.status(400).send({message:"unable to delete student with information provided"});
            }
         } catch {
            res.status(500).send({message:"an unknown server error has prevented this transaction"});
         }
      } else {
         res.status(400).send({message:"unable to delete student with information provided"});
      }
   },

   allStudents: (req, res) => {
      const userId = req.params.userId;
      if (data.isKnownId(reqData.userId)) {
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
      } else {
         res.status(400).send({message:"unable to get students with information provided"});
      }
   }
}