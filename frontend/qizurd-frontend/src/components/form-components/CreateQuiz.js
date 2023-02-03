import React, {useState} from "react"
import { connect } from "react-redux"
import FormStudentCard from "./FormStudentCard"
import FormQuestionCard from "./FormQuestionCard"
import { FormContainer,FormStyles,LabelStyles,InputBoxStyle} from "./formStyles"
import { changeQuizText,editQuizQuestion,addQuizQuestion,addStudentToQuiz } from "../../state/action-builder"

const CreateQuiz = (props) => {

    let [selectedStudents, setSelectedStudents] = useState(props.quiz.students)

    const addQuestionClickHandler = () => {
        props.addQuizQuestion()
    }

    const questionInputChangeHandler = (e) => {
        const {id,className,value} = e.target
        const inputType = className.split(" ")[2]
        props.editQuizQuestion(id,inputType,value)
    }
        
    const optionClickHandler = (e) => {
        const selectedStudent = props.userStudents.filter(el => e.target.id === el.id)[0]
        setSelectedStudents([...selectedStudents,selectedStudent])
        props.addStudentToQuiz(selectedStudent)
    }

    const inputChangeHandler = (e) => {
        props.changeQuizText(e.target.id,e.target.value)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        console.log(props.quiz)
    }

    return(
    <FormContainer>
        <FormStyles onSubmit={formSubmitHandler}>
            <LabelStyles htmlFor={"quizTitle"}>Quiz Title</LabelStyles>
            <InputBoxStyle id={"quizTitle"} value={props.quiz.quizTitle} onChange={inputChangeHandler}/>

            <LabelStyles htmlFor={"description"}>Quiz Description</LabelStyles>
            <InputBoxStyle className={"bigInput"} id={"description"} onChange={inputChangeHandler}/>

            {props.quiz.questions.map((el,index) =>
                {return <FormQuestionCard key={index} id={index} 
                question={el} questionInputChangeHandler={questionInputChangeHandler}></FormQuestionCard>})
            }

            <button type="button" onClick={addQuestionClickHandler}>Add a question</button>

            {selectedStudents.map(el => 
                {return <FormStudentCard selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} id={el.id} key={el.id}>{el.name}</FormStudentCard>})}

            <select value={0}>
                <option value={0}>--Select Student--</option>
                {props.userStudents
                    .filter(el => selectedStudents.map(el => el.id)
                    .includes(el.id) === false)
                    .map(el => 
                    {return <option onClick={optionClickHandler} key={el.name} id={el.id}>{el.name}</option>})}
            </select>
            <button type="submit">Submit</button>

            
        </FormStyles>    
    </FormContainer>
    )
}

const mapStateToProps = state => ({
    quiz: state.quizForm,
    userStudents: state.userStudents
})

export default connect(mapStateToProps,{changeQuizText,editQuizQuestion,addQuizQuestion,addStudentToQuiz})(CreateQuiz)