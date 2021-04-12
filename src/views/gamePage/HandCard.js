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
            'relative grid grid-rows-2 mb-1 p-1.5 rounded-md ' +
            (route.id > 40 ? 'bg-gray-800' : 'bg-gray-500')
          }
        >
          <h3 className="text-mg font-semibold">{route.fromCity}</h3>
          <h3 className="text-mg font-semibold">{route.toCity}</h3>
          <p className="absolute top-0 right-0 bg-gray-200 rounded-b-full rounded-tl-full rounded-tr-lg w-10 h-10 font-number font-bold text-gray-800 text-2xl text-center leading-custom">
            {route.value}
          </p>
        </div>
      );
    });
  return (
    <div className="h-full">
      <h2 className="font-smallCaps text-xl font-semibold drop-shadow-md mb-2">
        {player.name}
      </h2>
      <div className="grid grid-cols-1 grid-rows-2">
        <div className="bg-gray-300 bg-opacity-20 rounded-md p-2 mb-2 text-xl">
          <div className="flex items-center mb-3 filter drop-shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-20"
              viewBox="0 0 50 18"
              fill="currentColor"
            >
              <path d="M10 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM15.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
              <path d="M34 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM39.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
              <path d="M5 2a1 1.3 0 00-1 1V11.5h-1.5v-1h-.5v3h.5v-1h1.5L4 13a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1a2.5 2.5 0 014.9 0H30a2.5 2.5 0 014.9 0h1.1a2.5 2.5 0 014.9 0H42a1 1 0 001-1v-.5h1.5v1h.5v-3h-.5v1h-1.5L43 3a1 1.3 0 00-1-1H5z" />
            </svg>
            <p className="block ml-2 -mt-0.5 filter">x {player.carts}</p>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-around mb-3 filter drop-shadow-md font-semibold text-xl text-gray-700">
            <div className="w-14 h-14 rounded-md bg-ttr-black flex content-center justify-center items-center">
              <p className="block text-center">x {player.trainCards.black}</p>
            </div>
            <div className="w-14 h-14 rounded-md bg-ttr-blue flex content-center justify-center items-center">
              <p className="block text-center">x {player.trainCards.blue}</p>
            </div>
            <div className="w-14 h-14 rounded-md bg-ttr-green flex content-center justify-center items-center mt-3">
              <p className="block text-center">x {player.trainCards.green}</p>
            </div>
            <div className="w-14 h-14 rounded-md bg-ttr-orange flex content-center justify-center items-center mt-3">
              <p className="block text-center">x {player.trainCards.orange}</p>
            </div>
            <div className="w-14 h-14 rounded-md bg-ttr-pink flex content-center justify-center items-center mt-3">
              <p className="block text-center">x {player.trainCards.pink}</p>
            </div>
            <div className="w-14 h-14 rounded-md bg-ttr-red flex content-center justify-center items-center mt-3">
              <p className="block text-center">x {player.trainCards.red}</p>
            </div>
            <div className="w-14 h-14 rounded-md bg-ttr-white flex content-center justify-center items-center mt-3">
              <p className="block text-center">x {player.trainCards.white}</p>
            </div>
            <div className="w-14 h-14 rounded-md bg-ttr-yellow flex content-center justify-center items-center mt-3">
              <p className="block text-center">x {player.trainCards.yellow}</p>
            </div>
            <div className="w-14 h-14 rounded-md bg-ttr-locomotive flex content-center justify-center items-center mt-3">
              <p className="block text-center">
                x {player.trainCards.locomotive}
              </p>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-800 bg-opacity-30 p-2 overflow-y-auto rounded-md"
          id="routecard-box"
        >
          {routeCards}
        </div>
      </div>
    </div>
  );
}
