import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const state = initState(30_000);
  startREPL(state);
}

main();
