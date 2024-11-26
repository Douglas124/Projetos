import Style from "../styles/user.module.css";
import $ from "jquery";
import nextConfig from "../next.config";
import React,{ useContext,useEffect,useState } from "react";

export function LinkMedia({eventid,id}) {
    const [mediaNome,setMedia] = useState("")
    const [description,setDescription] = useState("")
    const [directoryPath,setDirectory] = useState("")
    
    async function submitMedia(e) {
        e.preventDefault();

        const registerMediaBody = {
            mediaNome,
            description,
            directoryPath,
            id:eventid
        } 

        const registerMedia = await fetch (`${nextConfig.env.urlApi}/auth/media`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerMediaBody)
        })

        const retorno = await registerMedia.json();
    }

    function offMedia(e) {
        e.preventDefault();
        $(`#${id}`).css('display', 'none');
      }

    return (
        <div id={id.toString()} className={Style.media}>
            <form className={Style.formMedia}>

                <label>Media</label>
                <input
                    type="text"
                    placeholder="Media"
                    onChange={(e) => setMedia(e.target.value)}
                />

                <label>Descrição</label>
                <input
                    type="text"
                    placeholder="Descrição"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Directory</label>
                <input
                    type="file"
                    placeholder="Directory"
                    onChange={(e) => setDirectory(e.target.value)}
                />
                <button type="submit" onClick={submitMedia}>Criar Media</button>
                <button onClick={offMedia}>Cancelar</button>
            </form>
        </div>
    )
}
export default LinkMedia