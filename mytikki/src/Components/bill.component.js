import React from 'react';
import { useLocation } from 'react-router-dom';

const Bill = () => {
  const location = useLocation();
  const { formData } = location.state;
  const jsonData = JSON.stringify(formData, null, 2); // Convert formData to a formatted JSON string

  return (
    <div>
      <h1>Bill</h1>
      <pre>{jsonData}</pre>
    </div>
  );
};

export default Bill;
