import React from 'react';
import {graphql} from 'react-apollo';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';

import Login from '../components/auth/Login';

import {qCurrentUser} from '../queries/queries'
/**
 * Using HOC to check if the user is authenticated while bookmarking pages
 * or trying to access pages directly
 */
export default(WrappedComponent) => {
    class RequireAuth extends React.Component {
        componentWillUpdate = (newProps) => {

            if (!newProps.data.loading && !newProps.data.user) {
                    this
                        .props
                        .history
                        .push('/login');
            }
        }
        render() {
            // TODO there is a small glitch while chnaging url in browser, have to work
            // around it.
            if (this.props.data.user) {
                return <WrappedComponent {...this.props}/>;
            }
            return (
                <HashRouter>
                    <Login></Login>
                    {/* <div>
                    <h3>UnAuthorized Access - Please log in to see this page.</h3>
                </div> */}
                </HashRouter>
            )
        }
    }
    return graphql(qCurrentUser)(RequireAuth);
};