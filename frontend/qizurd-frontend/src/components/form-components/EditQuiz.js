import React, {useState} from "react"
import FormQuestionList from "./FormQuestionList"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import FormStudentCard from "./FormStudentCard"
import { FormContainer,FormStyles,LabelStyles,InputBoxStyle} from "./formStyles"
// import { removeStudent } from "../../state/action-builder"

const EditQuiz = (props) => {

    const { id } = useParams()
    const selectedQuiz = props.quizzes.filter(el => el.id === parseInt(id) )[0]
    let [questionCounter,setQuestionCounter] = useState(0)
    let [addedStudents, setAddedStudents] = useState(selectedQuiz.students)

    const addQuestionClickHandler = () => {
        setQuestionCounter(questionCounter += 1)
    }
    
    const optionClickHandler = (e) => {
        const {id,value} = e.target
        setAddedStudents([...addedStudents,{id,value}])
        props.removeStudent(id)
    }

    return(
        <FormContainer>
            <FormStyles>
                <LabelStyles htmlFor={"quizTitle"}>Quiz Title</LabelStyles>
                <InputBoxStyle id={"quizTitle"} value={selectedQuiz.quizTitle}></InputBoxStyle>
                <LabelStyles htmlFor={"quizDescription"}>Quiz Description</LabelStyles>
                <InputBoxStyle id={"quizDescription"} value={selectedQuiz.description}></InputBoxStyle>
                {questionCounter !== 0 && <FormQuestionList questionCounter={questionCounter}></FormQuestionList>}
                <button type="button" onClick={addQuestionClickHandler}>Add a question</button>
                {addedStudents.map(el => {return <FormStudentCard addedStudents={addedStudents} setAddedStudents={setAddedStudents} id={el.id} key={el.id}>{el.name}</FormStudentCard>})}
                <select value={0}>
                    <option value={0}>--Select Student--</option>
                    {selectedQuiz.students.map(el => {return <option id={el.id} key={el.id} value={el.name} onClick={optionClickHandler}>{el.name}</option>})}
                </select>
            </FormStyles>    
        </FormContainer>
    )
}

const mapStateToProps = state => ({
    quizzes: state.quizzes
})

export default connect(mapStateToProps,{})(EditQuiz)