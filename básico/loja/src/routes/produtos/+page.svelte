<script>
  // Importando o hook onMount, responsável por executar uma função quando a página é carregada
  import { onMount } from "svelte";

  // Criando uma variável para armazenar os produtos
  let products = [];

  // Função que será executada quando a página for carregada
  onMount(async () => {
    // Fazendo uma requisição para a API, para buscar os produtos
    const res = await fetch('http://localhost:3000/api/products/search');

    // Verificando se a requisição foi bem sucedida
    if (res.ok) {
      // Se sim, pegamos o JSON da resposta
      const json = await res.json()
      // E armazenamos os produtos na variável criada anteriormente
      products = json.products;
    } else {
      // Em caso de erro, limpamos a variável
      products = [];
    }
  });
</script>

<h1>Produtos</h1>

<div>
  {#each products as product}
    <div class="produto">
      <div class="image">
        <img width="100px" alt="imagem do produto" src="http://localhost:3000/images/{product.photo}" />  
      </div>
      <div class="info">
        <div class="nome">
          {product.name}
        </div>
        <div class="descricao">
          {product.description}
        </div>
        <div class="categoria">
          Categoria:
          {product.categoryName || 'Sem Categoria'}<br/>
        </div>
      </div>


      <div class="detalhe">
        <a href="/produtos/{product.id}">Detalhar produto</a>
      </div>
    </div>
  {/each}

</div>


<style>
  .produto {
    border: 2px solid #ddd;
    margin: 10px;
    height: 100px;
    display: flex;
  }
  .produto .info {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }
  .produto .detalhe {
    margin-left: auto;
    margin-top: 20px;
  }
  .produto .detalhe a {
    background-color: cadetblue;
    color: white;
    font-weight: bold;
    text-decoration: none;
    padding: 5px;
  }

</style>
