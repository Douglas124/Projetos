
import React, { useState } from "react"
import nextConfig from "../next.config"
import Logi from "../components/logincard"
import Style from "../styles/Home.module.css";



export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const [flag, setFlag] = useState(false)

    async function submitForm(e) {
        e.preventDefault();

        const requestBody = {
            email,
            senha,
        }

        if (!email || !senha) {
            setErro("Todos os espaços não foram preenchidos");
            setFlag(true)
            setTimeout(() => {
              setFlag(false);
            }, 2500);}

        const loginResponse = await fetch(`${nextConfig.env.urlApi}/auth/signIn`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const { message, token,user} = await loginResponse.json();

        if (loginResponse.status === 401) {
            setErro(message)
            setFlag(true);
            setTimeout(() => {
            setFlag(false);
            }, 2500);
          }else if (loginResponse.status === 200) {
            window.location.href = `/Evento/${user.id}`
            localStorage.setItem("token", token)
            localStorage.setItem("user",JSON.stringify(user))
          };
    }

    return (
        <div className={Style.main}>
            <div className={Style.left_card}>
                <img className={Style.img} src="logo.jpg" alt="" />
            </div>

            <div className={Style.card_login}>
                <h1>Login</h1>
                {
                    flag && <p className={Style.para}>{erro}</p>
                }
                <form className={Style.form}>
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
                    <button className={Style.btn_login} type="submit" onClick={submitForm}>Login</button>
                </form>
                <a href="/">Faça seu Cadastro</a>
            </div >
        </div >
   )
}
