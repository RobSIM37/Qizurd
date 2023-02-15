import React from "react" 
import { connect } from "react-redux"
import { Paper,Container,Button,Typography,TextField} from "@mui/material"
import { changeInputText,postStudent,clearStudentForm } from "../../state/action-builder"

const CreateStudent = (props) => {

    const studentNameChangeHandler = (e) => {
        const {id,value} = e.target
        props.changeInputText(id,value)
    }

    const studentFormSubmitHandler = (e) => {
        e.preventDefault()
        const {firstName,lastName,id} = props.studentForm
        const backendReq = {userId:props.user.id,firstName,lastName,id}
        props.postStudent(backendReq)
        props.clearStudentForm()
    }

    return( 
    <Container align="center">
        <Paper sx={{marginTop:2}} elevation={24}>
            <Typography fontSize="2rem">First name</Typography>
            <TextField size="small" id={"firstName"} value={props.studentForm.firstName} onChange={studentNameChangeHandler}/>

            <Typography fontSize="2rem">Last name</Typography>
            <TextField size="small" id={"lastName"} value={props.studentForm.lastName} onChange={studentNameChangeHandler}/>
            <Button sx={{margin:"2rem"}} variant="contained" onClick={studentFormSubmitHandler}>Submit Student</Button>
        </Paper>
    </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    studentForm: state.studentForm
})

export default connect(mapStateToProps,{changeInputText,postStudent,clearStudentForm})(CreateStudent)