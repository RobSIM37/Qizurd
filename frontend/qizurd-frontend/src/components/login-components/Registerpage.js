import React, {useState} from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { activeUser,fillQuizState,fillStudentState } from "../../state/action-builder"
import { Button, Container, TextField, Typography } from "@mui/material"

const Registerpage = (props) => {

    const navigate = useNavigate()

    let [userName,setUserName] = useState("")
    let [password, setPassword] = useState("")

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

    const formSubmitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8025/register",{userName,password}).then(res => {
            props.activeUser(res.data)
            props.fillQuizState(res.data.quizzes)
            props.fillStudentState(res.data.students)
            navigate("/quizzes")
        }).catch(err => console.log(err))
    }

    return <div>
        <Container align="center">
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
                value={userName}
                onChange={inputChangeHandler}
                sx={{marginBottom:"2rem"}}>
                </TextField>

                <Container>

                    <Button
                    variant="contained"
                    type="submit"
                    onClick={formSubmitHandler}
                    sx={{margin:"1rem"}}>Register</Button>

                    <Button
                    variant="outlined"
                    type="button"
                    onClick={loginButtonClickHandler}
                    sx={{margin:"1rem"}}>Login</Button>

                </Container>
        </Container>
    </div>
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{activeUser,fillQuizState,fillStudentState})(Registerpage)