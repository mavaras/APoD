import gql from 'graphql-tag';


// eslint-disable-next-line import/prefer-default-export
export const GET_TODAY_PICTURE = gql`
  query GetTodayPicture {
    todayPicture {
      title
      explanation
      url
      author
      date
    }
  }
`;

export const GET_LAST_PICTURE = gql`
  query GetLastPicture {
    lastPicture {
      title
      explanation
      url
      author
      date
    }
  }
`;
