import React, {Component} from 'react';
import './App.css';
import 'typeface-roboto';
import PostList from "./list/PostList";
import AppHeader from './shared/Header/AppHeader';
import {Route} from "react-router";

class App extends Component {

    render() {
        return (
            <div className='app'>
                <AppHeader></AppHeader>
                <div className='app-content'>
                    <Route exact path="/" render={() => (<PostList/>)}/>
                    <Route exact path="/posts" render={() => (<PostList/>)}/>
                </div>
            </div>
        );
    }
}

export default App;
