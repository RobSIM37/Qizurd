import React from "react"
import { useNavigate } from "react-router"
import { connect } from "react-redux"
import {QuizCard,QuizContainer} from "./quizStyles"
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
                props.deleteQuiz(id)
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
export default connect(mapStateToProps,{deleteQuiz,fillQuizForm})(QuizList)