import React from 'react';
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {qFetchStanzas} from '../../queries/queries'

class StanzaCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stanza: ''
        };
    }
    stanzaChange = (e) => {
        this.setState({stanza: e.target.value});
    }

    onSubmit = (e) => {
        //avoiding default submittal
        e.preventDefault();

        // forbid enetering empty spaces into title
        if (!this.state.stanza || this.state.stanza.trim() == "") {
            return false;
        }

        this
            .props
            .mutate({
                variables: {
                    content: this.state.stanza,
                    poemId: this.props.id
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
            .then(() => this.setState({stanza: ''}));
    }

    render() {
        return (
            <fragment>
                <div className="center_form c_form f_center">
                    <form onSubmit={this.onSubmit}>
                        <label>Add a line to this poem...</label>
                        <input
                            autoFocus
                            type="text"
                            onChange={this.stanzaChange}
                            value={this.state.stanza}/>
                    </form>
                </div>
            </fragment>
        );
    }
}
const addStanza = gql `
mutation adding($content : String, $poemId : ID){
    addStanzaToPoem(content:$content, poemId : $poemId){
      id
    }
  }
`
export default graphql(addStanza)(StanzaCreate);
