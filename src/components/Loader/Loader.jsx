//Loader.jsx

import React, { useState } from 'react';
import './Loader.scss';


const Loader = () => {
  const [loading] = useState(true);

 

  return (
    <div className={`loader-containern ${loading ? 'loading' : ''}`}>
      
      <div className="loader-ring"></div>
    </div>
  );
};

export default Loader;