import { State } from "./state.js";

export async function startREPL(state: State) {
  state.readline.prompt();

  state.readline.on("line", async (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.readline.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1);
    const command = state.commands[commandName];

    if (!command) {
      console.log("Unknown command");
      state.readline.prompt();
      return;
    }

    try {
      await command.callback(state, ...args);
    } catch (err) {
      console.log(`error: ${(err as Error).message}`);
    }

    state.readline.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
}
