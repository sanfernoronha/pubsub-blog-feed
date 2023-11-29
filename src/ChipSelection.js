import { Typography, Chip, IconButton } from '@mui/material'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const interestList = ['Music', 'Movies', 'Reading', 'Travel', 'Sports', 'Cooking']


export default function ChipSelection({chips, title}) {
    
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


      const handleAccept = () => {
        console.log('Accepted');
        console.log('Subscribing to ', selectedChips, 'topics')
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
