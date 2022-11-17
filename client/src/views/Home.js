import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav';
import List from '../components/List';
import axios from "axios";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import styles from "../components/Home.module.css"
import Container from 'react-bootstrap/Container';



const Home = () => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate()
    const [socket] = useState( () => io('/', {
        withCredentials:true,
        extraHeaders:{
            "my-custom-header": "abcd"
        }
    }) );

    const removeFromDom = petId => {
        setPets(pets.filter(pet => pet._id !== petId)); 
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
            .then(res => {
                console.log(res.data);
                setPets(res.data)
            })
            .catch((err)=> {
                console.log(err);
            })
    }, [])

    useEffect( () => {
        console.log('Socket is running');
        socket.connect()
        socket.on('receive_pets', (pets) => {
            console.log("Received Pets", pets)
            setPets(pets)
            return () => socket.disconnect(true);
        });
        socket.on('receive_removal', (data) => {
            console.log("Received Pet Id for Removal:", data)
            setPets(pets.filter( pet => pet._id !== data))
            return () => socket.disconnect(true);
        });
    }, [socket, pets] );



    return (
        <>
            <Nav/>
            <div className={styles.navlist}>
                <h2 className="btn text-white fs-5" onClick={()=> navigate('/pets/new')}><AddIcon color="primary"/>Add pet for adoption</h2>
            </div>
            <img width="100%" height="300" src="https://mattiesplace.ca/assets/img/mattie/adoption-banner.jpg" alt="Pets waiting for adoption" />
            <div className={styles.image}> 
                <h1 >Adopt a Pet Today!</h1>
            </div>
            <h2 className={styles.header}>Pets availabe for adoption near you</h2>
            <Container className="mt-5 d-flex justify-content-center gap-4 flex-wrap">
                <List pets={pets} setPets={setPets} removeFromDom={removeFromDom} />
            </Container>

        </>
    )
}

export default Home