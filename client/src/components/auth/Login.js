import React from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
class Login extends React.Component{
    constructor(){
        super();
        this.state= {

            email: '',
            password: '',
            errors: {}

        };

    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/feed');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/feed');
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let user = {

            email:this.state.email,
            password:this.state.password

        }
        this.props.loginUser(user);
    }
    render(){
        const {errors} = this.state;


        return(
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your Social-Net account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder='Email'
                                    name='email'
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder='Password'
                                    name='password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth

});


export default connect(mapStateToProps, {loginUser})(Login);
