import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import styles from './PetForm.module.css';
import PetForm from './PetForm';


const Update = (props) => {
    const { id } = useParams();
    const [pet, setPet] = useState({})
    const [errors, setErrors] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [image, setImage] = useState('');
    const [like, setLike] = useState(false);  

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
        .then((res) => {
            console.log(res.data);
            setPet(res.data);
            setName(res.data.name);
            setType(res.data.type);
            setDescription(res.data.description);
            setSkills(res.data.skills)
            setImage(res.data.image)
            setLike(res.data.like)
            setLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updatePet = petParam => {
        axios.put(`http://localhost:8000/api/pets/${id}`, petParam)
        .then((res) => {
            console.log(res.data);
            navigate("/pets");
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.error.errors)
        });
    };


    return (
        <div>
            <Container className= {styles.form}>
                <h2>Update {name}</h2>
                {
                    loaded && <PetForm onSubmitProp={updatePet} like={like} pet={pet} setPet={setPet} name={name} type={type} description={description} 
                    setName={setName} setType={setType} setDescription={setDescription} skills={skills} setSkills={setSkills} 
                    image={image} setImage={setImage} errors={errors}/>
                }
            </Container>

        </div>
    )
}

export default Update