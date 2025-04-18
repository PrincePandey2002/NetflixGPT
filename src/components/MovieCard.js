import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterCard}) => {
  if(!posterCard) return null;
  return (
    <div className='w-36 md:w-48 pr-4'>
        <img alt='movie card' src={IMG_CDN_URL+posterCard}/>
    </div>
  )
}

export default MovieCard