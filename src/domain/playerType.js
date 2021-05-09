import PropTypes from 'prop-types';
import { Route, RouteList } from './route';

export const TrainCardsHand = PropTypes.shape({
  black: PropTypes.number,
  blue: PropTypes.number,
  green: PropTypes.number,
  orange: PropTypes.number,
  pink: PropTypes.number,
  red: PropTypes.number,
  white: PropTypes.number,
  yellow: PropTypes.number,
  locomotive: PropTypes.number,
});

export const PlayerType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  score: PropTypes.number,
  carts: PropTypes.number,
  trainCardCount: PropTypes.number,
  trainCards: TrainCardsHand,
  routeCardCount: PropTypes.number,
  routeCards: RouteList,
  longRouteCard: Route,
  playerState: PropTypes.string,
});

export const PlayerListType = PropTypes.arrayOf(PlayerType);

export const testPlayers = [
  {
    id: 0,
    name: 'No silly, trains go CHOO!',
    color: 'green',
    score: 10,
    carts: 45,
    trainCardCount: 5,
    trainCards: {
      black: 1,
      blue: 0,
      green: 0,
      orange: 1,
      pink: 0,
      red: 0,
      white: 3,
      yellow: 0,
      locomotive: 1,
    },
    routeCardCount: 3,
    routeCards: [
      {
        id: '1',
        from: '3',
        to: '2',
        fromCity: 'Athina',
        toCity: 'Angora',
        value: '5',
        finished: false,
      },
      {
        id: '26',
        from: '21',
        to: '39',
        fromCity: 'Kyiv',
        toCity: 'Sochi',
        value: '8',
        finished: false,
      },
      {
        id: '27',
        from: '24',
        to: '47',
        fromCity: 'Madrid',
        toCity: 'Zurich',
        value: '8',
        finished: false,
      },
    ],
    longRouteCard: {
      id: '42',
      from: '6',
      to: '31',
      fromCity: 'Brest',
      toCity: 'Petrograd',
      value: '20',
      finished: false,
    },
  },
  {
    id: 1,
    name: 'Knock, knock!',
    color: 'blue',
    score: 50,
    carts: 45,
    trainCardCount: 4,
    trainCards: {
      black: 0,
      blue: 0,
      green: 0,
      orange: 0,
      pink: 0,
      red: 0,
      white: 0,
      yellow: 0,
      locomotive: 0,
    },
    routeCardCount: 2,
    routeCards: [],
    longRouteCard: null,
  },
  {
    id: 2,
    name: "Who's there?",
    color: 'yellow',
    score: 40,
    carts: 45,
    trainCardCount: 7,
    trainCards: {
      black: 0,
      blue: 0,
      green: 0,
      orange: 0,
      pink: 0,
      red: 0,
      white: 0,
      yellow: 0,
      locomotive: 0,
    },
    routeCardCount: 4,
    routeCards: [],
    longRouteCard: null,
  },
  {
    id: 3,
    name: 'Trains go.',
    color: 'red',
    score: 30,
    carts: 45,
    trainCardCount: 4,
    trainCards: {
      black: 0,
      blue: 0,
      green: 0,
      orange: 0,
      pink: 0,
      red: 0,
      white: 0,
      yellow: 0,
      locomotive: 0,
    },
    routeCardCount: 5,
    routeCards: [],
    longRouteCard: null,
  },
  {
    id: 4,
    name: 'Trains go who?',
    color: 'black',
    score: 20,
    carts: 45,
    trainCardCount: 4,
    trainCards: {
      black: 0,
      blue: 0,
      green: 0,
      orange: 0,
      pink: 0,
      red: 0,
      white: 0,
      yellow: 0,
      locomotive: 0,
    },
    routeCardCount: 3,
    routeCards: [],
    longRouteCard: null,
  },
];
