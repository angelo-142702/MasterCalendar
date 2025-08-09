import  { useState } from 'react'
import Card from './true.jsx'
import { useAdmin } from '../context/adminProvider.jsx'
export function Suscribir(){

    const { selectedUser,  } = useAdmin()
    return (
        <div>
            <Card title={'suscribbcion de '+ selectedUser.name}> 

            </Card>
        </div>
    )
}