export function buildItemList(pokemon, parent) {
  const $li = document.createElement('li');
  $li.innerText = pokemon.name;

  parent.appendChild($li);
}