import React from "react"
import styled from "styled-components"
import QuizQuestion from "./QuizQuestion"

const QuizDetailsStyles = styled.div`
display:flex;
flex-direction:column;
justify-content: space-around;
align-items:center;
text-align:center;
background-color: orange;
width: 80vw;
padding: 1rem;
margin: 1rem;
border-radius: 10px;
box-shadow: 5px 5px 1px black;
cursor:pointer;
`

const TitleStyle = styled.h1`
font-size: 1rem;
`

const QuizContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Bar = styled.div`
height:1px;
width:100%;
background-color:black;
`

const DescriptionStyle = styled.div`
margin:1rem;
`

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
        </QuizContainer>
        )
    
}

export default QuizDetails