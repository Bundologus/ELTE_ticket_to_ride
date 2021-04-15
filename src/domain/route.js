import PropTypes from 'prop-types';

export const Route = PropTypes.shape({
  id: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  fromCity: PropTypes.string.isRequired,
  toCity: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

export const RouteList = PropTypes.arrayOf(Route);
