import React,{useState} from "react"
import { connect } from "react-redux"
import { userLogin } from "../../state/action-builder"

const Loginpage = (props) => {

    let [userName,setUserName] = useState("")
    let [password, setPassword] = useState("")

    const inputChangeHandler = (e) => {
        if(e.target.id === "username"){
            setUserName(e.target.value)
        }else{
            setPassword(e.target.value)
        }
        console.log(userName + "  " + password)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        props.userLogin({userName,password})
    }

    return <div>
        <div>This is the login page</div>
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

export default connect(mapStateToProps,userLogin)(Loginpage)