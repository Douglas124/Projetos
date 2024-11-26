<script>
  // importando onMount do svelte, para executar uma função quando a página for carregada
  import { onMount } from 'svelte';
  // importando o store page, para pegar o id do produto
  import { page } from '$app/stores';

  // importando o store carrinho
  import { carrinho } from '../../../stores/carrinho';
  
  // criando uma variável para armazenar o ID do produto, que vem da URL
  const productId = $page.params.id;

  // criando uma variável para armazenar o produto, que será buscado na API
  let product;
  
  // função que será executada quando a página for carregada
  onMount(async () => {
    // fazendo uma requisição para a API, para buscar o produto
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);

    // verificando se a requisição foi bem sucedida
    if (res.ok) {
      // se sim, pegamos o JSON da resposta
      const json = await res.json();;
      // e armazenamos o produto na variável criada anteriormente
      product = json.product;
    }
  })

  async function adicionarCarrinho(product) {
    // criando um novo carrinho com os valores antigos adicionados do novo producID
    $carrinho = [...$carrinho, product];
    alert('Adicionado ao carrinho com sucesso!');
  }

</script>

<a href="/produtos">Voltar</a>

{#if product}
  Nome: {product.name}


  {product.name}<br/>
  {product.description}<br/>
  <img width="100px" alt="imagem do produto" src="http://localhost:3000/images/{product.photo}" />
  {product.categoryName || 'Sem Categoria'}<br/>
  <button
    on:click={() => adicionarCarrinho(product)}
  >Adicionar no carrinho</button>
{:else}
  Carregando produto...
{/if}