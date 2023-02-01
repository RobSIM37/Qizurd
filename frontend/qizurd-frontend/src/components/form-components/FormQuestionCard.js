import React from "react"
import {connect} from "react-redux"
import {QuestionFormStyles,LabelStyles,InputBoxStyle} from "./formStyles"

const FormQuestion = (props) => {
return(
<QuestionFormStyles>
    <LabelStyles htmlFor="question">Question {props.id + 1}:</LabelStyles>
    <InputBoxStyle className={"title"} id={props.id} 
    value={props.question.title} onChange={props.questionInputChangeHandler}></InputBoxStyle>

    <LabelStyles htmlFor="answer">Answer:</LabelStyles>
    <InputBoxStyle className={"answer"} id={props.id} 
    value={props.question.answer} onChange={props.questionInputChangeHandler}></InputBoxStyle>
</QuestionFormStyles>)
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{})(FormQuestion)