import React from "react"
import { useNavigate } from "react-router"
import { connect } from "react-redux"
import { Card,Container,Typography,Box,IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteQuiz,fillQuizForm } from "../../state/action-builder"

const QuizList = (props) => {

    const navigate = useNavigate()
    
    const deleteQuizClickHandler = (e) => {
        const {id} = e.target
        props.deleteQuiz({userId:props.user.id,quizId:id})
        e.stopPropagation()
    }

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
            default:
        }
    }



    return(
        <Container align="center">
            {props.clickHandlerid === "showDetails" && <Typography sx={{marginTop:"1rem"}} fontSize="2rem">Quizzes</Typography>}
            {props.clickHandlerid === "editQuiz" && <Typography sx={{marginTop:"1rem"}} fontSize="2rem">Edit Quiz</Typography>}
            {props.user.quizzes.map( el => {return (
                <Box mt={2} mb={2}>
                    <Card sx={{display:"flex",flexDirection:"row",alignItems:"center",cursor:"pointer"}} id={el.id} key={el.id} onClick={clickHandlerControl}>
                        <Typography sx={{pointerEvents:"none",width:"100%"}} mt={1} mb={1} fontSize="1.5rem">{el.quizTitle}</Typography>
                        {props.clickHandlerid === "editQuiz" && 
                            <IconButton id={el.id} onClick={deleteQuizClickHandler}>
                                <DeleteIcon sx={{pointerEvents:"none"}}/>
                            </IconButton>}
                    </Card>
                </Box>
            )})}
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps,{deleteQuiz,fillQuizForm})(QuizList)