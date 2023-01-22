import styled from "styled-components"

export const FormContainer = styled.div`
display: flex;
width: 100vw;
flex-direction: column;
align-items: center;
`

export const FormStyles = styled.form`
display:flex;
flex-direction:column;
justify-content: space-around;
align-items:center;
background-color: orange;
width: 80vw;
padding: 1rem;
margin: 1rem;
border-radius: 10px;
box-shadow: 5px 5px 1px black;
cursor:pointer;
`

export const LabelStyles = styled.label`
font-size: 1.5rem;
`

export const FormStudentCard = styled.div`
display:flex;
justify-content: center;
align-items:center;
background-color: green;
width: 80%;
height: 1rem;
padding: 1rem;
margin: .5rem;
border-radius: 10px;
box-shadow: 5px 5px 1px black;
cursor:pointer;
`

export const InputBoxStyle = styled.input`
${props => props.id === "quizDescription" ? `width: 80%;` : null}
${props => props.id === "quizDescription" ? `height: 3rem;` : null}
`