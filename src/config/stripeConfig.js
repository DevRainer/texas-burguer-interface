import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51U1nFBEkSu9oHLpLVKVvyqI13rdE1JQ2CSlE6qglkJNON3MPpfiYZm0comuunayrtxam3avi695diEYpm10T8Sg200q4upZOei',
);

export default stripePromise;
