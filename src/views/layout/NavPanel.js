export function NavPanel({ setAppState }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-14 p-2 bg-yellow-500 text-white flex justify-between">
      <button onClick={() => setAppState("MAIN_PAGE'")}>
        <img src="logo_light.png" className="h-10" alt="logo"></img>
      </button>
      <a
        href="https://cdn0.daysofwonder.com/tickettoride/en/img/te_rules_2015_en.pdf"
        target="_blank"
        rel="noreferrer"
        className="rounded border-1 border-yellow-700 bg-yellow-600 text-lg text-center p-1 px-4 shadow-xl"
      >
        Read the rules
      </a>
    </div>
  );
}
