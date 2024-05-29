import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import './Loader.scss';

const Loader = () => {
  const [loading] = useState(true);

  return (
    <div className={`loader-container ${loading ? 'loading' : ''}`}>
      <ClipLoader color="#36d7b7" loading={loading} size={50} />
    </div>
  );
};

export default Loader;
