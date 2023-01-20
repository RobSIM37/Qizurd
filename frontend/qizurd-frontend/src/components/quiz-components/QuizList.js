import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { cardClicked } from "../../state/action-builder"
import QuizCard from "./QuizCard"

const QuizContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const QuizList = (props) => {

    const quizCardClickHandler = (e) => {
        props.cardClicked(e.target.id)
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