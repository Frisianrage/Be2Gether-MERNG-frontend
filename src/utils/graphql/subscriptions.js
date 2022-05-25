import { gql } from '@apollo/client'


// CHAT SUBSCRIPTIONS

export const NEW_MESSAGE_SUB = gql`
    subscription {
        newMessage{
            id
            content
        }
}
`

export const NEW_PLACE_SUB = gql`
    subscription{
        newPlace{
            id
            lat
            long
        }
    }
`



