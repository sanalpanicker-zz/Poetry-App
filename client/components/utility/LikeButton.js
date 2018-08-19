import React from 'react';
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {qFetchStanzas} from '../../queries/queries';

class ThumbsUp extends React.Component {

    publishLike = () => {
        this
            .props
            .mutate({
                variables: {
                    id: this.props.stanzaId
                },
                refetchQueries: [
                    {
                        query: qFetchStanzas,
                        variables: {
                            id: this.props.id
                        }
                    }
                ]
            })
    }
    render() {
        return (
            <span onClick={this.publishLike} className="c_red like">
                {this.props.likes}<i className='material-icons right'>
                    thumb_up
                </i>
            </span>
        );
    }
}
const likeStanza = gql `
mutation likeStanza($id : ID){
    likeStanza(id:$id){
    id
    likes
    }
}
`
export default graphql(likeStanza)(ThumbsUp);