import React from "react"
import { AnswerContainer,AnswerWrapper,TitleStyle } from "./quizStyles"

const QuizQuestion = (props) => {
    return(
        <div>
            <TitleStyle>{props.question.question}</TitleStyle>
            <AnswerContainer>
                <AnswerWrapper>{props.question.answer1}</AnswerWrapper>
                <AnswerWrapper>{props.question.answer2}</AnswerWrapper>
                <AnswerWrapper>{props.question.answer3}</AnswerWrapper>
                <AnswerWrapper>{props.question.answer4}</AnswerWrapper>
            </AnswerContainer>
        </div>
    )
}

export default QuizQuestion