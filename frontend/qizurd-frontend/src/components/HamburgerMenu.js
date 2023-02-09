import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import { useNavigate } from "react-router-dom"
import { menuToggle,clearQuizForm,clearStudentForm } from "../state/action-builder"

const HamburgerMenuContainer = styled.div`
background-color: grey;
width: 100vw;
`

const HamburgerMenuCard = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 3rem;
font-size: 1rem;
cursor: pointer;
`

const HamburgerMenu = (props) => {

    const navigate = useNavigate()

    const menuCardClickHandler = (e) =>{
        const id = e.target.id
        if(id === "Close"){
            props.menuToggle(false)
        }else{
        props.clearQuizForm()
        props.clearStudentForm()
        const baseRoute = id.split(" ")[1]
        const route = id.replaceAll(" ","-")
        navigate(`${baseRoute.toLowerCase()}/${route.toLowerCase()}`)
        }
        props.menuToggle(false)
    } 

    return (
        <HamburgerMenuContainer>
            {props.menu.map(el => {
                return <HamburgerMenuCard key ={el} id={el} onClick={menuCardClickHandler}>{el}</HamburgerMenuCard>
            })}
        </HamburgerMenuContainer>
    )
}

const mapStateToProps = (state) => ({
    menu: state.menu.menuSelections,
    menuOpen: state.menu.menuOpen
})

export default connect(mapStateToProps,{menuToggle,clearQuizForm,clearStudentForm})(HamburgerMenu)