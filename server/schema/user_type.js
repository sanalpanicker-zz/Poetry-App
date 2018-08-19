const graphql = require('graphql');
const mongoose = require('mongoose');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;
const User = mongoose.model('user');
const PoemType = require('./poem_type');



const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: {
            type: GraphQLID
        },
        email: {
            type: GraphQLString
        },
        poems: {
            type: new GraphQLList(PoemType),
            resolve(parentValue) {
              return User.findPoems(parentValue.id);
            }
          }
    }
});

module.exports = UserType;