import PropTypes from 'prop-types';

export const cartItemShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
});
