import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import TextFieldgroup from '../common/TextFieldGroup';
class Register extends React.Component{

    //merge 6
    constructor(){
        super();
        this.state= {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}

        };

    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.erros});
        }

    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    onSubmit = (e) => {
        e.preventDefault();
        let newuser = {
            name: this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }

        this.props.registerUser(newuser,this.props.history);
    };

    render(){
        const {errors} = this.state;
        const {user} = this.props.auth;

        return(
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldgroup
                                    placeholder='Name'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                                <TextFieldgroup
                                    placeholder='Email'
                                    name='email'
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <TextFieldgroup
                                    placeholder='Password'
                                    name='password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.onChange}

                                />
                                <TextFieldgroup
                                    placeholder='Confirm Password'
                                    name='password2'
                                    type='password'
                                    value={this.state.password2}
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
    auth:state.auth
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
