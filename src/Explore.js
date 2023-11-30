import React, { useEffect } from 'react'
import ChipSelection from './ChipSelection'
import { useSelector } from 'react-redux';




export default function Explore() {
  

  const userId = useSelector((state) => state.user.userId)

    useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/tags/${userId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData()
    }, [userId])
  return (
    <ChipSelection title = "Explore more areas of interest !"/>
  )
}
