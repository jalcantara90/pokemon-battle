export class PC {
  constructor(owner){
    this.owner = owner;
    this.pokemonList = [];
  }

  addPokemon(pokemon) {
    this.pokemonList.push(pokemon);
    console.log(`Se ha añadido ${pokemon.name} al PC de ${this.owner}`)
  }
}
