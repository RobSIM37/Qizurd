import React from "react";
import { StudentContainer,StudentCard } from "./studentStyles";

const StudentList = (props) => {
    return(
        <StudentContainer>
            {props.quiz.students.map(el => {return <StudentCard>{el.name}</StudentCard>})}
        </StudentContainer>
    )
}

export default StudentList