import React from "react"
import { useNavigate } from "react-router"
import { connect } from "react-redux"
import {QuizCard,QuizContainer} from "./quizStyles"
import { deleteQuiz } from "../../state/action-builder"

const QuizList = (props) => {

    const navigate = useNavigate()

    const clickHandlerControl = (e) => {
        switch(props.clickHandlerid){
            case "showDetails":
                navigate(`/quizzes/${e.target.id}`)
                break
            case "editQuiz":
                navigate(`/quiz/edit-quiz/${e.target.id}`)
                break
            case "deleteQuiz":
                props.deleteQuiz(e.target.id)
                navigate("/quizzes")
                break
            default:
        }
    }

    return(
        <QuizContainer>
            {props.clickHandlerid === "showDetails" && <div>Quizzes</div>}
            {props.clickHandlerid === "editQuiz" && <div>Edit Quiz</div>}
            {props.clickHandlerid === "deleteQuiz" && <div>Delete a Quiz</div>}
            {props.user.quizzes.map( el => {
                return <QuizCard id={el.id} key={el.id} onClick={clickHandlerControl}>
                    {el.quizTitle}
                </QuizCard>
            })}
        </QuizContainer>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

//insert actions into empty object
export default connect(mapStateToProps,{deleteQuiz})(QuizList)