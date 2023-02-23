import React, {useState} from "react"
import {connect} from "react-redux"
import { Button, ButtonGroup, SwipeableDrawer } from "@mui/material"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useNavigate } from "react-router";
import { clearQuizForm,clearStudentForm } from "../state/action-builder";

const HamburgerMenu = (props) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const selectionClickHandler = (e) => {
        navigate(e.target.id)
        props.clearQuizForm()
        props.clearStudentForm()
        setMenuOpen(false)
    }

    const menuClick = (e) => {
        setMenuOpen(true)
    }

    const drawerClose = () => {
        setMenuOpen(false)
    }

    const drawerOpen = () => {
        setMenuOpen(true)
    }

    const logOutClickHandler = (e) => {
        localStorage.removeItem("userAuth")
        setMenuOpen(false)
        navigate("/")
    }
    return(
    <>
    <MenuRoundedIcon sx={{cursor:"pointer"}} fontSize="large" onClick={menuClick}/>
    <SwipeableDrawer anchor="top" open={menuOpen} onOpen={drawerOpen} onClose={drawerClose}>
        <ButtonGroup orientation="vertical">
            <Button size="large" id="/student/create-student" onClick={selectionClickHandler}>Create Student</Button>
            <Button size="large" id="/student/edit-student" onClick={selectionClickHandler}>Edit Student</Button>
            <Button size="large" id="/quiz/create-quiz" onClick={selectionClickHandler}>Create Quiz</Button>
            <Button size="large" id="/quiz/edit-quiz" onClick={selectionClickHandler}>Edit Quiz</Button>
            <Button size="large" id="logOut" onClick={logOutClickHandler}>Log Out</Button>
        </ButtonGroup>
    </SwipeableDrawer>
    </>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{clearQuizForm,clearStudentForm})(HamburgerMenu)