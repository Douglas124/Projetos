<script>
  let usuario = {
    name: '',
    email: '',
    password: ''
  }
  async function cadastrarUsuario() {
    const res = await fetch(`http://localhost:3000/api/auth/client/registration`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: usuario.name,
        email: usuario.email,
        password: usuario.password
      })
    });
    if (res.ok) {
      const json = await res.json();
      alert('Usuário cadastrado com sucesso', json);
      window.location.href = "/carrinho";
    } else {
      alert('Erro cadastrando usuário');
    }
  }

</script>

<h1>Cadastro de usuário</h1>

<form>
  Nome: <input type="text" bind:value={usuario.name} /><br/>
  E-Mail: <input type="email" bind:value={usuario.email} /><br/>
  Senha: <input type="password" bind:value={usuario.password} /><br/>
  <button on:click|preventDefault={cadastrarUsuario}>
    Me cadastrar
  </button>

</form>