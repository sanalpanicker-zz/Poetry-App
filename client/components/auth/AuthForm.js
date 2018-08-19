import React from 'react';

class AuthForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }
    emailChange = (e) => {
        this.setState({email: e.target.value});
    }
    passwordChange = (e) => {
        this.setState({password: e.target.value});
    }
    authSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .submit(this.state.email, this.state.password);
    }

    render() {

        //setting invalid for material css styles
        let isValid = '';
        if (this.props.error) {
            isValid = 'invalid'
        }
        return (
            <div className="centerify f_center auth">
                <form onSubmit={this.authSubmit} className="col s6">
                    <div className="input-field">
                        <input autoFocus
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