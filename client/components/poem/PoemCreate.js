import React from 'react';
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {qFetchPoems} from '../../queries/queries';
import BackButton from '../utility/BackButton';
import {mAddPoem2user} from '../../mutations/mutations';
import {qCurrentUser} from '../../queries/queries'

class PoemCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };
    }
    titleChange = (e) => {
        this.setState({title: e.target.value});
    }

    onSubmit = (e) => {
        // avoiding default submittal
        e.preventDefault();

        // forbid enetering empty spaces into title
        if (!this.state.title || this.state.title.trim() == "") {
            return false;
        }
        
        this
            .props
            .mutate({
                variables: {
                    title: this.state.title,
                    userId: this.props.data.user.id
                },
                refetchQueries: [
                    {
                        query: qFetchPoems
                    }
                ]
            })
            .then((data) => this.props.history.push('/poemlist'));
    }

    render() {
        return (
            <fragment>
                <BackButton cpage="create"></BackButton>
                <div className="centerify correct_wrap">
                    <div className="center_form_title">
                        <h3>Create a New Poem Title</h3>
                    </div>
                    <div className="center_form c_form f_center">
                        <form onSubmit={this.onSubmit}>
                            <label>Enter your poem title below</label>
                            <input
                                autoFocus
                                type="text"
                                onChange={this.titleChange}
                                value={this.state.title}/>
                        </form>
                    </div>
                </div>
            </fragment>
        );
    }
}

export default graphql(mAddPoem2user)(graphql(qCurrentUser)(PoemCreate));
