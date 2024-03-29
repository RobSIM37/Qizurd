import React, {useState,useEffect} from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { loginOrRegisterSchema } from "../../validation/validations"
import { activeUser } from "../../state/action-builder"
import { Button, Container, TextField,Typography,Paper } from "@mui/material"

const Registerpage = (props) => {

    const navigate = useNavigate()

    let [userName,setUserName] = useState("")
    let [password, setPassword] = useState("")
    let [isValid, setIsValid] = useState(false)

    useEffect(() => {
        const registerFormData = {
            userName,
            password
        }
        loginOrRegisterSchema.isValid(registerFormData).then(res => {
            setIsValid(res)
        })
    },[userName,password])

    const inputChangeHandler = (e) => {
        if(e.target.id === "username"){
            setUserName(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }

    const loginButtonClickHandler = (e) => {
        navigate("/")
    }

    const rootHTML = "https://qizurd-backend-robsim37.vercel.app/";

    const formSubmitHandler = (e) => {
        e.preventDefault()
        axios.post(`${rootHTML}register`,{userName,password}).then(res => {
            const stringifiedAuth = JSON.stringify(res.data.authToken)
            localStorage.setItem("userAuth",stringifiedAuth)
            props.activeUser(res.data)
            navigate("/quizzes")
        }).catch(err => console.log(err))
    }

    return(
        <Container align="center">
            <Paper>
            <Typography align="center" sx={{margin:"1rem"}} variant="h1"> Register </Typography>

                <TextField 
                id={"username"}
                label="Username"
                variant="standard"
                align="center"
                value={userName}
                onChange={inputChangeHandler}>
                </TextField>

                <TextField
                id={"password"}
                label="Password"
                variant="standard"
                align="center"
                value={password}
                onChange={inputChangeHandler}
                sx={{marginBottom:"2rem"}}>
                </TextField>

                <Container>

                    <Button
                    variant="contained"
                    type="submit"
                    onClick={formSubmitHandler}
                    disabled={!isValid}
                    sx={{margin:"1rem"}}>Register</Button>

                    <Button
                    variant="outlined"
                    type="button"
                    onClick={loginButtonClickHandler}
                    sx={{margin:"1rem"}}>Login</Button>

                </Container>
                </Paper>
        </Container>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{activeUser})(Registerpage)