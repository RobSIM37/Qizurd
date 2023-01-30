import React, {useState} from "react"
import FormQuestionList from "./FormQuestionList"
import { connect } from "react-redux"
import FormStudentCard from "./FormStudentCard"
import { FormContainer,FormStyles,LabelStyles,InputBoxStyle} from "./formStyles"
import { changeQuizText } from "../../state/action-builder"

const CreateQuiz = (props) => {

    let [questionCounter,setQuestionCounter] = useState(0)
    let [selectedStudents, setSelectedStudents] = useState(props.quiz.students)

    const addQuestionClickHandler = () => {
        setQuestionCounter(questionCounter += 1)
    }
    
    const optionClickHandler = (e) => {
        const selectedStudent = props.userStudents.filter(el => e.target.id === el.id)[0]
        setSelectedStudents([...selectedStudents,selectedStudent])
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
            {selectedStudents.map(el => {return <FormStudentCard selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} id={el.id} key={el.id}>{el.name}</FormStudentCard>})}
            <select value={0}>
                <option value={0}>--Select Student--</option>
                {props.userStudents
                    .filter(el => selectedStudents.map(el => el.id)
                    .includes(el.id) === false)
                    .map(el => 
                    {return <option onClick={optionClickHandler} key={el.name} id={el.id}>{el.name}</option>})}
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