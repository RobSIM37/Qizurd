import React from "react"
import styled from "styled-components"

const QuizDetailsStyles = styled.div`
display:flex;
flex-direction:column;
justify-content: space-around;
align-items:center;
text-align:center;
background-color: orange;
width: 80vw;
height: 3rem;
padding: 1rem;
margin: 1rem;
border-radius: 10px;
box-shadow: 5px 5px 1px black;
cursor:pointer;
`

const QuizDetails = (props) => {
    return(
        <QuizDetailsStyles>
            {props.quiz.quizTitle}
        </QuizDetailsStyles>
    )
    
}

export default QuizDetails