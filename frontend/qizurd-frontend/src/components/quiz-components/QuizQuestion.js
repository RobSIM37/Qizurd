import React, {useEffect} from "react"
import { connect } from "react-redux"
import { useNavigate,useParams } from "react-router"
import { Container,Paper,Typography,Divider,Button } from "@mui/material"
import { sendResult,getQuestion } from "../../state/action-builder"

const QuizQuestion = (props) => {

    const navigate = useNavigate()
    const {id,studentId} = useParams()
    const currentStudent = props.user.students.filter(student => student.id === studentId)[0]
    const currentCompletion = props.user.quizzes.filter(quiz => quiz.id === id)[0].students.filter(student => student.id === studentId)[0].completion

    useEffect(() => {
        if(currentCompletion >= 100){
            navigate("/quizzes")
        }
    },[currentCompletion,navigate])

    const backClickHandler = (e) => {
        navigate("/quizzes")
    }

    const submitResult = (e) => {
        let correct = false
        if(e.target.id === "correct"){
            correct = true
        }
        const objToSendResult = {
            userId:props.user.id,
            quizId:id,
            studentId:studentId,
            questionId:props.question.id,
            correct
        }
        const objToGetQuestion = {
            userId:props.user.id,
            quizId:id,
            studentId:studentId            
        }

        props.sendResult(objToSendResult)
        props.getQuestion(objToGetQuestion)
    }

    return(
        <Container align="center">
            <Paper sx={{marginTop:2}} elevation={24}>
                <Typography fontSize={"2rem"}>{currentStudent.firstName + " " + currentStudent.lastName}</Typography>
                <Divider/>
                <Typography fontSize={"2rem"}>Question:</Typography>
                <Divider/>
                <Typography fontSize={"1.2rem"}>{props.question.questionText}</Typography>
                <Divider/>
                <Typography fontSize={"2rem"}>Answer:</Typography>
                <Divider/>
                <Typography fontSize={"1.2rem"}>{props.question.answer}</Typography>
                <Divider/>
                <Container sx={{display:"flex",justifyContent:"space-around"}}>
                    <Button onClick={submitResult} id={"correct"} sx={{marginBottom:"1rem",marginTop:"1rem",width:"7rem"}} variant="contained">Correct</Button>
                    <Button onClick={submitResult} id={"incorrect"} sx={{marginBottom:"1rem",marginTop:"1rem",width:"7rem"}} variant="contained">Incorrect</Button>
                </Container>
                <Button onClick={backClickHandler} sx={{marginBottom:"1rem",marginTop:"1rem"}} variant="contained">Back</Button>
            </Paper>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    question: state.question
})

export default connect(mapStateToProps,{sendResult,getQuestion})(QuizQuestion)