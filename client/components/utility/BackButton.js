import React from 'react'
import {Link} from 'react-router-dom';
/**
 * Backbutton implementation
 * TODO need to refactor name - this name doesnt make sense
 */
class BackButton extends React.Component {

    // Reponsive material dropdown menu toggle
    menuToggle = (e) => {
        if (!this.nav.classList.contains('expand')) {
            this
                .nav
                .classList
                .add('expand');

        } else {
            this
                .nav
                .classList
                .remove('expand');
        };
    }
    render() {
        return (
            <nav ref={(dom) => { this.nav = dom; }}>
                <a  onClick={this.menuToggle} className="left hamburger" href="javascript:void(0);">
                    <i className="material-icons">menu</i>
                </a>
                <Link to="/" className="left">Go Home
                    <i className="material-icons left">home</i>
                </Link>
                {this.props.cpage == "create" || this.props.cpage == "detail" ? 
                <Link to="/poemlist" className="left">Poems
                    <i className="material-icons left">queue_music</i>
                </Link> : <span></span>}
            </nav>
        )
    }
}

export default BackButton;