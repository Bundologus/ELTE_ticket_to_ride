export function NavPanel({ appState, setAppState }) {
  return (
    <div className="fixed top-0 left-0 w-screen bg-yellow-500 flex justify-between shadow-xl h:10 p-1 lg:h-14 md:p-2">
      <button onClick={() => setAppState("MAIN_PAGE'")}>
        <img src="logo_light.png" className="h-8 lg:h-10" alt="logo"></img>
      </button>
      <a
        href="https://cdn0.daysofwonder.com/tickettoride/en/img/te_rules_2015_en.pdf"
        target="_blank"
        rel="noreferrer"
        className="rounded border-1 border-yellow-700 bg-yellow-600 hover:bg-yellow-400 text-white text-center font-regular p-1 px-3 lg:p-2 lg:text-xl lg:px-4"
      >
        Read the rules
      </a>
    </div>
  );
}
