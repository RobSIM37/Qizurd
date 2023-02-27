import React,{useState,useEffect} from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router"
import { activeUser } from "../../state/action-builder"
import { loginOrRegisterSchema } from "../../validation/validations"
import axios from "axios"
import { Button, Container, TextField,Typography,Paper } from "@mui/material"

const Loginpage = (props) => {

    const navigate = useNavigate()

    let [userName,setUserName] = useState("")
    let [password, setPassword] = useState("")
    let [isValid,setIsValid] = useState(false)

    useEffect(() => {
        const loggedInUserAuth = JSON.parse(localStorage.getItem("userAuth"))
        if (loggedInUserAuth){
            axios.get(`http://localhost:8025/${loggedInUserAuth}`).then(res => {
                props.activeUser(res.data)
                const stringifiedAuth = JSON.stringify(res.data.authToken)
                localStorage.setItem("userAuth",stringifiedAuth)
                navigate("/quizzes")
            })
        }
    })

    useEffect(() => {
        const loginFormData = {
            userName,
            password
        }
        loginOrRegisterSchema.isValid(loginFormData).then(res => {
            setIsValid(res)
        })
    },[userName,password])

    const inputChangeHandler = async (e) => {
        if(e.target.id === "username"){
            setUserName(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }

    const registerButtonClickHandler = (e) => {
        navigate("/register")
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8025/",{userName,password}).then(res => {
            const stringifiedAuth = JSON.stringify(res.data.authToken)
            localStorage.setItem("userAuth",stringifiedAuth)
            props.activeUser(res.data)
            navigate("/quizzes")
        }).catch(err => console.log(err))
    }

    return <div>
        <Container align="center">
            <Paper>
            <Typography align="center" variant="h1" sx={{margin:"1rem"}}> Log In </Typography>

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
                sx={{marginBottom: "2rem"}}>
                </TextField>

                <Container>

                    <Button
                    variant="contained"
                    type="submit"
                    onClick={formSubmitHandler}
                    disabled={!isValid}
                    sx={{margin:"1rem"}}>Log In
                    </Button>

                    <Button
                    variant="outlined"
                    type="button"
                    onClick={registerButtonClickHandler}
                    sx={{margin:"1rem"}}>Register
                    </Button>

                </Container>
            </Paper>
        </Container>
    </div>
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{activeUser})(Loginpage)