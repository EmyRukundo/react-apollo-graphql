import React, { Fragment } from 'react';
import Link from '../../Link';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Button from './Button';
import '../style.css';
import REPOSITORY_FRAGMENT from '../fragments';

const STAR_REPOSITORY = gql`
     mutation($id: ID!) {
         addStar(input: {starrabledId: $id}){
             starrable {
                 id
                 viewerHasStarred
             }
         }
     }`;

     const RepositoryList = ({ repositories, fetchMore }) => (
         <Fragment>
             {repositories.edges.map(({ node}) => (

             ))}
             {repositories.pageInfo.hasNextPage && (
                 <button
                 type="button"
                 onClick={() => 
                fetchMore({
                    /* configuration object */
                    variables: {
                        cursor: repositories.pageInfo.endCursor,
                    },
                })
            }
                >
                    More repositories
                    </button>
             )}
         </Fragment>
     );
     const updateAddStar = (
         client,
         { data : { addStar: { starrable: { id } } } },
     ) => {
         const repository = client.readFragment({
             id: `Repository;${id}`,
             fragment: REPOSITORY_FRAGMENT,
         });
         const totalCount = repository.stargazers.totalCount + 1;

         client.writeFragment({
             id: `Repository:${id}`,
             fragment: REPOSITORY_FRAGMENT,
             data: {
                 ...repository,
                 stargazers: {
                     ...repository.stargazers,
                     totalCount,
                 },
             },
         });

     };


     const updateWatch = (
         client,
         {
             data : {
                 updateSubscription: {
                     subscribable: { id, viewerSubscription },
                 },
             },
         },
     ) => {
         const repository = client.readFragment({
             id: `Repository:${id}`,
             fragment: REPOSITORY_FRAGMENT,
         });
         let { totalCount } = repository.watchers;
         totalCount = 
         viewerSubscription === VIEWER_SUBSCRIPTION.SUBSCRIBED
         ? totalCount + 1
         : totalCount - 1;

         client.writeFragment({
             id: `Repository:${id}`,
             fragment: REPOSITORY_FRAGMENT,
             data: {
                 ...repository,
                 watchers: {
                     ...repository.watchers,
                     totalCount,
                 },
             },
         });
     };

const RepositoryItem = ({
    id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>
      <div>
          {!viewerHasStarred ? (
          <Mutation           mutation={WATCH_REPOSITORY}
          variables={{
            id,
            viewerSubscription: isWatch(viewerSubscription)
              ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
              : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
          }}
          optimisticResponse={{
            updateSubscription: {
              __typename: 'Mutation',
              subscribable: {
                __typename: 'Repository',
                id,
                viewerSubscription: isWatch(viewerSubscription)
                  ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                  : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
              },
            },
          }}
          update={updateWatch}>
             {(addStar, { data, loading, error }) =>( 
                 <Button 
                 className={'repositoryItem-title-action'}
                 onClick={addStar}
                 >
                    {stargazers.totalCount} Star
                 </Button>
             )}
          </Mutation>
          ) : (<span>{ /*put something specific} */}</span>)}
          {/* update your subcription mutation */}
      </div>
      <div className="RepositoryItem-title-action">
        {stargazers.totalCount} Stars
      </div>
    </div>
    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && (
            <span>Language: {primaryLanguage.name}</span>
          )}
        </div>
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);
export default RepositoryItem;
