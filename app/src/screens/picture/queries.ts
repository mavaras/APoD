import gql from 'graphql-tag';


// eslint-disable-next-line import/prefer-default-export
export const GET_TODAY_PICTURE = gql`
  query GetTodayPicture {
    todayPicture {
      title
      description
      url
      author
      date
    }
  }
`;
