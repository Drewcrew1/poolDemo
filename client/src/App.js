import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch  } from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import {createStore, applyMiddleware,compose} from 'redux';
import PrivateRoute from './components/common/PrivateRoute';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import EditPost from './components/post/EditPost';
import './App.css';
const middleware = [thunk];
const store = createStore(rootReducer,{},compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">

                        <Navbar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route  exact path="/feed" component={Posts} />

                        <Switch>
                            <PrivateRoute exact path="/post/:id" component={Post} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/editPost/:id" component={EditPost} />
                        </Switch>

                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
