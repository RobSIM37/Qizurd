import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card,Container,Typography,Box,IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { fillStudentForm,deleteStudent } from "../../state/action-builder"

//feed this component a list of students.
//TODO
//still needs filter logic

const StudentList = (props) => {
    const navigate = useNavigate()

    const deleteStudentClickHandler = (e) => {
        const {id} = e.target 
        props.deleteStudent({userId:props.user.id,studentId:id})
        e.stopPropagation()
    }

    const clickHandlerControl = (e) => {
        const {id} = e.target
        switch(props.clickHandlerid){
            case "editStudent":
                console.log("hits this")
                const selectedStudent = props.user.students.filter(el => el.id === id)[0]
                props.fillStudentForm(selectedStudent)
                navigate("/student/create-student")
                break
            default:

        }
    }

    return(
        <Container align="center">
            {props.clickHandlerid === "editStudent" && <Typography sx={{marginTop:"1rem"}} fontSize="2rem">Edit a Student</Typography>}
            {props.user.students.map(el => {return (
                <Box mt={2} mb={2}>
                    <Card sx={{display:"flex",flexDirection:"row",cursor:"pointer"}} id={el.id} onClick={clickHandlerControl}>
                        <Typography sx={{pointerEvents:"none",width:"90%"}} mt={1} mb={1} fontSize="1.5rem">{el.firstName + " " + el.lastName}</Typography>
                        {props.clickHandlerid === "editStudent" && 
                            <IconButton id={el.id} onClick={deleteStudentClickHandler}>
                                <DeleteIcon sx={{pointerEvents:"none"}}/>
                            </IconButton>}
                    </Card>
                </Box>)})}
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps,{fillStudentForm,deleteStudent})(StudentList)