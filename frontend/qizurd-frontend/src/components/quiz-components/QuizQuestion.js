import React from "react"
import { connect } from "react-redux"
import { useNavigate,useParams } from "react-router"
import { Container,Paper,Typography,Divider,Button } from "@mui/material"
import { sendResult } from "../../state/action-builder"

const QuizQuestion = (props) => {

    
    const navigate = useNavigate()
    const {id,studentId} = useParams()

    const interruptedClickHandler = (e) => {
        navigate("/quizzes")
    }

    const submitResult = (e) => {
        let correct = false
        if(e.target.id === "correct"){
            correct = true
        }
        const objToSend = {
            userId:props.user.id,
            quizId:id,
            studentId:studentId,
            questionId:props.question.id,
            correct
        }
        props.sendResult(objToSend)
    }

    return(
        <Container align="center">
            <Paper sx={{marginTop:2}} elevation={24}>
                <Typography fontSize={"2rem"}>Question:</Typography>
                <Divider/>
                <Typography fontSize={"1.2rem"}>{props.question.questionText}</Typography>
                <Divider/>
                <Typography fontSize={"2rem"}>Answer:</Typography>
                <Divider/>
                <Typography fontSize={"1.2rem"}>{props.question.answer}</Typography>
                <Divider/>
                <Container sx={{display:"flex",justifyContent:"space-around"}}>
                    <Button onClick={submitResult} id={"correct"} sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Correct</Button>
                    <Button onClick={submitResult} id={"incorrect"} sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Incorrect</Button>
                    <Button onClick={interruptedClickHandler} sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Interrupted</Button>
                </Container>
            </Paper>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    question: state.question
})

export default connect(mapStateToProps,{sendResult})(QuizQuestion)