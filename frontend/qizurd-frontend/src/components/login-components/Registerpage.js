import React, {useState} from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { activeUser,fillQuizState,fillStudentState } from "../../state/action-builder"

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
        <div>This is the register page</div>
        <form onSubmit={formSubmitHandler}>
            <label htmlFor={"username"}>Username:</label>
            <input id={"username"} value={userName} onChange={inputChangeHandler}></input>
            <br></br>
            <label htmlFor={"password"}>password</label>
            <input id={"password"} value={password} onChange={inputChangeHandler}></input>
            <button type="submit">submit</button>
        </form>
    </div>
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{activeUser,fillQuizState,fillStudentState})(Registerpage)