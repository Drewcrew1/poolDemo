import React from 'react';
import {connect} from 'react-redux';

import {deleteComment} from '../../actions/postActions';
class CommentItem extends React.Component{
    onDelete = (postId, commentId) => {
        this.props.deleteComment(postId, commentId);
    }
    render(){
        const {comment, postId, auth} = this.props;

        return(
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                        {comment.user === auth.user.id ? (
                            <button type='button' onClick={() => this.onDelete(postId, comment._id)} className='btn btn-danger mr-1'>
                                <i className='fas fa-times'/>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps,{deleteComment})(CommentItem);
