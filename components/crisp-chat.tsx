"use client"
import {Crisp} from 'crisp-sdk-web'
import { useEffect } from 'react'

export const CrispChat = () =>{
    useEffect(()=> {
        Crisp.configure("8646e33b-6c14-4c2d-a091-068ceb5b2c4a")
    },[])

    return null;
}