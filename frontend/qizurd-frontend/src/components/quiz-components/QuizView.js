import React from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import QuizDetails from "./QuizDetails"

const QuizView = (props) => {
    
    const { id } = useParams()
    const selectedQuiz = props.quizzes.filter(el => el.id === parseInt(id) )[0]
    
    return <QuizDetails quiz={selectedQuiz}/>
}

const mapStateToProps = state => ({
    quizzes: state.quizzes
})

export default connect(mapStateToProps,null)(QuizView)