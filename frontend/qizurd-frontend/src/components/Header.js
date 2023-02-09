import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { AppBar,Toolbar,Typography } from "@mui/material"
import React from "react"
import { menuToggle } from "../state/action-builder"

const Header = (props) => {

    const navigate = useNavigate()

    const logoClickHandler = (e) => {
        navigate("/quizzes")
        props.menuToggle(false)
    }

    const menuClickHandler = (e) => {
        props.menuToggle(!props.menuOpen)
    }

    const accountClickHandler = (e) => {
        navigate("/account")
        props.menuToggle(false)
    }
return (
    <AppBar position="relative">
        <Toolbar>
            <MenuRoundedIcon onClick={menuClickHandler}/>
            <Typography variant="h6" onClick={logoClickHandler}>Qizurd</Typography>
            <AccountCircleRoundedIcon onClick={accountClickHandler}/>
        </Toolbar>
    </AppBar>
)
}

const mapStateToProps = state => ({
    menuOpen: state.menu.menuOpen
})
export default connect(mapStateToProps,{menuToggle})(Header)