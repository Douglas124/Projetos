import { browser } from '$app/environment';
import { writable } from 'svelte/store'

// valor padrão é uma lista vazia de produtos
let carrinhoInicial;
if (browser) {
  const dados = localStorage.getItem('carrinho');
  try {
    carrinhoInicial = dados ? JSON.parse(dados):[];
  } catch {
    carrinhoInicial = [];
  }

} else {
  carrinhoInicial = [];
}

export const carrinho = writable(carrinhoInicial);
carrinho.subscribe((carrinhoAtualizado) => {
  if (browser) {
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
  }
})

