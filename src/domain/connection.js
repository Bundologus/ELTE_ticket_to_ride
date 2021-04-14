import PropTypes, { arrayOf } from 'prop-types';
import { City } from './city';

export const TrackElement = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export const TrackElementList = PropTypes.arrayOf(TrackElement);

export const Connection = PropTypes.shape({
  id: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  fromCity: PropTypes.string.isRequired,
  to: PropTypes.number.isRequired,
  toCity: PropTypes.string.isRequired,
  elements: TrackElementList.isRequired,
  color: PropTypes.string.isRequired,
  locomotive: PropTypes.number.isRequired,
});

export const ConnectionList = PropTypes.arrayOf(Connection);
