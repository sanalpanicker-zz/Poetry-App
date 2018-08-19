const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Poem = mongoose.model('poem');
const Stanza = mongoose.model('stanza');
const User = mongoose.model('user');

const PoemType = require('./poem_type');
const StanzaType = require('./stanza_type');
const UserType = require('./user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
          email: {
              type: GraphQLString
          },
          password: {
              type: GraphQLString
          }
      },
      resolve(ParentValue, args, request) {
          return AuthService.signup({email: args.email, password: args.password, req: request});
      }
  },
  logout: {
      type: UserType,
      resolve(ParentValue, args, request) {
          const {user} = request;
          request.logout();
          return user;
      }
  },
  login: {
      type: UserType,
      args: {
          email: {
              type: GraphQLString
          },
          password: {
              type: GraphQLString
          }
      },
      resolve(ParentValue, args, request) {
          return AuthService.login({email: args.email, password: args.password, req: request});
      }
  },
    addPoems: {
      type: PoemType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Poem({ title })).save()
      }
    },
    addStanzaToPoem: {
      type: PoemType,
      args: {
        content: { type: GraphQLString },
        poemId: { type: GraphQLID }
      },
      resolve(parentValue, { content, poemId }) {
        return Poem.addStanza(poemId, content);
      }
    },
    addPoemToUser: {
      type: UserType,
      args: {
        title: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parentValue, { title, userId }) {
        console.log(title,userId);
        return User.addPoems(userId, title);
      }
    },
    likeStanza: {
      type: StanzaType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Stanza.like(id);
      }
    },
    deletePoem: {
      type: PoemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Poem.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
