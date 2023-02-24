import React,{useState,useEffect} from "react" 
import { connect } from "react-redux"
import { useNavigate } from "react-router"
import { Paper,Container,Button,Typography,TextField} from "@mui/material"
import { studentFormSchema } from "../../validation/validations"
import { changeInputText,postStudent,clearStudentForm } from "../../state/action-builder"

const CreateStudent = (props) => {

    const navigate = useNavigate()
    
    let [isValid,setIsValid] = useState(false)

    useEffect(() => {
        const studentFormObject = {
            firstName: props.studentForm.firstName,
            lastName: props.studentForm.lastName
        }
        studentFormSchema.isValid(studentFormObject).then(res => {
            setIsValid(res)
        })
    },[props.studentForm])

    const studentNameChangeHandler = (e) => {
        const {id,value} = e.target
        props.changeInputText(id,value)
    }

    const studentFormSubmitHandler = (e) => {
        e.preventDefault()
        const {firstName,lastName,id} = props.studentForm
        let studentResultsArr = []
        if(id){
            studentResultsArr = props.user.students.filter(student => student.id === id)[0].results
        }
        const backendReq = {userId:props.user.id,firstName,lastName,id,results:studentResultsArr}
        props.postStudent(backendReq)
        props.clearStudentForm()
        navigate("/quizzes")
    }

    return( 
    <Container align="center">
        <Paper sx={{marginTop:2}} elevation={24}>
            <Typography fontSize="2rem">First name</Typography>
            <TextField sx={{width:"80%"}} multiline id={"firstName"} value={props.studentForm.firstName} onChange={studentNameChangeHandler}/>

            <Typography fontSize="2rem">Last name</Typography>
            <TextField sx={{width:"80%",marginRight:"1rem",marginLeft:"1rem"}} multiline id={"lastName"} value={props.studentForm.lastName} onChange={studentNameChangeHandler}/>
            <Button disabled={!isValid} sx={{margin:"2rem"}} variant="contained" onClick={studentFormSubmitHandler}>Submit Student</Button>
        </Paper>
    </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    studentForm: state.studentForm
})

export default connect(mapStateToProps,{changeInputText,postStudent,clearStudentForm})(CreateStudent)