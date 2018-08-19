/**
 * React App bootstraps all components based on routes here
 */

import './style/style.css'

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';

// Files
import PoemList from './components/poem/PoemList';
import PoemCreate from './components/poem/PoemCreate';

import Welcome from './components/welcome/Welcome';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import StanzaList from './components/stanza/StanzaList';

// Configuring Apollo setup for the app

import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

// Higher Order Component

import requireAuth from './components/requireAuth';


/**
 * link: httpLink :Configuration as per Apollo docs for allowing passing of Auth tokens
 * The auth worked fine with Graphiql but failed while trying from client
 * Also added options to keep track of object when they are updated Apollo can update its cache
 */

const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql', credentials: 'same-origin'});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null
    })
});

ReactDOM.render(
    <ApolloProvider client={client}>
    <HashRouter>
        <div>
            <Switch>
                <Route component={requireAuth(StanzaList)} path="/poem/:id"/>
                <Route component={requireAuth(PoemCreate)} path="/poems"/>
                <Route component={requireAuth(PoemList)} path="/poemlist"/>
                <Route component={Welcome} exact path="/"/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </div>
    </HashRouter>
</ApolloProvider>, document.querySelector('.container'));
