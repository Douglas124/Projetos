import React,{useEffect } from "react";
import nextConfig from "../next.config";
import Style from "../styles/private.module.css"



export async function PegarDados(id) {

        const nome = {
            dados:id
        }
        const Dados = await fetch (`${nextConfig.env.urlApi}/auth/dados`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nome)
        })

        const {events,media} = await Dados.json();
        //console.log(dado)
        //console.log(media)
        return({
            events:events,
            media:media
        })
    }

