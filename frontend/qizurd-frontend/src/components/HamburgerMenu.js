import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"

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
    return (
        <HamburgerMenuContainer>
            {console.log(props)}
            {props.menu.map(el => {
                return <HamburgerMenuCard>{el}</HamburgerMenuCard>
            })}
        </HamburgerMenuContainer>
    )
}

const mapStateToProps = (state) => ({
    menu: state.menu.menuSelections
})

export default connect(mapStateToProps,{})(HamburgerMenu)