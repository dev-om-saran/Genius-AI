import React from 'react'

import { useUser } from '@clerk/nextjs'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

const BotAvatar = () => {

  return (
   
    <Avatar className='h-8 w-8'>
        <AvatarImage className ="p-1" src = "/logo.png"/>
    </Avatar>
  )
}

export default BotAvatar;