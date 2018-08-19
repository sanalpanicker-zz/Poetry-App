const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const PoemType = require('./poem_type');
const StanzaType = require('./stanza_type');
const Stanza = mongoose.model('stanza');
const Poem = mongoose.model('poem');
const UserType = require('./user_type');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    poems: {
      type: new GraphQLList(PoemType),
      resolve() {
        return Poem.find({});
      }
    },
    poem: {
      type: PoemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Poem.findById(id);
      }
    },
    stanza: {
      type: StanzaType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Stanza.findById(id);
      }
    },
    user: {
      type: UserType,
      resolve(ParentValue, args, request) {
          return request.user;
      }
  }
  })
});

module.exports = RootQuery;
