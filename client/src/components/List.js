import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AdoptButton from './AdoptButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';




const List = (props) => {
    const {pets, setPets, removeFromDom} = props;

    const navigate = useNavigate()
    
    const sortedPets= [...pets].sort( (a, b) => (a.type > b.type) ? 1 : -1 );

    
    useEffect( () => {
        axios.get('http://localhost:8000/api/pets')
            .then((res) => {
                console.log(res.data);
                setPets(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {
                sortedPets.map((item, idx) => (
                    <Card sx={{ maxWidth: 225}} key={idx}>
                        <CardActionArea>
                            <CardMedia 
                            component="img"
                            height="140"
                            image=
                            {
                                item.image ? item.image : "https://www.bpdvideo.com/wp-content/uploads/animali.png"
                            }
                            alt={item.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" className="text-capitalize">
                                {item.name} 
                                {
                                    item.like  ? <FavoriteIcon className="ms-4" /> : <FavoriteBorderIcon className="ms-4" />
                                }
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {item.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="mb-3 text-capitalize">
                                "{item.description}"
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className="d-flex justify-content-center">
                            <AdoptButton successCallBack={()=>removeFromDom(item._id)} petId={item._id}/>
                            <Button size="small" color="primary" variant="contained" onClick={() => navigate(`/pets/${item._id}`)} >
                                Details
                            </Button>
                            <Button size="small" color="warning" variant="contained" onClick={() => navigate(`/pets/edit/${item._id}`)} >
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                ))
            }
        </>
    )
}

export default List