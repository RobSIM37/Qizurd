import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cardClicked } from "../../state/action-builder"
import {QuizCard,QuizContainer} from "./quizStyles"

const QuizList = (props) => {
    
    const navigate = useNavigate();

    const quizCardClickHandler = (e) => {
        navigate(`/quizzes/${e.target.id}`)
    }

    return(
        <QuizContainer>
            {props.quizzes.map( el => {
                return <QuizCard id={el.id} key={el.id} onClick={quizCardClickHandler}>
                    {el.quizTitle}
                </QuizCard>
            })}
        </QuizContainer>
    )
}

const mapStateToProps = state => ({
    quizzes: state.quizzes
})

//insert actions into empty object
export default connect(mapStateToProps,{cardClicked})(QuizList)