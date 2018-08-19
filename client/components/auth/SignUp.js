import React from 'react';
import {graphql} from 'react-apollo';
import {Redirect, Link} from 'react-router-dom';


import AuthForm from './AuthForm';
import {qCurrentUser} from '../../queries/queries'
import {mSignUp} from '../../mutations/mutations';

/**
 * SingUp Component
 * handles sign up of user to the application
 * TODO: Error Handling
 */

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            flow: 'Sign Up'
        };
    }

    componentWillUpdate(nextProps) {
        // this.props --> is the current props nextprops --> new props when the
        // component is re rendered.
        if (!this.props.data.user && nextProps.data.user) {
            this
                .props
                .history
                .push('/');
        }
    }
    // Call back passed as props to the Auth form.
    onSubmit = (email, password) => {
        this
            .props
            .mutate({
                variables: {
                    email,
                    password
                },

                // ? Race condition
                // TODO update to new verison of react-apollo Refetching the query to make sure
                // the correponding components are refreshed. After Signup mutation the user
                // should be redirected to a welcome page, but the .then is exceuted as soon as
                // the mutation happens there is a new PR being merged for this issue to use
                // awaitRefetchQueries : true
                // https://github.com/apollographql/react-apollo/pull/2214

                refetchQueries: [
                    {
                        query: qCurrentUser
                    }
                ]

                //TODO: the error message comes in an array and need to map it for exact error.
            })
            .catch((error) => {
                this.setState({error: 'hmm... are you a bot - try again'})
            });
    }
    render() {
        return (
            <fragment>
                <Link to="/" className="left free_button">Go Home
                    <i className="material-icons left">home</i>
                </Link>
                <div className="login-wrapper">
                    <AuthForm
                        submit={this.onSubmit}
                        error={this.state.error}
                        flow={this.state.flow}></AuthForm>
                </div>
            </fragment>
        );
    }
}

// A wierd approach - Adding current user query to run after the sign up
// mutation runs so as to make sure the user is Authenticated & logged in - this
// will allow the component to rerender and we can make use of this to do a
// redirection in componentWillUpdate

export default graphql(qCurrentUser)(graphql(mSignUp)(SignUp));