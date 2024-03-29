import React, { useState } from 'react'
import axios from 'axios';
import io from 'socket.io-client';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const AdoptButton = (props) => {
    
    const { petId } = props;

    const navigate = useNavigate();

    const [socket] = useState( () => io(':8000' ))
    // , {
    //     withCredentials:true,
    //     extraHeaders:{
    //         "my-custom-header": "abcd"
    //     }
    // }) );

    const adoptPet = e => {
        axios.delete('http://localhost:8000/api/pets/' + petId)
            .then(res=>{
                console.log(res)
                socket.emit('remove_pet', petId )
                navigate('/pets')
            })
    }

    return (
        <>
            <Button size="small" color="primary" onClick={adoptPet} variant="contained">Adopt!</Button>
        </>
    )
}
export default AdoptButton;