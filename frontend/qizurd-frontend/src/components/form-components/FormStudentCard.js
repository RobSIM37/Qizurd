import React from "react"
import { connect } from "react-redux"
import { ListItem,ListItemText,IconButton,Divider  } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { deleteStudentFromQuiz } from "../../state/action-builder"

const FormStudentCard = (props) => {

    const closeClickHandler = (e) => {
        const {id} = e.target
        props.deleteStudentFromQuiz(id)
        console.log(id)
    }

    return(
        <ListItem>
            <ListItemText>
                {props.children}
            </ListItemText>
            <IconButton id={props.id} onClick={closeClickHandler}>
                <ClearIcon sx={{pointerEvents:"none"}}/>
            </IconButton>
            <Divider/>
        </ListItem>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{deleteStudentFromQuiz})(FormStudentCard)