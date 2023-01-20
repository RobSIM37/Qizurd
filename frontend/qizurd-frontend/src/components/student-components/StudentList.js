import React from "react";
import { StudentContainer,StudentCard } from "./studentStyles";

//feed this component a list of students.
//TODO
//still needs filter logic

const StudentList = (props) => {
    return(
        <StudentContainer>
            {props.quiz.students.map(el => {return <StudentCard>{el.name}</StudentCard>})}
        </StudentContainer>
    )
}

export default StudentList