export function HandCard({ player }) {
  const routeCards = player.routeCards
    .sort((r1, r2) => {
      return r2.id - r1.id;
    })
    .map((route) => {
      return (
        <div
          key={route.id}
          className={
            'relative grid grid-rows-2 mb-1 rounded-md p-1 py-0.5 lg:p-1.5 ' +
            (route.id > 40 ? 'bg-gray-800' : 'bg-gray-500')
          }
        >
          <h3 className="text-2xs font-semibold">{route.fromCity}</h3>
          <h3 className="text-2xs font-semibold">{route.toCity}</h3>
          <p className="absolute top-0 right-0 bg-gray-200 rounded-b-full rounded-tl-full rounded-tr-lg font-number font-bold text-gray-800 text-center  text-xs h-4 w-6 lg:w-10 lg:h-10 lg:text-2xl lg:leading-custom">
            {route.value}
          </p>
        </div>
      );
    });

  return (
    <div className="h-full">
      <div
        className={`bg-player-${player.color} drop-shadow-md fixed p-1 px-3 rounded-full top-2 right-1/2 transform translate-x-1/2 max-w-xs md:max-w-sm lg:contents`}
      >
        <h2 className="font-smallCaps font-semibold drop-shadow-md truncate text-xs lg:mb-2 lg:text-xl">
          {player.name}
        </h2>
      </div>
      <h2 className="font-smallCaps font-semibold drop-shadow-md text-2xs whitespace-nowrap mb-1 lg:hidden">
        Your hand
      </h2>
      <div className="bg-gray-300 bg-opacity-20 rounded-md mb-2 text-sm p-0.5 py-1 lg:p-2 lg:text-xl">
        <div className="flex items-center filter drop-shadow-md mb-1.5 lg:mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-8 ml-0.5 lg:h-10 lg:w-20"
            viewBox="0 0 50 18"
            fill="currentColor"
          >
            <path d="M10 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM15.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
            <path d="M34 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM39.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
            <path d="M5 2a1 1.3 0 00-1 1V11.5h-1.5v-1h-.5v3h.5v-1h1.5L4 13a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1a2.5 2.5 0 014.9 0H30a2.5 2.5 0 014.9 0h1.1a2.5 2.5 0 014.9 0H42a1 1 0 001-1v-.5h1.5v1h.5v-3h-.5v1h-1.5L43 3a1 1.3 0 00-1-1H5z" />
          </svg>
          <p className="block filter font-number text-xs ml-1 lg:ml-2">
            x {player.carts}
          </p>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-around filter drop-shadow-md font-semibold text-gray-700 font-number text-sm">
          <div className="rounded-md bg-ttr-black flex content-center justify-center items-center w-5 h-5 lg:w-14 lg:h-14">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.black}
            </p>
          </div>
          <div className="rounded-md bg-ttr-blue flex content-center justify-center items-center w-5 h-5 lg:w-14 lg:h-14">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.blue}
            </p>
          </div>
          <div className="rounded-md bg-ttr-green flex content-center justify-center items-center w-5 h-5 lg:w-14 lg:h-14 lg:mt-3">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.green}
            </p>
          </div>
          <div className="rounded-md bg-ttr-orange flex content-center justify-center items-center mt-1 w-5 h-5 lg:w-14 lg:h-14 lg:mt-3">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.orange}
            </p>
          </div>
          <div className="rounded-md bg-ttr-pink flex content-center justify-center items-center mt-1 w-5 h-5 lg:w-14 lg:h-14 lg:mt-3">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.pink}
            </p>
          </div>
          <div className="rounded-md bg-ttr-red flex content-center justify-center items-center mt-1 w-5 h-5 lg:w-14 lg:h-14 lg:mt-3">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.red}
            </p>
          </div>
          <div className="rounded-md bg-ttr-white flex content-center justify-center items-center mt-1 w-5 h-5 lg:w-14 lg:h-14 lg:mt-3">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.white}
            </p>
          </div>
          <div className="rounded-md bg-ttr-yellow flex content-center justify-center items-center mt-1 w-5 h-5 lg:w-14 lg:h-14 lg:mt-3">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.yellow}
            </p>
          </div>
          <div className="rounded-md bg-ttr-locomotive flex content-center justify-center items-center mt-1 w-5 h-5 lg:w-14 lg:h-14 lg:mt-3">
            <p className="block text-center">
              <span className="hidden lg:block">x </span>
              {player.trainCards.locomotive}
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-gray-800 bg-opacity-30 overflow-y-auto rounded-md p-0.5 pt-1 pb-0 lg:p-2"
        id="routecard-box"
      >
        {routeCards}
      </div>
    </div>
  );
}
