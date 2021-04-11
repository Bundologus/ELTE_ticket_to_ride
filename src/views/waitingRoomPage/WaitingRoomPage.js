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
    <div className="container px-16 h-screen font-regular z-10">
      <div className="h-full flex flex-col justify-center content-center">
        <div className="block mx-auto p-6 rounded-md border-2 border-yellow-400 border-opacity-100 bg-yellow-200 bg-opacity-80">
          <h1 className="block text-2xl text-center mb-8">
            Wellcome to the Waiting Room, {playerName}!
          </h1>
          <p className="block mb-1 text-lg text-center">Your game's id is:</p>
          <p className="block mb-6 font-smallCaps font-semibold text-5xl text-center">
            {gameID}
          </p>
          <p className="block text-xl text-center">
            Waiting for the rest of the players...
          </p>
        </div>
        <div className="flex align-middle justify-center mx-auto">
          <button
            className="rounded-md bg-gray-600 border-gray-900 border-2 hover:bg-gray-500 text-white text-2xl justify-self-right mt-5 mr-3 px-5 w-28"
            onClick={(e) => setAppState('MAIN_PAGE')}
          >
            Back
          </button>
          <button
            className="rounded-md bg-green-600 border-green-900 border-2 hover:bg-green-500 text-white text-2xl justify-self-left mt-5 ml-3 px-5 w-28"
            onClick={(e) => setAppState('IN_GAME')}
          >
            Start!
          </button>
        </div>
      </div>
    </div>
  );
}
