import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

const QuizCard = styled.div`

`

const QuizList = (props) => {
    return(
        props.quizzes.map( el => {
            return <div>{el.quizTitle}</div>
        })
    )
}

const mapStateToProps = state => ({
    quizzes: state.quizzes
})

//insert actions into empty object
export default connect(mapStateToProps,null)(QuizList)