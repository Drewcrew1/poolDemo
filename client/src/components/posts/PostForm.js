import React from 'react';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from '../../actions/postActions';

class PostForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            body: '',
            tags: null,
            errors: {}
        };
    }
    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors: newProps.errors});
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {user } = this.props.auth;
        const newPost = {
            title: this.state.title,
            body: this.state.body,
            name: user.name
        };
        if(this.state.tags !== null){
            newPost.tags = this.state.tags;
        }
        this.props.addPost(newPost);
        this.setState({text: ''});
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        const {errors} = this.state;
        return(
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Say Somthing...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder='Create a Post Title'
                                    name='title'
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                                <TextAreaFieldGroup
                                    placeholder='Create a Post Body'
                                    name='body'
                                    value={this.state.body}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                                <TextAreaFieldGroup
                                    placeholder='Add a tag(optional)'
                                    name='tags'
                                    value={this.state.tags}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>


        );
    }
}
const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps,{addPost})(PostForm);
