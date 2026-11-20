import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name");
  }

  const name = args[0];
  const chance = Math.random() * 300;
  console.log(`Throwing a Pokeball at ${name}...`);
  const pokemon = await state.pokeAPI.fetchPokemon(name);
  if (chance > pokemon.base_experience) {
    console.log(`${name} was caught!`);
    state.pokedex[name] = pokemon;
  } else {
    console.log(`${name} escaped!`);
  }
}
