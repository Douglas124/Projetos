<script>
  import { carrinho } from '../stores/carrinho';
</script>
  
<div>
  <div class="cabecalho">
    <a href="/">PET TOP STORE</a>
  </div>
  <div class="menu">
    <a href="/produtos">Produtos</a> |
    Carrinho: {$carrinho.length}
    <a href="/carrinho">Ver itens</a>
  </div>
  <div class="conteudo">
    <slot />
  </div>
</div>

<style>
  .cabecalho {
    background-color: azure;
    font-size: 3em;
    font-family: monospace;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .menu {
    font-size: 1.5em;
    font-family: monospace;
    border: 1px solid gray;
    padding: 5px;
  }
  .conteudo {
    font-size: 1em;
    font-family: monospace;
    border: 1px solid gray;
    padding: 5px;
  }
</style>