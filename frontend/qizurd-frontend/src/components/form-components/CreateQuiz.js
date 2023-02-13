import React from "react"
import { connect } from "react-redux"
import FormStudentCard from "./FormStudentCard"
import FormQuestionCard from "./FormQuestionCard"
import { Container,Paper,Typography,TextField,Fab,Button,List } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
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
        props.postQuiz(quizToAdd)
        props.clearQuizForm()
    }

    return(
    <Container align="center">
        <Paper color="secondary" elevation={24}>

                {/* Quiz title and description */}
                <Typography fontSize="2rem">Quiz Title</Typography>
                <TextField variant="filled" sx={{marginLeft:"1rem",marginRight:"1rem"}} id={"quizTitle"} value={props.quiz.quizTitle} onChange={inputChangeHandler}/>

                <Typography fontSize="2rem">Quiz Description</Typography>
                <TextField variant="filled" sx={{marginLeft:"1rem",marginRight:"1rem"}} id={"description"} value={props.quiz.description} onChange={inputChangeHandler}/>

                {/* Question list generator */}
                <Typography fontSize="2rem">Questions</Typography>
                {props.quiz.questions.map((el,index) =>
                    {return <FormQuestionCard index={index} id={""+el.renderId} key={el.renderId} 
                    question={el}></FormQuestionCard>})
                }

                {/* Add question button */}
                <Fab sx={{margin:"2rem"}} color="primary" onClick={addQuestionClickHandler}>
                    <AddIcon/>
                </Fab>

                {/* Student select list and Student selected list */}
                <Typography fontSize="2rem">Students</Typography>
                <TextField sx={{marginLeft:"3rem",marginRight:"3rem"}} select value={0}>
                    <option value={0}>Add Student</option>
                    {props.user.students
                        .filter(el => props.quiz.students.map(el => el.id)
                        .includes(el.id) === false)
                        .map(el => 
                        {return <option onClick={optionClickHandler} key={el.id} id={el.id}>{el.firstName + " " + el.lastName}</option>})}
                </TextField>

                <List>
                    {props.quiz.students.map(el => 
                        {return <FormStudentCard id={el.id} key={el.id}>{el.firstName + " " + el.lastName}</FormStudentCard>})}
                </List>

                {/* Button to create/edit quiz */}
                <Button sx={{margin:"2rem"}}variant="contained" onClick={formSubmitHandler}>Create Quiz</Button>
        </Paper>    
    </Container>
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