import gql from 'graphql-tag';


// eslint-disable-next-line import/prefer-default-export
export const GET_NEWS = gql`
  query GetNews {
    news {
      title
      image
      tags
      url
      site
      date
      categories
    }
  }
`;
