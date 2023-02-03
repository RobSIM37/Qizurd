import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StudentContainer,StudentCard } from "./studentStyles";

//feed this component a list of students.
//TODO
//still needs filter logic

const StudentList = (props) => {

    const navigate = useNavigate()

    const clickHandlerControl = (e) => {
        switch(props.clickHandlerid){
            case "deleteStudent":
                props.deleteStudent(e.target.id)
                navigate("/quizzes")
                break
            default:

        }
    }

    return(
        <StudentContainer>
            {props.clickHandlerid === "deleteStudent" && <div>Delete a Student</div>}
            {props.quiz && props.quiz.students.map(el => {return <StudentCard>{el.name}</StudentCard>})}
            {props.clickHandlerid === "deleteStudent" && props.userStudents.map(el => {return <StudentCard id={el.id} onClick={clickHandlerControl}>{el.name}</StudentCard>})}
        </StudentContainer>
    )
}

const mapStateToProps = state => ({
    userStudents: state.students
})

export default connect(mapStateToProps,{})(StudentList)