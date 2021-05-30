import React from 'react'
import Rate from '../models/Rate'


const Rating = ({ value, text, color }: Rate) => {
  return (
    <div className="rating">
      {
        new Array(5).fill(0).map((v, i) => (
          <span key={i}>
            <i style={{ color }} className={value >= 1 + i ? 'fas fa-star' : value >= 0.5 + i ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
          </span>
        ))
      }
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825'
}

export default Rating
