import React from 'react';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';
import RepositoryList from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import RepositoryList, { REPOSITORY_FRAGMENT } from '../Repository';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
          pageInfo {
              endCursor
              hasNextPage
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;
// render prop

// const Profile = () =>( 
// <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
//    {({data, loading, error}) => {
//        if(error){
//            return <ErrorMessage error={error} />
//        }
//        const { viewer } = data;
//        if( loading || !viewe) {
//            return <Loading />;
//        }
//        return <RepositoryList repositories={viewer.repositories} />;
//    }}
// </Query>
// )


const updateAddStar = (
    client,
    { data: { dataStar: { starrable: { id }}}},
) => {

};


// const Profile = ({ data, loading, error }) => {
//     if(error) {
//         return <ErrorMessage error={error} />;
//     }

//     const { viewer } = data;

//     if(loading || viewer) {
//         return <Loading />;
//     }
//     return <RepositoryList repositories={viewer.repositories} />; 
// }

const Profile = () =>(
    <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
        {({ data, loading, error, fetchMore }) => {


return (
    <RepositoryList
    repositories={viewer.repositories} fetchMore={fetchMore}
    />
);
        }}
    </Query>
) 
export default  graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);
