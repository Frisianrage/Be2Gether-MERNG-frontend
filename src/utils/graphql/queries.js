import { gql } from '@apollo/client'


// USER QUERIES

export const GET_USER_BY_EMAIL = gql`
query ($email: String!){
  getUserByEmail(email: $email){
    id
    firstname
    lastname
    email
  }
}
`

export const GET_USER_DETAILS = gql`
  query{
    getUserDetails{
        id
        email
        firstname
        lastname
        avatar{
            file
        }
        partner {
            user{
                id
                firstname
                lastname
                email
                avatar{
                    file
                }
                }
            status
        }
        }
    }
`;

export const MAP_CHAT_CHECK = gql`
    query{
        mapChatCheck{
            id
            chat{
                id
            }
            map{
                id
            }
        }
    }
`


// CHAT QUERIES

export const GET_CHAT = gql`
    query{
        getChat{
            id
            firstname
            chat {
                id
                messages {
                    user {
                        id
                    }
                    content
                    messagetype
                    id
                    createdAt
                }
            }
        }
    }
`

// MAP QUERIES

export const GET_MAP = gql`
    query{
        getMap{
            id
            map{
                id
                places {
                    id
                    city
                    address
                    country
                    zip
                    title
                    body
                    img {
                        name, 
                        type,
                        size,
                        file
                    },
                    lat
                    long
                    begin
                    end
                }
            }
        }
    }
`

export const GET_PLACE = gql`
    query($id: ID!){
        getPlace(id: $id){
            id
            city
            address
            country
            zip
            title
            body
            img {
                name, 
                type,
                size,
                file,
                id
            }
            begin
            end
        }
    }
`

export const GET_PLACE_IMAGES = gql`
    query($id: ID!){
        getPlaceImages(id: $id){
            name, 
            type,
            size,
            file,
            id
        }
    }
`


// ADMIN QUERIES

export const GET_USER_BY_ID = gql`
  query ($userId: ID!){
    getUserById(userId: $userId){
        email
        firstname
        lastname
        partner {
            user{
                id
                firstname
                lastname
                email
                }
            status
        }
        }
    }
`;