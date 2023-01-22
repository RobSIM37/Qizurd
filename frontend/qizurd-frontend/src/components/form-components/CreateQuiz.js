import React, {useState} from "react"
import FormQuestionList from "./FormQuestionList"
import { connect } from "react-redux"
import { FormContainer,FormStyles,LabelStyles,InputBoxStyle,FormStudentCard} from "./formStyles"

const CreateQuiz = (props) => {

    let [questionCounter,setQuestionCounter] = useState(0)
    let [addedStudents, setAddedStudents] = useState([])

    const addQuestionClickHandler = () => {
        setQuestionCounter(questionCounter += 1)
    }
    
    const optionClickHandler = (e) => {
        const {id,value} = e.target
        setAddedStudents([...addedStudents,<FormStudentCard id={id} key={id}>{value}</FormStudentCard>])
    }

    return(
    <FormContainer>
        <FormStyles>
            <LabelStyles htmlFor={"quizTitle"}>Quiz Title</LabelStyles>
            <InputBoxStyle id={"quizTitle"}></InputBoxStyle>
            <LabelStyles htmlFor={"quizDescription"}>Quiz Description</LabelStyles>
            <InputBoxStyle id={"quizDescription"}></InputBoxStyle>
            {questionCounter !== 0 && <FormQuestionList questionCounter={questionCounter}></FormQuestionList>}
            <button type="button" onClick={addQuestionClickHandler}>Add a question</button>
            {addedStudents}
            <select value={0}>
                <option value={0}>--Select Student--</option>
                {props.userStudentList.map(el => {return <option id={el.id} key={el.id} value={el.name} onClick={optionClickHandler}>{el.name}</option>})}
            </select>
        </FormStyles>    
    </FormContainer>
    )
}

const mapStateToProps = state => ({
    userStudentList: state.students
})

export default connect(mapStateToProps,null)(CreateQuiz)