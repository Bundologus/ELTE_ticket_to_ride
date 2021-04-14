import PropTypes from 'prop-types';

export const Route = PropTypes.shape({
  id: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  fromCity: PropTypes.string.isRequired,
  toCity: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

export const RouteList = PropTypes.arrayOf(Route);
