import gql from 'graphql-tag';

export const qFetchPoems = gql `{
                     poems{
                        id
                        title
                    }
                }
                `;

export const qCurrentUserPoems = gql `{
                      user{
                    id
                        email
                        poems{
                        id
                        title
                        }
                    }
               }
               `;

export const qFetchStanzas = gql `
                query qFetchStanzas($id : ID!){
                    poem(id:$id){
                      title
                      stanza{
                          id
                          likes
                          content
                      }
                    }
                  }
                `;

export const qCurrentUser = gql `{
                        user{
                        id
                    email
                        }
}`;