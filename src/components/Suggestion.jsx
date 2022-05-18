import React from 'react';
import location from '../assets/location.svg';

const Suggestion = ({ suggestion, onClick }) => {
  return (
    <div onClick={onClick} className="suggestion">
      {suggestion.location && <img src={location} alt="location" width="5%" />}
      <div className={!suggestion.location ? 'text' : ''}>
        <h4>{suggestion.name}</h4>
        {suggestion.secondary_name && <h5>{suggestion.secondary_name}</h5>}
      </div>
    </div>
  );
};

export default Suggestion;
