export function PlayerCard({ player, cartSVG }) {
  return (
    <div
      className={`m-3 ml-0 py-2 px-3 rounded-lg bg-player-${player.color} text-ttr-white shadow-md`}
    >
      <h2 className="font-smallCaps text-xl font-semibold mb-3 filter drop-shadow-md">
        {player.name}
      </h2>
      <div className="flex items-center mb-3 filter drop-shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-16"
          viewBox="0 0 50 18"
          fill="currentColor"
        >
          <path d="M10 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM15.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
          <path d="M34 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM39.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
          <path d="M5 2a1 1.3 0 00-1 1V11.5h-1.5v-1h-.5v3h.5v-1h1.5L4 13a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1a2.5 2.5 0 014.9 0H30a2.5 2.5 0 014.9 0h1.1a2.5 2.5 0 014.9 0H42a1 1 0 001-1v-.5h1.5v1h.5v-3h-.5v1h-1.5L43 3a1 1.3 0 00-1-1H5z" />
        </svg>
        <p className="block ml-2 filter drop-shadow-md">
          x <span className="font-number">{player.carts}</span>
        </p>
      </div>
      <div className="flex items-center mb-1 filter drop-shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 35 35"
          fill="currentColor"
        >
          <path d="M7 24.63 18.43 13.2l-.71-.7 1.42-1.43L17 8.89c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71V14.62l-1.47 1.42-.71-.71L9.13 26.76 7 24.63zM4 2A2 2 0 002 4V31A2 2 0 004 33H30A2 2 0 0032 31V4A2 2 0 0030 2Z" />
        </svg>
        <p className="block ml-1 mr-2 filter drop-shadow-md">
          x <span className="font-number">{player.trainCardCount}</span>
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 ml-3 filter drop-shadow-md"
          viewBox="0 0 35 35"
          fill="currentColor"
        >
          <path d="M17 23 14 7c1-1 5-1 6 0l-3 16zM18 25A1 1 0 0116 27A1 1 0 0118 25zM4 2A2 2 0 002 4V31A2 2 0 004 33h26A2 2 0 0032 31V4A2 2 0 0030 2Z" />
        </svg>
        <p className="block ml-1 filter drop-shadow-md">
          x <span className="font-number">{player.routeCardCount}</span>
        </p>
      </div>
    </div>
  );
}
