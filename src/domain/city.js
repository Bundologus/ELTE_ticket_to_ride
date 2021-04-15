import PropTypes from 'prop-types';

export const City = PropTypes.shape({
  id: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export const CityList = PropTypes.arrayOf(City);
