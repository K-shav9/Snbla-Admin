import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;
export const MY_PROFILE = gql`
  query myProfile {
    myProfile {
      email
      id
    }
  }
`;
