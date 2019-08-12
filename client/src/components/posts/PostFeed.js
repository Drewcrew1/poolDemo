import React from 'react';
import PostItem from './PostItem';
class PostFeed extends React.Component{
    render(){
        const {posts} = this.props;

        return(
            <div>
                {posts.map(post => <PostItem key={post._id} post={post}/>)}
            </div>
        );
    }
}


export default PostFeed;
