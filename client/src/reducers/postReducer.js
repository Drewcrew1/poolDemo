import {ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST,EDIT_POST} from '../actions/types';
const initState = {
    posts: [],
    post:{},
    loading: false
};

export default function(state = initState,action){
    switch (action.type){
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            };
        case EDIT_POST:

            return {
                ...state,
                post: action.payload
            };

        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case ADD_POST:
            return{
                ...state,
                posts: [action.payload,...state.posts]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default:
            return state;
    }
}
