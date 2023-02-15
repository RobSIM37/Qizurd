import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card,Container,Typography,Box } from "@mui/material"
import { fillStudentForm,deleteStudent } from "../../state/action-builder"

//feed this component a list of students.
//TODO
//still needs filter logic

const StudentList = (props) => {
    const navigate = useNavigate()

    const clickHandlerControl = (e) => {
        const {id} = e.target
        switch(props.clickHandlerid){
            case "editStudent":
                const selectedStudent = props.user.students.filter(el => el.id === id)[0]
                props.fillStudentForm(selectedStudent)
                navigate("/student/create-student")
                break
            case "deleteStudent":
                props.deleteStudent({userId:props.user.id,studentId:id})
                navigate("/quizzes")
                break
            default:

        }
    }

    return(
        <Container align="center">
            {props.clickHandlerid === "deleteStudent" && <Typography fontSize="2rem">Delete a Student</Typography>}
            {props.clickHandlerid === "editStudent" && <Typography fontSize="2rem">Edit a Student</Typography>}
            {props.user.students.map(el => {return (
                <Box mt={2} mb={2}>
                    <Card id={el.id} onClick={clickHandlerControl}>
                        <Typography sx={{pointerEvents:"none"}} mt={1} mb={1} fontSize="1.5rem">{el.firstName + " " + el.lastName}</Typography>
                    </Card>
                </Box>)})}
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps,{fillStudentForm,deleteStudent})(StudentList)