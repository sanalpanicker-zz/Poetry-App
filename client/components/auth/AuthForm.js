import React from 'react';
/**
 * AuthForm provides the authentication panel for Sign Up and Log In
 */
class AuthForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }
    // triggered when the user types his email
    emailChange = (e) => {
        this.setState({email: e.target.value});
    }
    // triggered when the user types his password
    passwordChange = (e) => {
        this.setState({password: e.target.value});
    }
    // this is called on the Auth for submit
    authSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .submit(this.state.email, this.state.password);
    }

    render() {

        // setting invalid for material css styles
        let isValid = '';
        if (this.props.error) {
            isValid = 'invalid'
        }
        return (
            <div className="centerify f_center auth">
                <form onSubmit={this.authSubmit} className="col s6">
                    <div className="input-field">
                        <input
                            autoFocus
                            className={`${isValid}`}
                            placeholder="Email"
                            type="email"
                            onChange={this.emailChange}
                            value={this.state.email}/>
                    </div>
                    <div className="input-field">
                        <input
                            className={`${isValid}`}
                            placeholder="Password"
                            type="password"
                            onChange={this.passwordChange}
                            value={this.state.password}/>
                    </div>
                    {this.props.error
                        ? (
                            <div className="errors">{this.props.error}</div>
                        )
                        : (
                            <span></span>
                        )}
                    <button className="btn">{this.props.flow}</button>
                </form>
            </div>
        );
    }
}

export default AuthForm;