import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router"
import { Container,Paper,Typography,Divider,Button } from "@mui/material"

const QuizQuestion = (props) => {

    const navigate = useNavigate()

    const interruptedClickHandler = (e) => {
        navigate("/quizzes")
    }

    const submitResult = (e) => {
        
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
                    <Button sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Correct</Button>
                    <Button sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Incorrect</Button>
                    <Button onClick={interruptedClickHandler} sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Interrupted</Button>
                </Container>
            </Paper>
        </Container>
    )
}

const mapStateToProps = state => ({
    question: state.question
})

export default connect(mapStateToProps,{})(QuizQuestion)