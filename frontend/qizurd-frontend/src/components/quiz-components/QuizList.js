import React from "react"
import { useNavigate } from "react-router"
import { connect } from "react-redux"
import { Card,Container,Typography,Box } from "@mui/material"
import { deleteQuiz,fillQuizForm } from "../../state/action-builder"

const QuizList = (props) => {

    const navigate = useNavigate()

    const clickHandlerControl = (e) => {
        const {id} = e.target
        switch(props.clickHandlerid){
            case "showDetails":
                navigate(`/quizzes/${id}`)
                break
            case "editQuiz":
                const selectedQuiz = props.user.quizzes.filter( el => el.id === id)[0]
                console.log(selectedQuiz)
                props.fillQuizForm(selectedQuiz)
                navigate(`/quiz/create-quiz`)
                break
            case "deleteQuiz":
                props.deleteQuiz({userId:props.user.id,quizId:id})
                navigate("/quizzes")
                break
            default:
        }
    }

    return(
        <Container align="center">
            {props.clickHandlerid === "showDetails" && <Typography>Quizzes</Typography>}
            {props.clickHandlerid === "editQuiz" && <Typography>Edit Quiz</Typography>}
            {props.clickHandlerid === "deleteQuiz" && <Typography>Delete a Quiz</Typography>}
            {props.user.quizzes.map( el => {return (
                <Box mt={2} mb={2}>
                    <Card id={el.id} key={el.id} onClick={clickHandlerControl}>
                        <Typography sx={{pointerEvents:"none"}} mt={1} mb={1} fontSize="1.5rem">{el.quizTitle}</Typography>
                    </Card>
                </Box>
            )})}
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

//insert actions into empty object
export default connect(mapStateToProps,{deleteQuiz,fillQuizForm})(QuizList)