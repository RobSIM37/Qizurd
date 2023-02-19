import { Outlet,Navigate } from "react-router";
import { connect } from "react-redux";

const PrivateRoutes = (props) => {
    const auth = props.user.id
    return (
        auth ? <Outlet/> : <Navigate to="/"/>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps,{})(PrivateRoutes)