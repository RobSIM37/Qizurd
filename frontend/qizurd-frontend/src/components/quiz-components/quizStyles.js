import styled from "styled-components"

export const QuizContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

export const QuizCard = styled.div`
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

export const QuizDetailsStyles = styled.div`
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

export const TitleStyle = styled.h1`
font-size: 1rem;
`

export const Bar = styled.div`
height:1px;
width:100%;
background-color:black;
`

export const DescriptionStyle = styled.div`
margin:1rem;
`

export const AnswerContainer = styled.div`
display:flex;
flex-wrap:wrap;
`

export const AnswerWrapper = styled.div`
width:40%;
margin:5%;
`
