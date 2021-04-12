import { v4 as uuidv4 } from 'uuid';

export function WaitingRoomPage({
  gameID,
  setGameID,
  setAppState,
  playerName,
}) {
  if (!gameID) {
    setGameID(uuidv4());
  }

  return (
    <div className="container h-screen font-regular z-10 pt-10 md:pt-14 md:px-16 lg:py-14">
      <div className="h-full flex flex-col justify-center content-evenly lg:content-center p-4">
        <div className="block mx-auto rounded-md border-2 border-yellow-400 border-opacity-100 bg-yellow-200 bg-opacity-80 p-2 md:p-6">
          <h1 className="block text-lg text-center mb-1 mt-2 lg:mb-8 lg:mt-0 lg:text-2xl">
            Wellcome to the Waiting Room, {playerName}!
          </h1>
          <p className="block text-center lg:text-lg lg:mb-1">
            Your game's id is:
          </p>
          <p className="block font-smallCaps font-semibold text-center text-3xl mb-3 lg:text-5xl lg:mb-6">
            {gameID}
          </p>
          <p className="block text-center lg:text-xl">
            Waiting for the rest of the players...
          </p>
        </div>
        <div className="flex align-middle justify-center mx-auto">
          <button
            className="rounded-md bg-gray-600 border-gray-900 border-2 hover:bg-gray-500 text-white justify-self-right mt-5 mr-3 w-24 lg:px-5 lg:w-28 text-lg lg:text-2xl"
            onClick={(e) => setAppState('MAIN_PAGE')}
          >
            Back
          </button>
          <button
            className="rounded-md bg-green-600 border-green-900 border-2 hover:bg-green-500 text-white justify-self-left mt-5 ml-3 w-24 lg:px-5 lg:w-28 text-lg lg:text-2xl"
            onClick={(e) => setAppState('IN_GAME')}
          >
            Start!
          </button>
        </div>
      </div>
    </div>
  );
}
