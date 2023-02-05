import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StudentContainer,StudentCard } from "./studentStyles";
import { fillStudentForm } from "../../state/action-builder"

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
                props.deleteStudent(id)
                navigate("/quizzes")
                break
            default:

        }
    }

    return(
        <StudentContainer>
            {props.clickHandlerid === "deleteStudent" && <div>Delete a Student</div>}
            {props.clickHandlerid === "deleteStudent" && props.user.students.map(el => {return <StudentCard id={el.id}
            onClick={clickHandlerControl}>{el.firstName + " " + el.lastName}</StudentCard>})}

            {props.clickHandlerid === "editStudent" && <div>Edit a Student</div>}
            {props.clickHandlerid === "editStudent" && props.user.students.map(el => {return <StudentCard id={el.id}
            onClick={clickHandlerControl}>{el.firstName + " " + el.lastName}</StudentCard>})}
        </StudentContainer>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps,{fillStudentForm})(StudentList)