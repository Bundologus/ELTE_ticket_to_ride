import PropTypes from 'prop-types';
import { PlayerType } from './playerType';
import { ConnectionList } from './connection';

export const Route = PropTypes.shape({
  id: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  fromCity: PropTypes.string.isRequired,
  toCity: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  finished: PropTypes.bool,
  connections: ConnectionList,
});

export const RouteList = PropTypes.arrayOf(Route);
