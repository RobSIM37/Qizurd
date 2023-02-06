import React from "react"
import {connect} from "react-redux"
import {QuestionFormStyles,LabelStyles,InputBoxStyle} from "./formStyles"

const FormQuestion = (props) => {
return(
<QuestionFormStyles>
    <LabelStyles htmlFor="question">Question {props.id + 1}:</LabelStyles>
    <InputBoxStyle id={props.id} key={"questionText"} className={"questionText"}
    value={props.question.questionText} onChange={props.questionInputChangeHandler}></InputBoxStyle>

    <LabelStyles htmlFor="answer">Answer:</LabelStyles>
    <InputBoxStyle id={props.id} key={"answer"} className={"answer"}
    value={props.question.answer} onChange={props.questionInputChangeHandler}></InputBoxStyle>
</QuestionFormStyles>)
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{})(FormQuestion)