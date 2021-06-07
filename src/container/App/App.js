import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/animate.min.css';
import '../../assets/css/style.css';
import '../../assets/vendors/iconic-fonts/cryptocoins/cryptocoins-colors.css';
import '../../assets/vendors/iconic-fonts/cryptocoins/cryptocoins.css';
import '../../assets/vendors/iconic-fonts/flat-icons/flaticon.css';
import '../../assets/vendors/iconic-fonts/font-awesome/css/all.min.css';
import { setCurrentUser } from '../../redux/user/user.action';
import Routes from '../_Routes/index';




export class App extends Component {

    state={
        is_token_expired:true,
    }

    doSomethingBeforeUnload = () => {
        alert('You will be logout if you close your browser')
    }

    setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            return this.doSomethingBeforeUnload();
        });
    };

    componentDidMount() {
        // Activate the event listener
        this.setupBeforeUnloadListener();
    }
     
    render() {
        return (
            <Fragment>
                <Routes state={this.state} />
                <ToastContainer position="top-center" />
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  })
  
  export default connect(null, mapDispatchToProps)(App);