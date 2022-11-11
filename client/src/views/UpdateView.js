import React from 'react'
import Nav from '../components/Nav';
import Update from '../components/Update';
import styles from '../components/Update.module.css';
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const UpdateView = () => {
    const navigate = useNavigate()

    return (
        <>
            <Nav />
            <div className={styles.navlist}>
                <h2 className="btn text-white fs-5" onClick={()=> navigate('/pets')}><HomeIcon color="primary"/>Homepage</h2>
            </div>
            <Update />
        </>
    )
}

export default UpdateView