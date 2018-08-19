import React from 'react';
import {Link} from 'react-router-dom';
import {graphql} from 'react-apollo';

import {qCurrentUserPoems} from '../../queries/queries';
import PoemDelete from './PoemDelete'
import Spinner from '../utility/Spinner';
import BackButton from '../utility/BackButton';


class PoemList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderPoems = () => {
        const {data} = this.props;
        if (!data.loading && data.user.poems) {
            const poems= data.user.poems;
            return poems.map((poem, i) => {
                return (
                    <li className="collection-item" key={poem.id}>
                        <Link to={'/poem/' + poem.id}>
                            {poem.title}</Link>
                        <PoemDelete poemId={poem.id}></PoemDelete>
                    </li>
                )
            })
        } else {
            return (
                <Spinner></Spinner>
            )
        }
    }

    render() {
        return (
            <fragment>
            <BackButton cpage="list"></BackButton>
            <div className="centerify correct_wrap">
             <div className="center_form_title"><h3>Poetry Titles</h3></div>
                <ul className="collection">{this.renderPoems()}</ul>
                <Link to="/poems" className="btn-floating btn-large blue">
                    <i className="material-icons">add</i>
                </Link>
                </div>
            </fragment>
        );
    }
}

export default graphql(qCurrentUserPoems)(PoemList);