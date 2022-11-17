import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav';
import PetForm from '../components/PetForm';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import styles from '../components/PetForm.module.css';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';


const CreateView = () => {
    const [pets, setPets] = useState([]);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [image, setImage] = useState('');
    const [like, setLike] = useState(false);

    // let socket;
    // if (process.env.NODE_ENV === 'development') {
    //     socket = socketIOClient('http://127.0.0.1:8000');
    // }else {
    //     socket = useState(() => io('http://54.215.26.227/api'))
    // }
    
    const [socket] = useState( () => io('http://54.215.26.227/api') )
    // , {
    //     withCredentials:true,
    //     extraHeaders:{
    //         "my-custom-header": "abcd"
    //     }
    // }) );

    const navigate = useNavigate()

    const createPet = petParam => {
        axios.post('http://localhost:8000/api/pets', petParam)
            .then(res => {
                console.log(res.data)
                setPets([...pets, res.data])
                setName("")
                setType("")
                setDescription("")
                setSkills([])
                setImage("")
                setLike(false)
                socket.emit('new_pet', [...pets, res.data])
                navigate("/pets");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.error.errors)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
            .then(res => {
                console.log(res.data);
                setPets(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        console.log('Socket is running');
        socket.on('receive_pets', (pets) => {
            console.log("Received Pets", pets)
            setPets(pets)
            return () => socket.disconnect(true);
        });
        socket.on('receive_removal', (data) => {
            console.log("Received Pet Id for Removal:", data)
            setPets(pets.filter(pet => pet._id !== data))
            return () => socket.disconnect(true);
        });
    }, [socket, pets]);

    return (
        <>
            <Nav />
            <div className={styles.navlist}>
                <h2 className="btn text-white fs-5" onClick={() => navigate('/pets')}><HomeIcon color="primary" />Homepage</h2>
            </div>
            <Container className={styles.form}>
                <h2 className={styles.title}>Know a pet needing a home?</h2>
                <PetForm like={like} pets={pets} setProducts={setPets} name={name} type={type} description={description}
                    setName={setName} setType={setType} setDescription={setDescription} skills={skills} setSkills={setSkills}
                    image={image} setImage={setImage} onSubmitProp={createPet} errors={errors} />
            </Container>
        </>
    )
}

export default CreateView