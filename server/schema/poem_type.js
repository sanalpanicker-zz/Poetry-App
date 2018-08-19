const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const StanzaType = require('./stanza_type');
const Poem = mongoose.model('poem');

const PoemType = new GraphQLObjectType({
  name:  'PoemType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Poem.findById(parentValue).populate('user')
          .then(poem => {
            return poem.user
          });
      }
    },
    stanza: {
      type: new GraphQLList(StanzaType),
      resolve(parentValue) {
        return Poem.findStanzas(parentValue.id);
      }
    }
  })
});

module.exports = PoemType;
