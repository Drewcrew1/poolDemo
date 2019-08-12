import React from 'react';
import {Link} from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import axios from 'axios';
import {connect} from 'react-redux';
import { getPost, editPost } from '../../actions/postActions';

class EditPost extends React.Component{
    constructor(){
        super();
        this.state = {
            title: '',
            body: '',
            redirect: true
        }
    }

    componentWillMount() {
        const {id} = this.props.match.params;
       this.props.getPost(id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.post.post){
            const post = nextProps.post.post;


            this.setState({

                title: post.title,
                body: post.body,

            });
        }

    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    submit = () => {

        let Data = {
            title: this.state.title,
            body: this.state.body,
            id: this.props.match.params.id
        };
        this.props.editPost(Data);
        // axios.post(`api/posts/editPost/${id}`,Data).then((res) => {
        //     console.log(res);
        // }).catch((err) => console.log(err));
    };

    render(){
        if(this.state.redirect === true && this.props.post.loading === false){
            this.setState({title: this.props.post.post.title, body: this.props.post.post.body, redirect: false});
        }
        console.log(this.props);


        let styles = {
            display: "none"
        };

        return(
            <div>
                <Link to="/feed" className="btn btn-light">
                    Go Back
                </Link>

                <div className="ugInfo">
                    <div className='create-profile'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-8 m-auto'>
                                    <h1 className='display-4 text-center'>Edit Your Post</h1>

                                    <small className='d-block pb-3'>* = required fields</small>


                                    <TextFieldGroup
                                        placeholder="Title"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.onChange}

                                        info="title"
                                    />
                                    <TextFieldGroup
                                        placeholder="Body"
                                        name="body"
                                        value={this.state.body}
                                        onChange={this.onChange}

                                        info="body"
                                    />

                                    <button onClick={() => this.submit()} className='btn btn-info btn-block mt-4'>Submit</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => ({
   post: state.post
});

export default connect(mapStateToProps, {getPost,editPost})(EditPost);
