import React from "react"
import {IoMdCloseCircle} from "react-icons/io"
import { FormStudentCardStyles,StudentCardText,CloseIconWrapper} from "./formStyles"

const FormStudentCard = (props) => {
    return(
        <FormStudentCardStyles>
            <CloseIconWrapper><IoMdCloseCircle/></CloseIconWrapper>
            <StudentCardText>
                {props.children}
            </StudentCardText>
        </FormStudentCardStyles>
    )
}

export default FormStudentCard