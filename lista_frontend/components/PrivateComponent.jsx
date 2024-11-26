
import {useRouter} from "next/router";
import { useContext, useEffect, useState } from "react";
import nextConfig from "../next.config"
import { UserContext } from "../contexts/userid";

export default function PrivateComponent({children}) {    
    const [flag,setFlag] = useState(null);
    const router = useRouter();

    const {user} =  useContext(UserContext)

    useEffect(() => {
        async function tokenVerify() {
            const token = localStorage.getItem("token");

            const tokenVerifyResponse = await fetch(`${nextConfig.env.urlApi}/token/verify`,{
                method:"GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const {tokenInfo} = await tokenVerifyResponse.json()                        

            if (tokenVerifyResponse.status === 200) {
                setFlag(true);
            }else if (tokenVerifyResponse.status === 401){
                setFlag(false);
            }
        }
        tokenVerify();   
    },[]);
    
    if (flag === null) {
        return <h1>Loading...</h1>
    }

    if (flag) {
        return children;
    }else {
        router.push("/login");
    }
}