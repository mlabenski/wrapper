const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./fauna');

exports.handler = async (_event, context) => {
  const { user } = context.clientContext;
  console.log(_event)
  console.warn(context)
  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.id,
    },
  });

  const { stripeID } = result.data.getUserByNetlifyID;

  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: process.env.URL,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(link.url),
  };
};
