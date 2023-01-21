import { GiHamburgerMenu } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"
import { menuToggle } from "../state/action-builder"

const HeaderStyles = styled.header`
display:flex;
background-color:orange;
width: 100vw;
height: 10vh;
align-items: center;
justify-content: space-between;
margin: space-between;

@media (max-width: 325px){
    font-size:2rem;

}
`

const IconWrapper = styled.div`
margin:1rem;
cursor: pointer;
`

const Logo = styled.p`
cursor:pointer;
`

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
    <HeaderStyles>
        <IconWrapper><GiHamburgerMenu onClick={menuClickHandler}/></IconWrapper>
        <Logo onClick={logoClickHandler}>Qizurd</Logo>
        <IconWrapper><CgProfile onClick={accountClickHandler}/></IconWrapper>
    </HeaderStyles>
)
}

const mapStateToProps = state => ({
    menuOpen: state.menu.menuOpen
})
export default connect(mapStateToProps,{menuToggle})(Header)