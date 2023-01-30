import React, {useState} from "react"
import axios from "axios"
import FormQuestionList from "./FormQuestionList"
import { connect } from "react-redux"
import FormStudentCard from "./FormStudentCard"
import { FormContainer,FormStyles,LabelStyles,InputBoxStyle} from "./formStyles"
import { changeQuizText } from "../../state/action-builder"

const CreateQuiz = (props) => {

    let [questionCounter,setQuestionCounter] = useState(0)
    let [addedStudents, setAddedStudents] = useState([])
    let [selectedStudents, setSelectedStudents] = useState(props.quiz.students)

    const addQuestionClickHandler = () => {
        setQuestionCounter(questionCounter += 1)
    }
    
    const optionClickHandler = (e) => {
        axios.get(`http://localhost:8025/students/${e.target.id}`).then(res => {
        setSelectedStudents(selectedStudents.push(res.data))
    })
        props.removeStudent(e.target.id)
    }

    const inputChangeHandler = (e) => {
            props.changeQuizText(e.target.id,e.target.value)
        }
    

    return(
    <FormContainer>
        <FormStyles>
            <LabelStyles htmlFor={"quizTitle"}>Quiz Title</LabelStyles>
            <InputBoxStyle id={"quizTitle"} value={props.quiz.quizTitle} onChange={inputChangeHandler}/>
            <LabelStyles htmlFor={"description"}>Quiz Description</LabelStyles>
            <InputBoxStyle id={"description"} onChange={inputChangeHandler}/>
            {questionCounter !== 0 && <FormQuestionList questionCounter={questionCounter}></FormQuestionList>}
            <button type="button" onClick={addQuestionClickHandler}>Add a question</button>
            {addedStudents.map(el => {return <FormStudentCard addedStudents={addedStudents} setAddedStudents={setAddedStudents} id={el.id} key={el.id}>{el.value}</FormStudentCard>})}
            <select value={0}>
                <option value={0}>--Select Student--</option>
                {props.userStudents.map(el => {return <option onClick={optionClickHandler} key={el.name} id={el.id}>{el.name}</option>})}
            </select>
        </FormStyles>    
    </FormContainer>
    )
}

const mapStateToProps = state => ({
    quiz: state.quizForm,
    userStudents: state.userStudents
})

export default connect(mapStateToProps,{changeQuizText})(CreateQuiz)