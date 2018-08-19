import React from 'react';
//As graphQl query is not a valid javascript code we can import graphQL tag
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import {graphql} from 'react-apollo';

import Spinner from '../utility/Spinner';
import BackButton from '../utility/BackButton';
import StanzaCreate from './StanzaCreate';
import {qFetchStanzas} from '../../queries/queries';
import ThumbsUp from '../utility/LikeButton';

class StanzaList extends React.Component {

    constructor(props) {
        super(props)
    }

    renderStanzas = (stanzas) => {
        return stanzas.map((stanza, i) => {
            return (
                <li className="collection-item" key={i}>
                    {stanza.content}<ThumbsUp
                        id={this.props.match.params.id}
                        stanzaId={stanza.id}
                        likes={stanza.likes}></ThumbsUp>
                </li>
            )
        })
    }

    scrollToBottom = () => {
        const scrollHeight = this.linelist.scrollHeight;
        const height = this.linelist.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.linelist.scrollTop = maxScrollTop > 0
            ? maxScrollTop
            : 0;
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    render() {
        const {data} = this.props;

        if (!data.loading && data.poem) {
            return (
                <fragment>
                    <BackButton cpage="detail"></BackButton>
                    <div className="sub_header_title">
                        <h4>Start Giving lines to your Poem</h4>
                    </div>
                    <div className="centerify correct_wrap">
                        <div className="center_form_title">
                            <h3>{data.poem.title}</h3>
                        </div>
                        <blockquote
                            className="line_view"
                            ref={(dom) => {
                            this.linelist = dom;
                        }}>
                            <ul className="collection">
                                {this.renderStanzas(data.poem.stanza)}
                            </ul>
                        </blockquote>
                        {/* <Link to="/poems" className="btn-floating btn-large blue right">
                        <i className="material-icons">add</i>
                    </Link> */}
                        <StanzaCreate id={this.props.match.params.id}></StanzaCreate>
                    </div>
                </fragment>
            );
        } else {
            return (
                <Spinner></Spinner>
            )
        }
    }
}

// As the query is made as soon as the component is loaded, there needs to be a way to pass the
// variables. in case of mutation, we get a this.props.mutation handler to work
// with, but dont have that flexibiity with queries

export default graphql(qFetchStanzas, {
    options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            }
        }
    }
})(StanzaList);