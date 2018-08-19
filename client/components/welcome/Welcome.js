import React from 'react';
import Header from '../auth/Header';
import {Link} from 'react-router-dom';

class Welcome extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div id="landing_wrapper" className="main_bg">
                    <div>
                        <h1 className="centerify quote">Coded this Poetry App</h1>
                    </div>
                    <div className="centerify quote_sub">
                        <i className="material-icons md-48">code</i>
                    </div>
                    <div className="centerify create_now_button">
                        <Link to="/poems" className="waves-effect waves-light btn-large">
                            <i className="material-icons left">create</i>Create Now?</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Welcome;