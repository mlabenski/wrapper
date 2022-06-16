const fetch = require('isomorphic-fetch');

exports.faunaFetch = async ({ query, variables }) => {
  console.log('within the fauna function')
  return await fetch('https://graphql.us.fauna.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(JSON.stringify(err, null, 2)));
};
