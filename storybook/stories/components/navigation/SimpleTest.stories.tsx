import React from 'react';

/**
 * Simple Test Component
 * Tests basic React rendering without Polaris dependencies
 */

const SimpleTest = () => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f0f0',
      border: '2px solid #007ace',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#007ace', margin: '0 0 10px 0' }}>
        ✅ Simple Test Component Working!
      </h1>
      <p style={{ margin: '0', color: '#333' }}>
        If you can see this, React rendering is working correctly.
      </p>
      <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#666' }}>
        Current time: {new Date().toLocaleString()}
      </p>
    </div>
  );
};

export default SimpleTest;