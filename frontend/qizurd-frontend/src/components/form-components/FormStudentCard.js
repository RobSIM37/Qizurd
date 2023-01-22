import React from "react"
import {AiOutlineCloseCircle} from "react-icons/ai"
import { connect } from "react-redux"
import { FormStudentCardStyles,StudentCardText,CloseIconWrapper} from "./formStyles"
import { addStudent } from "../../state/action-builder"

const FormStudentCard = (props) => {

    const closeClickHandler = (e) => {
        const {id} = e.target
        console.log(`card ${id}`)
        props.setAddedStudents(props.addedStudents.filter(el => el.id !== id))
        props.addStudent(props.id)
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

export default connect(mapStateToProps,{addStudent})(FormStudentCard)