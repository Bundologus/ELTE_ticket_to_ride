import PropTypes from 'prop-types';

export const TrackElement = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  rotation: PropTypes.number,
});

export const TrackElementList = PropTypes.arrayOf(TrackElement);

export const Connection = PropTypes.shape({
  id: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  fromCity: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  toCity: PropTypes.string.isRequired,
  elements: TrackElementList.isRequired,
  color: PropTypes.string.isRequired,
  locomotive: PropTypes.number.isRequired,
  built: PropTypes.bool,
});

export const ConnectionList = PropTypes.arrayOf(Connection);
