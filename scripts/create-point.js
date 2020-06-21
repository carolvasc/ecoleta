// Preenche o combo de cidades
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }

    })
}

populateUFs();

// Preenche o combo de cidades de acordo com o estado selecionado
function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then(res => res.json())
    .then(cities => {

      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities);


// Itens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

let selectedItems = [];
const collectedItems = document.querySelector('input[name=items]');

function handleSelectedItem(event) {
  const itemLi = event.target;
  const itemId = itemLi.dataset.id;

  // Adiciona ou remove uma classe CSS com JS
  itemLi.classList.toggle('selected');

  // Recupera os itens selecionados, caso hajam
  const alreadySelected = selectedItems.findIndex(item => item == itemId);

  // Adiciona ou remove a estilização de seleção dependendo do estado atual do item clicado
  if (alreadySelected >= 0) {
    selectedItems = selectedItems.filter(item => item != itemId);
  } else {
    selectedItems.push(itemId);
  }

  // Atualiza o campo escondido com os itens selecionados
  collectedItems.value = selectedItems;

}