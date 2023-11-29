import { Link } from 'react-router-dom'
import { TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserId } from './store/actions/userActions';

const Navbar = () => {

    const [inputValue, setInputValue] = useState('')
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
    
      const handleSubmit = () => {
        // Dispatch the user ID to the Redux store
        dispatch(setUserId(inputValue));
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
      };

    return ( 
        <nav className="navbar">
            {/* input field to change user ID i.e manual authorisation and authentication */}
            <div className="form-group">
            <TextField 
                label= "Enter user ID"
                variant='outlined'
                size='small'
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button variant='contained' size='small' onClick={handleSubmit}>
                Login
            </Button>
            {showAlert && (
                    <Alert severity="success" sx={{ marginLeft: 2 }}>
                        Logged in as User {inputValue}
                    </Alert>
                )}
            </div>
            <h1>My Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                <Link to="/explore" className="explore-link">Explore!</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;