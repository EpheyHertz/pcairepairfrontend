import React from 'react';
import styles from './spinner.module.css'; 
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className={styles.spinner}></div>
      <p className="text-xl text-gray-700 mt-4">Please wait...</p>
    </div>
  );
};

export default Loading;
