import React from "react"
import {connect} from "react-redux"
import {Card,Typography,TextField,IconButton,Container,Box} from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { deleteQuestionFromQuiz,editQuizQuestion } from "../../state/action-builder";

const FormQuestion = (props) => {
    
    const questionInputChangeHandler = (e) => {
        const {id,name,value} = e.target
        props.editQuizQuestion(id,name,value)
    }

    const deleteQuestionClickHandler = (e) => {
        const {id} = e.target
        const intId = parseInt(id);
        props.deleteQuestionFromQuiz(intId);
    }

    return(
    <Card sx={{width:"80%",margin:"2rem"}} elevation={12}>
        <Container align="right">
            <IconButton id={props.id} onClick={deleteQuestionClickHandler}>
                <ClearIcon sx={{pointerEvents:"none"}}/>
            </IconButton>
        </Container>
        <Container align="center">
            <Box sx={{margin:"2rem",marginTop: "0px"}}>
                <Typography>Question {parseInt(props.index) + 1}:</Typography>
                <TextField id={props.id} name="questionText" value={props.question.questionText} onChange={questionInputChangeHandler}></TextField>
            </Box>
            <Box sx={{margin:"2rem"}}>
                <Typography>Answer:</Typography>
                <TextField id={props.id} name="answer" value={props.question.answer} onChange={questionInputChangeHandler}></TextField>
            </Box>
        </Container>
    </Card>)
    }

const mapStateToProps = state => ({
    quizForm: state.quizForm
})

export default connect(mapStateToProps,{deleteQuestionFromQuiz,editQuizQuestion})(FormQuestion)