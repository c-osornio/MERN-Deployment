import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from '../components/Nav';
import styles from '../components/DetailsView.module.css';
import HomeIcon from '@mui/icons-material/Home';
import Container from 'react-bootstrap/Container';
import AdoptButton from '../components/AdoptButton';
import { Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const DetailsView = () => {
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [skills, setSkills] = useState([]);
    const [like, setLike] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then((res) => {
                console.log(res.data);
                setPet(res.data);
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setImage(res.data.image);
                setSkills(res.data.skills)
                setLike(res.data.like)
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, like]);

    const toggleLike = ()=> {
        const pet = {
            name,
            type,
            description,
            like: !like,
            skills,
            image
        }
        setPet(pet)
        axios.put(`http://localhost:8000/api/pets/${id}`, pet)
            .then((res) => {
                setLike(!like)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const removeFromDom = petId => {
        setPet(pet.filter(pet => pet._id !== petId));
    }

    return (
        <>
            <Nav/>
            <div className={styles.navlist}>
                <h2 className="btn text-white fs-5" onClick={()=> navigate('/pets')}><HomeIcon color="primary"/>Homepage</h2>
            </div>
            <h1 className={styles.name}>Hi! My name is {name}! 
            {
                like  ? <FavoriteIcon className="ms-4" /> : <FavoriteBorderIcon className="ms-4" />
            }
            </h1>
            <Container>
                <img className={styles.petImage} src=
                {
                    image ? image : "https://www.bpdvideo.com/wp-content/uploads/animali.png"
                } 
                alt={name} />
                <h3>I am a very cute <span className="text-lowercase">{type}</span>!</h3>
                {
                    (skills.length < 1) ? null : <h3>Skills: </h3>
                }
                {
                    skills.map((item, idx) => (
                        <ul className="ms-4" key={idx}>
                            <li><h4>{item.skill}</h4></li>
                        </ul>
                    )) 
                }
                
                <h3 className="mb-5 text-capitalize">Description: "{description}"</h3>
            </Container>
            <Container className="d-flex justify-content-center gap-5">
                <AdoptButton successCallBack={()=>removeFromDom(pet._id)} petId={pet._id}/>
                {
                    loaded && <Button variant="contained" size="small" color="warning" onClick={()=> navigate(`/pets/edit/${pet._id}`)}>Edit</Button>
                }
                <Button variant="contained" size="small" color="primary" onClick={()=> navigate('/pets')}>Go back</Button>
                {
                    like ? <Button variant="contained" size="small" color="warning" onClick={toggleLike}>Unlike</Button> : <Button variant="contained" size="small" color="warning" onClick={toggleLike}>Like</Button>
                }

            </Container>
        </>
    )
}

export default DetailsView