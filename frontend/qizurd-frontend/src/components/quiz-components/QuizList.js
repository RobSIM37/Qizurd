import React,{useEffect} from "react"
import { useNavigate } from "react-router"
import { connect } from "react-redux"
import { Card,Container,Typography,Box,IconButton, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteQuiz,fillQuizForm,setActiveQuiz } from "../../state/action-builder"

const QuizList = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(props.user.activeQuiz && props.clickHandlerid !== "setActiveQuiz"){
            navigate(`/quizzes/${props.user.activeQuiz}`)
        }
    })
    
    const deleteQuizClickHandler = (e) => {
        const {id} = e.target
        props.deleteQuiz({userId:props.user.id,quizId:id})
        e.stopPropagation()
    }

    const createStudentClickHandler = (e) => {
        navigate("/student/create-student")
    }

    const createQuizClickHandler = (e) => {
        navigate("/quiz/create-quiz")
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
            case "setActiveQuiz":
                console.log("hits set quiz")
                if(!id){
                    props.setActiveQuiz(id)
                }else{
                    const selectedQuizId = props.user.quizzes.filter( el => el.id === id)[0].id
                    props.setActiveQuiz(selectedQuizId)                  
                }
                navigate("/quizzes")
                break
            default:
        }
    }

    return(
        <Container align="center">
            {props.clickHandlerid === "showDetails" && <Typography sx={{marginTop:"1rem"}} fontSize="2rem">Quizzes</Typography>}
            {props.clickHandlerid === "editQuiz" && <Typography sx={{marginTop:"1rem"}} fontSize="2rem">Edit Quiz</Typography>}
            {props.clickHandlerid === "setActiveQuiz" && 
                <Card onClick={clickHandlerControl} id="" sx={{marginTop:2,marginBottom:2}}>
                    <Typography fontSize="1.5rem" sx={{margin:".5rem",pointerEvents:"none"}}>None</Typography>
                </Card>}
            {props.user.students.length === 0 &&
                <Card sx={{marginTop:2,marginBottom:2}}>
                    <Typography fontSize="1.5rem" sx={{margin:".5rem"}}>You don't have any students!</Typography>
                    <Button onClick={createStudentClickHandler} variant="contained" sx={{margin:".5rem"}}>Create a student</Button>
                </Card>}
            {props.user.quizzes.length === 0 &&
                <Card sx={{marginTop:2,marginBottom:2}}>
                    <Typography fontSize="1.5rem" sx={{margin:".5rem"}}>You don't have any quizzes!</Typography>
                    <Button onClick={createQuizClickHandler} variant="contained" sx={{margin:".5rem"}}>Create a quiz</Button>
                </Card>}
            {props.user.quizzes.map( el => {return (
                <Box mt={2} mb={2}>
                    <Card sx={{display:"flex",flexDirection:"row",alignItems:"center",cursor:"pointer"}} id={el.id} key={el.id} onClick={clickHandlerControl}>
                        <Typography sx={{pointerEvents:"none",width:"100%"}} mt={1} mb={1} fontSize="1.5rem">{el.quizTitle}</Typography>
                        {props.clickHandlerid === "editQuiz" && 
                        <>
                            <IconButton id={el.id} onClick={deleteQuizClickHandler}>
                                <DeleteIcon sx={{pointerEvents:"none"}}/>
                            </IconButton>
                        </>}
                    </Card>
                </Box>
            )})}
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps,{deleteQuiz,fillQuizForm,setActiveQuiz})(QuizList)