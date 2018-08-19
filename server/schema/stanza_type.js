const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Stanza = mongoose.model('stanza');

const StanzaType = new GraphQLObjectType({
  name:  'StanzaType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    poem: {
      type: require('./poem_type'),
      resolve(parentValue) {
        return Stanza.findById(parentValue).populate('poem')
          .then(stanza => {
            return stanza.poem
          });
      }
    }
  })
});

module.exports = StanzaType;
