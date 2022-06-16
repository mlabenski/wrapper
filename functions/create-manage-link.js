const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./fauna');

exports.handler = async (_event, context) => {
  const user = context.clientContext.custom.netlify;
  console.log('context is')
  console.log(context)
  console.log('event is')
  console.log(_event)
  console.log('user is')
  console.log(user)

  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user,
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
