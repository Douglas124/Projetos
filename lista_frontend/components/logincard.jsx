import Style from "../styles/Home.module.css";

function Logi({flag,Email,Senha,click,error}) {
    return(
        <div className={Style.main}>
            <div className={Style.left_card}>
                <img className={Style.img} src="logo.jpg" alt="" />
            </div>

            <div className={Style.card_login}>
                <h1>Login</h1>
                {
                    flag && <p className={Style.para}>{error}</p>
                }
                <form className={Style.form}>
                    <div className={Style.textfield}>
                        <label>Email</label>
                        <input
                            placeholder="Digite seu Email..."
                            type="email"
                            onChange={(e) => Email[e.target.value]}
                        />
                    </div>
                    <div className={Style.textfield}>
                        <label>Senha</label>
                        <input
                            placeholder="Digite sua Senha..."
                            type="password"
                            onChange={(e) => Senha[e.target.value]}
                        />
                    </div>
                    <button className={Style.btn_login} type="submit" onClick={click}>Login</button>
                </form>
            </div >
        </div >
         )}
         export default Logi;