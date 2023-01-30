import React from "react"
import {QuestionFormStyles} from "./formStyles"

const FormQuestion = (props) => {
    <QuestionFormStyles>
        <LabelStyles htmlFor={"questionTitle"}>Question Title</LabelStyles>
        <InputBoxStyle id={"questionTitle"}/>

        <LabelStyles htmlFor={"questionAnswer"}>Question Answer</LabelStyles>
        <InputBoxStyle id={"questionAnswer"}/>
    </QuestionFormStyles>
}