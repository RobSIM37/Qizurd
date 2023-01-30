import React from "react"
import {AiOutlineCloseCircle} from "react-icons/ai"
import { connect } from "react-redux"
import { FormStudentCardStyles,StudentCardText,CloseIconWrapper} from "./formStyles"

const FormStudentCard = (props) => {

    const closeClickHandler = (e) => {
        const {id} = e.target
        console.log(`card ${id}`)
        props.setSelectedStudents(props.selectedStudents.filter(el => el.id !== id))
    }

    return(
        <FormStudentCardStyles>
            <CloseIconWrapper id={props.id} onClick={closeClickHandler}><AiOutlineCloseCircle style={{pointerEvents: "none"}} id={props.id}/></CloseIconWrapper>
            <StudentCardText>
                {props.children}
            </StudentCardText>
        </FormStudentCardStyles>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{})(FormStudentCard)