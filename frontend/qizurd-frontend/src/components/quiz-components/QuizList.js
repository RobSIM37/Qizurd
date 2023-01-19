import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { cardClicked } from "../../state/action-builder"

const QuizContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const QuizCard = styled.div`
display:flex;
flex-direction:column;
justify-content: space-around;
align-items:center;
text-align:center;
background-color: orange;
width: 80vw;
height: 3rem;
padding: 1rem;
margin: 1rem;
border-radius: 10px;
box-shadow: 5px 5px 1px black;
${props => props.pressed ? 'box-shadow: inset 5px 5px 1px black;' : 'box-shadow: 5px 5px 1px black;'}
`

const CardText = styled.p`
text-size: 1rem;
`

const QuizList = (props) => {

    const quizCardClickHandler = (e) => {
        props.cardClicked(e.target.id)
    }

    return(
        <QuizContainer>
            {props.quizzes.map( el => {
                return <QuizCard id={el.id} key={el.id} pressed={el.pressed} onClick={quizCardClickHandler}>
                    <CardText>{el.quizTitle}</CardText>
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