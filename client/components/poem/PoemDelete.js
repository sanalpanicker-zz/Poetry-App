import React from 'react';
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {qCurrentUserPoems} from '../../queries/queries';

/**
 * PoemDelete handles the fucntionlity to delete a poem from users poem collection
 */

class PoemDelete extends React.Component {

    deleteTitle = () => {
        this
            .props
            .mutate({
                variables: {
                    id: this.props.poemId
                },
                // Triggering the poem list to reload as the data is updated
                refetchQueries: [
                    {
                        query: qCurrentUserPoems
                    }
                ]
            })
    }

    render() {
        return (
            <span onClick={this.deleteTitle} className="like">
                <i className="material-icons ">delete</i>
            </span>
        );
    }
}
const deletePoem = gql `
mutation deletePoem($id : ID){
    deletePoem(id:$id){
    id
    }
}
`
export default graphql(deletePoem)(PoemDelete);
