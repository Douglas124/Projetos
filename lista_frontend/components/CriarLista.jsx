import React,{ useContext,useEffect,useState } from "react";
import Style from "../styles/user.module.css";
import LinkMedia from "./LinkMedia";
import Deletar from "./deletar";
import nextConfig from "../next.config";
import $ from "jquery";
import evento from "../pages/Evento/[id]";


export function CriarLista({events,media}) {
    
    async function deletar(id,classe) {



        const deleteBody ={
            id:id,
            classe:classe
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
    const [idDel,SetDel]= useState(Number)
    

    async function onDel(nome,id) {
        $(`#${nome+"LixoD"}`).css('display', 'block');
        await SetDel(id);
    }
    function onMedia(id) {
        $(`#${id}`).css('display', 'block');
    }
    function hidden(info) {
        $(`#${info}`).slideToggle();
    }
    function hiddenLixo(info) {
        $(`#${info}`).toggle()
    }
    return( 
        <div className={Style.Lista}>
        {events.map((dad,Einfo) => (
                    <>
                    <Deletar
                        nome = {dad.nome}
                        clas= {"evento"}
                        id={idDel}                  
                    />
                    <LinkMedia
                    eventid={dad.id}
                    id = {dad.nome}                
                    />
                <ul key={Einfo+"A"} className={Style.EList}>
                    <li key={Einfo+"B"} 
                    onMouseEnter={(e) =>hiddenLixo(Einfo+"LixoE")} 
                    onMouseLeave={(e) =>hiddenLixo(Einfo+"LixoE")}
                    >
                        < img 
                            id={Einfo+"LixoE"} 
                            className={Style.Lixo} 
                            onClick={(e) =>onDel(dad.nome,dad.id)} 
                            src="/lixotomate.png"/>
                        
                        <p>{dad.nome}</p> 

                        < img 
                            className={Style.adicionar} 
                            onClick={(e) =>onMedia(dad.nome)} 
                            src="/adicionar.png" 
                            alt="adicionar" /> 
                        < img 
                            className={Style.arrow} 
                            onClick={(e) =>hidden(Einfo+"E")}
                            src="/arrowb.png"/>
                    </li>
                    
                    <ul key={Einfo+"C"} id={Einfo+"E"} className={Style.MList}>
                        {media.map((med,Minfo) => {
                            if (med.eventId == dad.id) {
                                <Deletar
                                nome = {med.nome}
                                clas= {"media"}
                                id={idDel}                  
                                />
                                return (
                                 <>
                                <li key={Einfo+"D"}
                                onMouseEnter={(e) =>hiddenLixo(Minfo+"LixoM")} 
                                onMouseLeave={(e) =>hiddenLixo(Minfo+"LixoM")}
                                >
                                    < img 
                                        id={Minfo+"LixoM"}
                                        className={Style.Lixo} 
                                        onClick={(e) => onDel(med.nome,med.id)} 
                                        src="/lixotomate.png"/>
                                    <p>{med.nome}</p> 
                                    < img 
                                        className={Style.arrow} 
                                        onClick={(e) =>hidden(Minfo+"M")} 
                                        src="/arrowb.png" />
                                </li>
                                <ul key={Einfo+"E"} style={{display: "none"}} id={Minfo+"M"}>
                                    <li key={Einfo+"F"} >Descrição:{med.description} </li>
                                    <li key={Einfo+"G"} >Conteudo: {med.directoryPath}</li>

                                    </ul>
                                 </>   
                                )
                            };
                        }                           
                        )}
                    </ul>
                </ul>
            </>
        ))}
        </div>
    )
}
export default CriarLista