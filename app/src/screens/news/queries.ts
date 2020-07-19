import gql from 'graphql-tag';


export const GET_NEWS = gql`
  query GetNews {
    news {
      title
      image
      url
      site
      date
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetNews {
    launches {
      image
      typeName
      name
      location
      date
      wikiUrl
      infoUrls
      videoUrls
      latitude
      longitude
      description
    }
  }
`;
