import Style from "../styles/user.module.css";
import $ from "jquery";
import nextConfig from "../next.config";
import React,{ useContext,useEffect,useState } from "react";


export function Deletar(id,clas,nome) {
    
    async function deletar() {
        const deleteBody ={
            id:id,
            classe:clas
        }

        const deletDado = await fetch(`${nextConfig.env.urlApi}/auth/delete`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteBody)
          });
        
        const {message} = await deletDado.json()

        alert(message)

    }

    function offDel(e) {
        e.preventDefault();
        $(`#${nome+"LixoD"}`).css('display', 'none');
    }

    return (
        
        <div id={nome+"LixoD"} className={Style.showdel}>
            <div className= {Style.deletar}>
                <p className={Style.DelText1}>Deletar</p>
                <p className={Style.DelText2}>Deseja realmente excluir o item selecionado?</p>
                <button className={Style.BtnCan} onClick={offDel}>Cancelar</button>
                <button className={Style.BtnDel} onClick={deletar}>Apagar</button>
            </div>
        </div>
        
    )
}

export default Deletar