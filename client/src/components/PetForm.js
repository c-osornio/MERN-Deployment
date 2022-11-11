import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from 'react-bootstrap/Container';

const PetForm = (props) => {
    const {onSubmitProp, like, errors, name, type, description, setName, setType, setDescription, skills, setSkills, image, setImage} = props;
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        const pet = {
            name,
            type,
            description,
            image,
            skills,
            like
        }
        onSubmitProp(pet)
    }

    const skillsList = [
        'Sit',
        'Potty Trained',
        'Roll-Over',
        'Fetch',
        'High Five',
        'Lay Down',
        'Kiss',
        'Wave',
        'Play Dead',
        'Dance',
        'Talk',
        'Come',
        'Stay',
        'Spin',
        'None'
    ]

    const typeList = [
        'Dog',
        'Cat',
        'Bird',
        'Rabbit',
        'Guinea Pig',
        'Fish',
        'Reptile',
        'Ferret',
        'Insect',
        'Turtle',
        'Hamster',
        'Mouse',
        'Rat',
        'Arachnid'
    ]

    const handleSkill = (e) => {
        if(e.target.checked ===true){
            let newList = [...skills]
            newList.push({skill:e.target.value})
            setSkills(newList)
        } else if (e.target.checked ===false){
            let newList = [...skills]
            newList = newList.filter((item,index)=>(item.skill !== e.target.value))
            setSkills(newList)
        }
    }

    return (
        <>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className="text-capitalize" onChange={ (e) => setName(e.target.value)} value={name} name="name" type="text" placeholder="Enter pet's name"/>
                        { 
                        errors.name && (<Form.Text className="text-danger fs-5">{errors.name.message}</Form.Text>)
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)} value={type} name="type">
                            <option>---- Select Pet Type ----</option>
                        {
                            typeList.map((item,index)=>(
                                <option key={index} value={item}>{item}</option>
                                ))
                        }
                        </Form.Select>
                        { 
                        errors.type && (<Form.Text className="text-danger fs-5">{errors.type.message}</Form.Text>)
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <FloatingLabel label="Pet's Description: ">
                            <Form.Control onChange={(e) => setDescription(e.target.value)} className="text-capitalize" value={description} name="description" type="text" as="textarea" style={{ height: '100px' }}/>
                        </FloatingLabel>
                        { 
                        errors.description && (<Form.Text className="text-danger fs-5">{errors.description.message}</Form.Text>)
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>JPG Image URL</Form.Label>
                        <Form.Control onChange={(e) => setImage(e.target.value)} value={image} name="image" type="text" placeholder="Enter jpeg image URL" />
                        { 
                        errors.image && (<Form.Text className="text-danger fs-5">{errors.image.message}</Form.Text>)
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add Skills (max 3): </Form.Label>
                        <Container>
                        {
                            skillsList.map( (item,index) => (
                                <FormControlLabel key={index} control={<Checkbox key={index} onChange={handleSkill} name="skills" value={item}  
                                checked={(skills.filter((i,idx)=>(i.skill=== item))).length === 1 ? true :false} />} label={item} />
                            ))
                        }
                        </Container>
                        { 
                        errors.skills && (<Form.Text className="text-danger fs-5">{errors.skills.message}</Form.Text>)
                        }
                    </Form.Group>
                    <Button variant="danger" className="me-3" onClick={()=> navigate('/pets')}>Cancel</Button>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
        </>
    );
};

export default PetForm;