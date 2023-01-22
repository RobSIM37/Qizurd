import React from "react"

const FormQuestionList = (props) => {

    let questionElementArr = []

    for(let i = 0; i < props.questionCounter; i++){
        questionElementArr.push(<div key={i}>{i}</div>)
    }

    return(
        <div>
            {questionElementArr}
        </div>
    )
}
export default FormQuestionList