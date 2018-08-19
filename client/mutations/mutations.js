import gql from 'graphql-tag';

// Logout Mutation

export const mLogout = gql `
mutation{
  logout{
      id
    email
  }
}`

// Login Mutation

export const mLogin = gql `
mutation loginUser($email : String, $password :  String){
  login(email:$email, password : $password){
      id
    email
  }
}`

// SignUp Mutation

export const mSignUp = gql `
mutation SignUp($email : String, $password :  String){
  signup(email:$email, password : $password){
      id
    email
  }
}`

// Adding Poem to User

export const mAddPoem2user = gql`
mutation addPoem2user($title: String, $userId:ID){
  addPoemToUser(title:$title, userId:$userId){
    id
    email
    poems{
      id
      title
    }
  }
}
`