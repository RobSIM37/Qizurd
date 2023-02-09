import React from "react" 
import { connect } from "react-redux"
import { FormContainer, LabelStyles, StudentFormStyles, InputBoxStyle } from "./formStyles"
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
    <FormContainer>
        <StudentFormStyles onSubmit={studentFormSubmitHandler}>

            <LabelStyles htmlFor="firstName">First name</LabelStyles>
            <InputBoxStyle id={"firstName"} value={props.studentForm.firstName} onChange={studentNameChangeHandler}/>

            <LabelStyles htmlFor="lastName">Last name</LabelStyles>
            <InputBoxStyle id={"lastName"} value={props.studentForm.lastName} onChange={studentNameChangeHandler}/>
        <button type="submit">Submit</button>
        </StudentFormStyles>
    </FormContainer>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    studentForm: state.studentForm
})

export default connect(mapStateToProps,{changeInputText,postStudent,clearStudentForm})(CreateStudent)