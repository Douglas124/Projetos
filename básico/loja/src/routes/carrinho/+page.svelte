<script>

  import { carrinho } from '../../stores/carrinho';
  
  // dados do usuário
  let usuario = {
    email: '',
    senha: ''
  
  };
  
  async function limparCarrinho() {
    $carrinho = [];
  }
  
  async function finalizarCompra() {
    const productIDs = $carrinho.map((product) => product.id);
    const res = await fetch(`http://localhost:3000/api/auth/client/sign_in`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: usuario.email,
          password: usuario.senha
        })
      });
      if (res.ok) {
        const json = await res.json();
        const client = json.client;
        const res2 = await fetch(`http://localhost:3000/api/sales`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${client.token}`
          },
          body: JSON.stringify({
            productIDs: productIDs
          })
        });
        if (res2.ok) {
          const json2 = await res2.json();
          alert(`Compra codigo ${json2.sale.id} realizada com sucesso`);
          $carrinho = [];
        } else {
          alert('Erro realizando compra')
        }
      } else {
        alert('Erro no e-mail/senha')
      }
  
  }
  
  </script>
  
  <h2>Carrinho de compras</h2>
  
  {#if $carrinho && $carrinho.length > 0}
  
  <br/>
    Itens: {$carrinho.length}<br/>
    <button on:click={limparCarrinho}>
      Limpar Carrinho
      </button>
    <ul>
    {#each $carrinho as product}
      <li>
        <img width="100px" alt="imagem do produto" src="http://localhost:3000/images/{product.photo}" align="center"/>
        {product.name}
      </li>
    {/each}
    </ul>
  
    <h2>Finalizar compra</h2>
  
    <a href="/cadastro">Quero me cadastrar</a><br/>
    E-Mail: <input bind:value={usuario.email} /><br/>
    Senha: <input bind:value={usuario.senha} /><br/>
    <button on:click={finalizarCompra}>
      Finalizar Compra
    </button>
  
  {:else}
    Carrinho vazio
  
  {/if}