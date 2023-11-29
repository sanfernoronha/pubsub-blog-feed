import React, { useEffect } from 'react'
import ChipSelection from './ChipSelection'
import { useSelector } from 'react-redux';




export default function Explore() {
  

  const userId = useSelector((state) => state.user.userId)

    useEffect(() => {
        console.log(userId);
    }, [userId])
  return (
    <ChipSelection title = "Explore more areas of interest !"/>
  )
}
