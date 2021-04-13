export function HandPanel({ player }) {
  const routeCards = player.routeCards
    .sort((r1, r2) => {
      return r2.id - r1.id;
    })
    .map((route) => {
      return (
        <div
          key={'route-' + route.id}
          className={
            'relative grid grid-rows-2 mb-1 rounded-md p-1 py-0.5 lg:p-1.5 ' +
            (route.id > 40 ? 'bg-gray-800' : 'bg-gray-500')
          }
        >
          <h3 className="text-2xs font-semibold lg:text-xs">
            {route.fromCity}
          </h3>
          <h3 className="text-2xs font-semibold lg:text-xs">{route.toCity}</h3>
          <p className="absolute top-0 right-0 bg-gray-200 rounded-b-full rounded-tl-full rounded-tr-lg font-number font-bold text-gray-800 text-center  text-xs h-4 w-6 lg:w-7 lg:h-7 lg:text-lg xl:leading-custom">
            {route.value}
          </p>
        </div>
      );
    });

  const trainCards = Object.entries(player.trainCards)
    .sort((tc1, tc2) => {
      let tc1name = tc1[0];
      let tc2name = tc2[0];
      if (tc1name === 'locomotive') tc1name = 'z';
      if (tc2name === 'locomotive') tc2name = 'z';

      if (tc1name < tc2name) return -1;
      else if (tc1name > tc2name) return 1;
      else return 0;
    })
    .map(([color, count]) => {
      return (
        <div
          key={color + '-hand'}
          className={`rounded-md bg-ttr-${color} flex content-center justify-center items-center w-5 h-5 mb-1 lg:w-8 lg:h-8 lg:mb-1.5`}
        >
          <p className="block text-center">{count}</p>
        </div>
      );
    });

  return (
    <div className="h-full">
      <div
        className={`bg-player-${player.color} drop-shadow-md fixed p-1 px-3 rounded-full top-2 right-1/2 transform translate-x-1/2 max-w-xs md:max-w-sm lg:max-w-xl lg:top-3`}
      >
        <h2 className="font-smallCaps font-semibold drop-shadow-md truncate text-xs lg:text-xl">
          {player.name}
        </h2>
      </div>
      <h2 className="font-smallCaps font-semibold drop-shadow-md text-2xs whitespace-nowrap mb-1 lg:text-base">
        Your hand
      </h2>
      <div className="bg-gray-300 bg-opacity-20 rounded-md mb-2 p-0.5 py-1 lg:p-1.5">
        <div className="flex items-center filter drop-shadow-md mb-1.5 lg:mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-8 ml-0.5 lg:h-8 lg:w-16"
            viewBox="0 0 50 18"
            fill="currentColor"
          >
            <path d="M10 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM15.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
            <path d="M34 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM39.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
            <path d="M5 2a1 1.3 0 00-1 1V11.5h-1.5v-1h-.5v3h.5v-1h1.5L4 13a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1a2.5 2.5 0 014.9 0H30a2.5 2.5 0 014.9 0h1.1a2.5 2.5 0 014.9 0H42a1 1 0 001-1v-.5h1.5v1h.5v-3h-.5v1h-1.5L43 3a1 1.3 0 00-1-1H5z" />
          </svg>
          <p className="block filter font-number text-xs ml-1 lg:ml-1 lg:text-base">
            x {player.carts}
          </p>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-around filter drop-shadow-md font-semibold text-gray-700 font-number text-sm">
          {trainCards}
        </div>
      </div>
      <div
        className="bg-gray-800 bg-opacity-30 overflow-y-auto rounded-md p-0.5 pt-1 pb-0 lg:p-2 lg:pb-1"
        id="routecard-box"
      >
        {routeCards}
      </div>
    </div>
  );
}
