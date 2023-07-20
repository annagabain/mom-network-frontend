import React, { useEffect, useState } from 'react';

const TestApiComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://mom-network-backend.herokuapp.com')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        // Handle any error that occurred during the request
        console.log('Could not fetch the Mom Network API because of this error: ', error.message)

      });
  }, []);

  return (
    <div>
      <h2>General Api Connection Test</h2>
      <p style={{color: "green"}}>{data.message}</p>
    </div>
  );
};

export default TestApiComponent;