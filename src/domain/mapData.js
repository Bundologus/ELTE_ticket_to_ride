import PropTypes from 'prop-types';
import { CityList } from './city';
import { ConnectionList } from './connection';
import { RouteList } from './route';

export const MapData = PropTypes.shape({
  cities: CityList.isRequired,
  connections: ConnectionList.isRequired,
  routes: RouteList.isRequired,
  longRoutes: RouteList.isRequired,
});
