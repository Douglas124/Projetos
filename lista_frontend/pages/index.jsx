
import React, { useState } from "react"
import Style from "../styles/Home.module.css";
import nextConfig from '../next.config';


export default function Home() {
  const [nome, setName] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [senha2, setSenha2] = useState("")
  const [flag, setFlag] = useState(false)
  const [erro, setErro] = useState("")

  async function submitForm(e) {
    e.preventDefault();

    const requestBody = {
      nome,
      email,
      senha,
      senha2
    }
    if (!nome || !email || !senha || !senha2) {
      setErro("Todos os espaços não foram preenchidos");
      setFlag(true)
      setTimeout(() => {
        setFlag(false);
      }, 2500);
    }
    else if (senha2 != senha) {
      setErro("Senhas não conferem");
      setFlag(true);
      setTimeout(() => {
        setFlag(false);
      }, 2500);
    }
    else {
      const registerResponse = await fetch(`${nextConfig.env.urlApi}/auth/signUp`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      const { message } = await registerResponse.json();
      
      if (registerResponse.status === 201) {
        window.location.href = "/login"
      } else if (registerResponse.status === 401) {
        setErro(message)
        setFlag(true);
        setTimeout(() => {
          setFlag(false);
        }, 2500);
      }

    }

  }

  return (
    <div className={Style.main}>
      <div className={Style.left_card}>
        <img className={Style.img} src="logo.jpg" alt="" />
      </div>
      <div className={Style.card_login}>
        <h1>Cadastre-se</h1>
        <form className={Style.form2}>
          {
            flag && <p className={Style.para}>{erro}</p>
          }
          <div className={Style.textfield}>
            <label>Nome</label>
            <input
              placeholder="Digite seu Nome..."
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={Style.textfield}>
            <label>Email</label>
            <input
              placeholder="Digite seu Email..."
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={Style.textfield}>
            <label>Senha</label>
            <input
              placeholder="Digite sua Senha..."
              type="password"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className={Style.textfield}>
            <label>Confirme</label>
            <input
              placeholder="Confirme sua senha..."
              type="password"
              onChange={(e) => setSenha2(e.target.value)}
            />

          </div>

          <button className={Style.btn_login} type="submit" onClick={submitForm}>Cadastre-se</button>
        </form>
        <a href="/login">Faça seu Login</a>
      </div>
    </div>
  )
}
