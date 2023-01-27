import React from "react"
import QuizQuestion from "./QuizQuestion"
import StudentList from "../student-components/StudentList"
import {QuizDetailsStyles,TitleStyle,QuizContainer,Bar,DescriptionStyle} from "./quizStyles"

const QuizDetails = (props) => {
    return(
        <QuizContainer>
            <QuizDetailsStyles>
                <TitleStyle>{props.quiz.quizTitle}</TitleStyle>
                <Bar/>
                <DescriptionStyle>{props.quiz.description}</DescriptionStyle>
                <Bar/>
                <p>Questions:</p>
                {props.quiz.questions.map(question => {return <QuizQuestion question={question}/>})}
            </QuizDetailsStyles>
            <StudentList quiz={props.quiz}/>
        </QuizContainer>
        )
    
}

export default QuizDetails