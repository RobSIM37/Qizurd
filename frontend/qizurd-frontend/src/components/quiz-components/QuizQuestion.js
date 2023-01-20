import React from "react"
import styled from "styled-components"

const AnswerContainer = styled.div`
display:flex;
flex-wrap:wrap;
`

const AnswerWrapper = styled.div`
width:40%;
margin:5%;
`

const TitleStyle = styled.h1`
font-size: 1rem;
`

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