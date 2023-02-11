import React from "react"
import {connect} from "react-redux"
import {Card,Typography,TextField,IconButton,Container,Box} from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { deleteQuestionFromQuiz,editQuizQuestion } from "../../state/action-builder";

const FormQuestion = (props) => {
    
    // classnames got fucked, use question index to fix this.
    const questionInputChangeHandler = (e) => {
        const {id,className,value} = e.target
        const inputType = className.split(" ")[2]
        console.log(className)
        props.editQuizQuestion(id,inputType,value)
    }

    const closeClickHandler = (e) => {
        const {id} = props
        props.deleteQuestionFromQuiz(id)
    }

    return(
    <Card sx={{width:"80%",margin:"2rem"}} elevation={12}>
        <Container align="right">
            <IconButton onClick={closeClickHandler}>
                <ClearIcon sx={{pointerEvents:"none"}}/>
            </IconButton>
        </Container>
        <Container align="center">
            <Box sx={{margin:"2rem",marginTop: "0px"}}>
                <Typography>Question {props.id + 1}:</Typography>
                <TextField id={props.id} key={"questionText"} className={"questionText"}
                value={props.question.questionText} onChange={questionInputChangeHandler}></TextField>
            </Box>
            <Box sx={{margin:"2rem"}}>
                <Typography>Answer:</Typography>
                <TextField id={props.id} key={"answer"} className={"answer"}
                value={props.question.answer} onChange={questionInputChangeHandler}></TextField>
            </Box>
        </Container>
    </Card>)
    }

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{deleteQuestionFromQuiz,editQuizQuestion})(FormQuestion)