import React from "react"
import { connect } from "react-redux"
import { CircularProgress,Container,Paper,Typography,Divider,Card } from "@mui/material"
import { useParams,useNavigate } from "react-router"
import { getQuestion } from "../../state/action-builder"

const QuizDetails = (props) => {

    const {id} = useParams()
    const selectedQuiz = props.user.quizzes.filter(quiz => quiz.id === id)[0]
    const navigate = useNavigate()

    const askStudentQuestion = (e) => {
        props.getQuestion({userId:props.user.id,quizId:id,studentId:e.target.id})
        navigate(`/quizzes/${id}/${e.target.id}`)
    } 

    return(
            <Container align="center">
                <Paper sx={{marginTop:2}} elevation={24}>
                    <Typography fontSize={"2rem"}>{selectedQuiz.quizTitle}</Typography>
                    <Divider/>
                    <Typography fontSize={"1.2rem"}>{selectedQuiz.description}</Typography>
                    <Divider/>
                    {selectedQuiz.students.map(student => {return(
                        <>
                        <Card onClick={askStudentQuestion} id={student.id} sx={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                            <Typography sx={{pointerEvents:"none"}} mt={1} mb={1} fontSize="1.5rem">
                            {student.firstName + " " + student.lastName}
                            </Typography>
                            <CircularProgress size={student.completion} variant="determinate" value={25} color={"primary"}/>
                        </Card>
                        <Divider/>
                        </>
                    )})}
                </Paper>
            </Container>
        )
    
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps,{getQuestion})(QuizDetails)