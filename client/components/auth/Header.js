import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {compose, graphql} from 'react-apollo';
import {qCurrentUser} from '../../queries/queries';

import {mLogout} from '../../mutations/mutations';

class Header extends React.Component {
    logout = () => {
        this
            .props
            .mutate({
                refetchQueries: [
                    {
                        query: qCurrentUser
                    }
                ]
            })
    }
    renderButtons = () => {
        const {user} = this.props.data;

        if (user) {
            return (
                <div>
                    <li>
                        <a onClick={this.logout} className="right">Log Out
                            <i className="material-icons right">account_circle
                            </i>
                        </a>
                    </li>
                </div>
            )
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup">
                            <span>Sign Up</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <span>Log In</span>
                        </Link>
                    </li>
                </div>
            )
        }
    }
    render() {
        const {loading} = this.props.data;

        if (loading) {
            return <div/>
        } else {
            return (
                <nav>
                    <div className="nav-wrapper">
                        <ul className="right">{this.renderButtons()}</ul>
                    </div>
                </nav>
            );
        }
    }
}

export default graphql(mLogout)(graphql(qCurrentUser)(Header));