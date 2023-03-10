import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { AppBar,Toolbar,Typography,Container } from "@mui/material"
import React from "react"
import HamburgerMenu from './HamburgerMenu';

const Header = (props) => {

    const navigate = useNavigate()

    const logoClickHandler = (e) => {
        navigate("/quizzes")
    }

    const accountClickHandler = (e) => {
        navigate("/account")
        props.menuToggle(false)
    }
return (
    <AppBar position="relative">
        <Toolbar>
            <Container align="center" sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <HamburgerMenu/>
                <Typography sx={{cursor:"pointer"}} fontSize="2rem" variant="headerFont" onClick={logoClickHandler}>Qizurd</Typography>
                <AccountCircleRoundedIcon sx={{cursor:"pointer"}} fontSize="large" onClick={accountClickHandler}/>
            </Container>
        </Toolbar>
    </AppBar>
)
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps,)(Header)