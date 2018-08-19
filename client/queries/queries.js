import gql from 'graphql-tag';

// For fetching the list of poems -  this can be used for getting all pomes from all users
export const qFetchPoems = gql `{
                     poems{
                        id
                        title
                    }
                }
                `;
// Get all the poems for the current loggedin user
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
// Get all lines for a particular poem
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
// Get the current logged in user
export const qCurrentUser = gql `{
                        user{
                        id
                    email
                        }
}`;