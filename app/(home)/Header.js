import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai'; // Import the plus icon from react-icons

function Header({ setIsAdding }) {
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#007bff', /* Blue color, you can change this */
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3' /* Darker blue on hover */
  };

  return (
    <header>
      <h1>Employee Management Software</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button
          onClick={() => setIsAdding(true)}
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          <AiOutlinePlus size={20} style={{ marginRight: '8px' }} /> Add Employee
        </button>
      </div>
    </header>
  );
}

export default Header;
