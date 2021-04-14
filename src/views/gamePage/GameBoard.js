export function GameBoard({ gameData }) {
  const cityMarkers = gameData.cities.map((city) => {
    const style = { top: city.y + '%', left: city.x + '%' };
    return (
      <div
        key={'city-' + city.id}
        className="absolute rounded-full border-2 border-red-500 w-3 h-3 transform -translate-y-1/2 -translate-x-1/2 xl:border-4 xl:w-6 xl:h-6"
        style={style}
        alt={city.city}
      ></div>
    );
  });

  const routeMarkers = gameData.console.log('map rendered');
  return (
    <>
      <div className="board relative col-span-6 row-span-5 mt-0 mb-2 mx-auto rounded-md lg:row-span-4 lg:col-span-5 lg:mb-0">
        {cityMarkers}
      </div>
    </>
  );
}
