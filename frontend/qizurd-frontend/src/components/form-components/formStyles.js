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
`

export const StudentFormStyles = styled.form`
display:flex;
flex-direction:column;
justify-content: space-around;
align-items:center;
background-color: green;
width: 80vw;
padding: 1rem;
margin: 1rem;
border-radius: 10px;
box-shadow: 5px 5px 1px black;
`

export const QuestionFormStyles = styled.div`
display:flex;
flex-direction:column;
justify-content: space-around;
align-items:center;
background-color: blue;
width: 80vw;
padding: 1rem;
margin: 1rem;
border-radius: 10px;
box-shadow: 5px 5px 1px black;
`

export const LabelStyles = styled.label`
font-size: 1.5rem;
`

export const FormStudentCardStyles = styled.div`
display:flex;
flex-direction: row-reverse;
align-items:center;
background-color: green;
width: 80%;
height: 2.5rem;
margin: .5rem;
border-radius: 10px;
box-shadow: 5px 5px 1px black;
cursor:pointer;
`

export const StudentCardText = styled.div`
display: flex;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
margin-left: 2rem;
`

export const CloseIconWrapper = styled.div`
display: flex;
justify-content: center;
align-items:center;
background-color: red;
border-radius: 50%;
margin-top: 1rem ;
margin-right: .5rem ;
margin-bottom: 1rem ;
font-size: 1.5rem;
`

export const InputBoxStyle = styled.input`
${props => props.className === "bigInput" ? `width: 80%;` : null}
${props => props.className === "bigInput" ? `height: 3rem;` : null}
`