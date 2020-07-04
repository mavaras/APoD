import gql from 'graphql-tag';


// eslint-disable-next-line import/prefer-default-export
export const GET_ALL_PICTURES = gql`
  query GetAllPictures {
    allPictures {
      title
      explanation
      url
      author
      date
    }
  }
`;
