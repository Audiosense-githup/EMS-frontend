
import React, { useState } from 'react';
import Header from './Header';
import AddEmployee from './Add';
import { employeesData } from '../../data';

function Dashboard() {
    const [employees, setEmployees] = useState(employeesData);
    const [isAdding, setIsAdding] = useState(false);

    const toggleAddEmployee = () => {
        
        setIsAdding(prevState => !prevState); // Toggle the isAdding state
    };

    return (
        <div className='container' style={styles.container}>
            {/* Header */}
            <Header setIsAdding={toggleAddEmployee} />
            
            {/* Add Employee Modal */}
            {isAdding && (
                <div style={styles.modalBackground}>
                    <div style={styles.modalContainer}>
                        <button style={styles.closeButton} onClick={toggleAddEmployee}>Close</button>
                        <div style={styles.scrollContainer}>
                            <AddEmployee
                                employees={employees}
                                setEmployees={setEmployees}
                                setIsAdding={setIsAdding}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        height: '100vh', // Adjust height as needed
        overflowY: 'auto', // Enable vertical scrolling
        padding: '20px', // Add padding to the container
    },
    modalBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        backdropFilter: 'blur(5px)', // Apply blur effect to the background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        width: '70%', // Adjust the width of the modal container
        height: '80%', // Adjust the height of the modal container
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#333',
    },
    scrollContainer: {
        maxHeight: 'calc(100% - 40px)', // Adjust the maximum height of the scroll container
        overflowY: 'auto', // Enable vertical scrolling
    },
};

export default Dashboard;
