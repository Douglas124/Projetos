import Style from "../../styles/user.module.css";
import PrivateComponent from "../../components/PrivateComponent"
import React ,{ useContext, useEffect, useState } from "react";
import nextConfig from '../../next.config';
import $ from "jquery"
import { CriarLista } from "../../components/CriarLista";
import { PegarDados } from "../../components/dados";
import submitMedia from "../../components/LinkMedia"



export default function evento() {
    const [events, setEvents] = useState([])
    const [media, setMedi] = useState([])
    const [user,setId] = useState("")
    
    useEffect(()=> {
        async function EssaPorra() {
            const {id,nome,email} = await JSON.parse(localStorage.getItem("user"))
            setId({id,nome,email})
            const {events,media} = await PegarDados(id)
            setEvents(events);
            setMedi(media)
        }
        EssaPorra()
    },[submitMedia],2000)
    
    
    const [Evento, setEvento] = useState("")
    
    
    async function submitEvent(e) {
        e.preventDefault();
        
        const registerBody = {
            nome: Evento,
            id:user.id
        }

        const registerEvent = await fetch(`${nextConfig.env.urlApi}/auth/event`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(registerBody)
          });
          const { id } = await registerEvent.json();         
    }
// ///////////////Media/////////////////////////
    
      function onEvento(e) {
        e.preventDefault();
        $('#Evento').css('display', 'block');
      }
      function offEvento(e) {
        e.preventDefault();
        $('#Evento').css('display', 'none');
      }

    return (
        <PrivateComponent>
            <div className={Style.body}>
                <nav className={Style.left_card}>
                       <img className={Style.Agenda} src = "/agenda.png"/>
                       <img className={Style.user} src = "/user.png"/>
                </nav>
                <div className={Style.right_card}>
                    <div>
                        <div id="Evento" className={Style.Evento}>
                        <form className={Style.form}>
                            <label>Evento</label>
                            <input 
                            type="text"
                            placeholder="Nome do Evento"
                            onChange={(e) => setEvento(e.target.value)}
                             />
                             <button id="criar" type="submit" onClick={submitEvent}>Criar Evento</button>
                             <button onClick={offEvento}>Cancelar</button>
                        </form>
                        </div>
                    </div>

                    <div className={Style.titulo}>
                        <h1>Eventos</h1>
                        <button onClick={onEvento}>+Evento</button>
                    </div>
                        <CriarLista
                        events = {events}
                        media = {media}
                        /> 
                </div>
            </div>
        </PrivateComponent>
    )

}