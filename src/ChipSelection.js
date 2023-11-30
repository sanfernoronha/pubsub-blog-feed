import { Typography, Chip, IconButton } from '@mui/material'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


export default function ChipSelection({tags}) {

  const userId = useSelector((state) => state.user.userId)
  const history = useHistory()
  const interestList = tags
    
    const [selectedChips, setSelectedChips] = useState([])
    const handleChipClick = (interest) => {
        if (selectedChips.includes(interest)) {
          // If the chip is already selected, remove it
          setSelectedChips((prevSelectedChips) =>
            prevSelectedChips.filter((chip) => chip !== interest)
          );
        } else {
          // If the chip is not selected, add it to the selectedChips list
          setSelectedChips((prevSelectedChips) => [...prevSelectedChips, interest]);
        }
      };


      const handleAccept = async () => {
        console.log('Accepted');
        console.log('Subscribing to ', selectedChips, 'topics')

        try {
          const response = await fetch(`http://localhost:3001/subscribe/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tags: selectedChips }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data.message); // Log the success message or handle as needed
          history.push('/')
          
        } catch (error) {
          console.error('Error subscribing to tags:', error);
          // Handle the error, show a notification, or perform other actions
        }
        

        console.log('Redirecting to home page')
      }

      const handleDecline = () => {
        console.log('Declined')
        setSelectedChips([])
      }
  return (
    <div style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
        <Typography variant='h4' color='textSecondary'>Explore more areas of interest !</Typography>
        <br />
        <div className="interest-chips" style={{justifyContent: 'center'}}>
            {interestList.map((interest, index) => (
                <Chip
                key={index}
                label={interest}
                className={`interest-chip`}
                variant={selectedChips.includes(interest) ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleChipClick(interest)}
                color={selectedChips.includes(interest) ? 'primary' : 'default'}
                />
            ))}
    </div>
    {selectedChips.length > 0 && (
        <Typography variant='h6' color='textSecondary' style={{marginTop: 50}}>
          Do you want to subscribe to {selectedChips.length} {selectedChips.length === 1 ? 'topic' : 'topics'}?
        </Typography>
      )}

{selectedChips.length > 0 && (
    <div className="confirmation" style={{marginTop: 20}}>
    <IconButton  color="success" style={{marginRight: 50}} onClick={handleAccept}>
      <CheckIcon  />
    </IconButton>
    <IconButton color="error" onClick={handleDecline}>
      <CloseIcon />
    </IconButton>
    </div>
)}
      
    </div>
  )
}
