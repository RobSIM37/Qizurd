import { GiHamburgerMenu } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import React from "react"
import styled from "styled-components"

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

const Header = () => {
return (
    <HeaderStyles>
        <IconWrapper><GiHamburgerMenu /></IconWrapper>
        <Logo>Qizurd</Logo>
        <IconWrapper><CgProfile /></IconWrapper>
    </HeaderStyles>
)
}

export default Header