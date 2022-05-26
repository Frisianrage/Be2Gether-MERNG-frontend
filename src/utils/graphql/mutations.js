import { gql } from '@apollo/client'


// USER MUTATIONS 

export const REGISTER_USER = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
        email: $email
        password: $password
      
    ) {
      id
      email
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    updateUser(
      updateInput: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
    }
  }
`;

export const UPDATE_USER_AVATAR = gql`
  mutation updateAvatar(
    $email: String!
    $name: String!
    $size: String!
    $type: String!
    $file: String!
  ) {
    updateAvatar(
      email: $email
      avatarInput: {
        name: $name
        size: $size
        type: $type
        file: $file
      }
    ) {
      id
      email
      avatar{
        name
        size
        type
        file
      }
    }
  }
`;

export const REQUEST_CONNECTION = gql`
  mutation($connectionId: ID!) {
  requestConnection(connectionId: $connectionId){
    id
    persons {
      id
      firstname
      lastname
      email
    }
    status
    requester
  } 
}
`;

export const ACCEPT_REQUEST_CONNECTION = gql`
  mutation($connectionId: ID!) {
    acceptRequestConnection(connectionId: $connectionId){
    id
    persons {
        id
      	firstname
        lastname
        email
      }
      status
      requester
    
  } 
  }
`;

export const DELETE_CONNECTION = gql`
  mutation($connectionId: ID!) {
    deleteConnection(connectionId: $connectionId){
      id
    persons {
        id
      	firstname
        lastname
        email
      }
      status
      requester
    }
  
  }
`;


// CHAT MUTATIONS

export const NEW_MESSAGE = gql`
    mutation($content: String! $messagetype: String!){
        createMessage(content: $content messagetype: $messagetype){
            user {
              id 
              email
            }
            content
            messagetype
        }
    }
`

// MAP MUTATIONS

export const CREATE_PLACE = gql`
  mutation($lat: String! 
          $long: String!){
    createPlace(lat: $lat 
                long: $long
      ){
      id
      lat
      long
    }
  }
`

export const UPDATE_PLACE = gql`
  mutation updatePlace(
    $id: ID!
    $title: String! 
    $body: String! 
    $city: String! 
    $address: String! 
    $country: String! 
    $zip: String! 
    $begin: String! 
    $end: String!
  ) {
    updatePlace(
      placeInput: {
        id: $id
        title: $title 
        body: $body 
        city: $city 
        address: $address 
        country: $country 
        zip: $zip 
        begin: $begin 
        end: $end
      }
    ) {
      id
      title
      body
      city
      address
      country
      zip
      img{
        id
        name
        type
        size
        file
      }
      begin
      end
    }
  }
`

export const DELETE_PLACE = gql`
  mutation($placeId: ID!){
    deletePlace(placeId: $placeId){
      id
      user {
        id
      }
      partner {
        id
      }
      places {
        id
        city
      }
    }
  }
`;

export const ADD_PLACE_IMG = gql`
  mutation addPlaceImg(
    $img: ImageInput
    $placeId: ID!
  ) {
    addPlaceImg(
      placeImageInput: {
        img: $img
        placeId: $placeId
      }
    ) {
      img{
        name
      }
    }
  }
`

export const DELETE_PLACE_IMG = gql`
  mutation($imgId: ID! $placeId: ID!){
    deletePlaceImg(imgId: $imgId placeId: $placeId){
      id
      title
      body
      city
      address
      country
      zip
      img{
        name
        type
        size
        file
      }
      begin
      end
    }
  }
`