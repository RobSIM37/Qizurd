import React from "react"
import { connect } from "react-redux"
import FormStudentCard from "./FormStudentCard"
import FormQuestionCard from "./FormQuestionCard"
import { FormContainer,FormStyles,LabelStyles,InputBoxStyle} from "./formStyles"
import { 
    postQuiz,
    changeQuizText,
    editQuizQuestion,
    addQuizQuestion,
    addStudentToQuiz,
    clearQuizForm } from "../../state/action-builder"

const CreateQuiz = (props) => {

    const addQuestionClickHandler = () => {
        props.addQuizQuestion()
    }

    const questionInputChangeHandler = (e) => {
        const {id,className,value} = e.target
        const inputType = className.split(" ")[2]
        props.editQuizQuestion(id,inputType,value)
    }
        
    const optionClickHandler = (e) => {
        const selectedStudent = props.user.students.filter(el => e.target.id === el.id)[0]
        props.addStudentToQuiz(selectedStudent)
    }

    const inputChangeHandler = (e) => {
        props.changeQuizText(e.target.id,e.target.value)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        const {id,quizTitle,description,questions,students} = props.quiz
        const quizToAdd = {
            userId: props.user.id,
            id: id,
            quizTitle: quizTitle,
            description: description,
            questions: questions,
            students: students
        }
        console.log(quizToAdd)
        props.postQuiz(quizToAdd)
        props.clearQuizForm()
    }

    return(
    <FormContainer>
        <FormStyles onSubmit={formSubmitHandler}>
            <LabelStyles htmlFor={"quizTitle"}>Quiz Title</LabelStyles>
            <InputBoxStyle id={"quizTitle"} value={props.quiz.quizTitle} onChange={inputChangeHandler}/>

            <LabelStyles htmlFor={"description"}>Quiz Description</LabelStyles>
            <InputBoxStyle className={"bigInput"} id={"description"} value={props.quiz.description} onChange={inputChangeHandler}/>

            {props.quiz.questions.map((el,index) =>
                {return <FormQuestionCard key={index} id={index} 
                question={el} questionInputChangeHandler={questionInputChangeHandler}></FormQuestionCard>})
            }

            <button type="button" onClick={addQuestionClickHandler}>Add a question</button>

            {props.quiz.students.map(el => 
                {return <FormStudentCard id={el.id} key={el.id}>{el.firstName + " " + el.lastName}</FormStudentCard>})}

            <select value={0}>
                <option value={0}>--Select Student--</option>
                {props.user.students
                    .filter(el => props.quiz.students.map(el => el.id)
                    .includes(el.id) === false)
                    .map(el => 
                    {return <option onClick={optionClickHandler} key={el.id} id={el.id}>{el.firstName + " " + el.lastName}</option>})}
            </select>
            <button type="submit">Submit</button>

        </FormStyles>    
    </FormContainer>
    )
}

const mapStateToProps = state => ({
    quiz: state.quizForm,
    user: state.user,
})

export default connect(mapStateToProps,{
    postQuiz,
    changeQuizText,
    editQuizQuestion,
    addQuizQuestion,
    addStudentToQuiz,
    clearQuizForm})(CreateQuiz)