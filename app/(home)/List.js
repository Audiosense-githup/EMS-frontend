import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function List({ employees = [], handleEdit, handleDelete }) {
    const [clickedButtons, setClickedButtons] = useState({});

    const handleAccept = (id) => {
        setClickedButtons(prevState => ({
            ...prevState,
            [id]: { accept: true, decline: false }
        }));
        const employee = employees.find(emp => emp.id === id);
        Swal.fire({
            icon: 'success',
            title: 'Employee Accepted!',
            text: `${employee.firstName} ${employee.lastName}'s data has been accepted.`,
            showConfirmButton: false,
            timer: 1500,
        });
        // Perform accept logic here, such as updating database or state
        // Update the employee's approval status
        handleUpdateApprovalStatus(id, true);
    };

    const handleDecline = (id) => {
        setClickedButtons(prevState => ({
            ...prevState,
            [id]: { accept: false, decline: true }
        }));
        const employee = employees.find(emp => emp.id === id);
        Swal.fire({
            icon: 'error',
            title: 'Employee Declined!',
            text: `${employee.firstName} ${employee.lastName}'s data has been declined.`,
            showConfirmButton: false,
            timer: 1500,
        });
        // Perform decline logic here, such as updating database or state
        // Update the employee's approval status
        handleUpdateApprovalStatus(id, false);
    };

    const handleEditEmployee = (id) => {
        if (typeof handleEdit === 'function') {
            handleEdit(id);
        } else {
            console.error('handleEdit is not a function');
        }
    };

    const handleDeleteEmployee = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.isConfirmed) {
                const employee = employees.find(emp => emp.id === id);
                Swal.fire({
                    icon: 'success',
                    title: 'Employee Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                handleDelete(id);
            }
        });
    };

    const handleUpdateApprovalStatus = (id, isApproved) => {
        // Update the employee's approval status in the backend or wherever you manage it
        // For demonstration, I'm updating it in the frontend state
        const updatedEmployees = employees.map(emp =>
            emp.id === id ? { ...emp, approved: isApproved } : emp
        );
        // Update the employees state
        // setEmployees(updatedEmployees);
    };

    const styles = {
        containTable: {
            marginTop: '20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            overflow: 'hidden',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            padding: '12px',
            textAlign: 'left',
            backgroundColor: '#f5f5f5',
            color: '#333',
        },
        evenRow: {
            backgroundColor: '#f9f9f9',
        },
        td: {
            padding: '12px',
            textAlign: 'left',
            borderTop: '1px solid #ddd',
        },
        buttonWrapper: {
            display: 'flex',
            alignItems: 'center',
        },
        button: {
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        mutedButton: {
            backgroundColor: 'transparent',
            color: '#007bff',
        },
        acceptButton: {
            padding: '8px 16px',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px',
        },
        declineButton: {
            padding: '8px 16px',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        accepted: {
            backgroundColor: '#28a745',
            color: 'white',
        },
        declined: {
            backgroundColor: '#dc3545',
            color: 'white',
        },
        icon: {
            transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out',
        },
    };

    return (
        <div>
            <div style={styles.containTable}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>No.</th>
                            <th style={styles.th}>First Name</th>
                            <th style={styles.th}>Last Name</th>
                            <th style={styles.th}>Designation</th>
                            <th colSpan={3} style={{ ...styles.th, ...styles.textCenter }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee, i) => (
                                <tr key={employee.id} style={i % 2 === 0 ? styles.evenRow : null}>
                                    <td style={styles.td}>{i + 1}</td>
                                    <td style={styles.td}>{employee.firstName}</td>
                                    <td style={styles.td}>{employee.lastName}</td>
                                    <td style={styles.td}>{employee.designation}</td>
                                    <td style={{ ...styles.td, ...styles.buttonWrapper }}>
                                        <button
                                            onClick={() => handleEditEmployee(employee.id)}
                                            style={{ ...styles.button, ...styles.mutedButton }}
                                        >
                                            <FaEdit className="icon" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEmployee(employee.id)}
                                            style={{ ...styles.button, ...styles.mutedButton }}
                                        >
                                            <FaTrash className="icon" />
                                        </button>
                                        <button
                                            onClick={() => handleAccept(employee.id)}
                                            style={{
                                                ...styles.button,
                                                ...styles.acceptButton,
                                                ...(clickedButtons[employee.id]?.accept ? styles.accepted : {}),
                                            }}
                                        >
                                            <FaCheckCircle className="icon" />
                                        </button>
                                        <button
                                            onClick={() => handleDecline(employee.id)}
                                            style={{
                                                ...styles.button,
                                                ...styles.declineButton,
                                                ...(clickedButtons[employee.id]?.decline ? styles.declined : {}),
                                            }}
                                        >
                                            <FaTimesCircle className="icon" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={styles.td}>
                                    No Employees
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;





// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

// function List({ employees = [], handleEdit, handleDelete, handleView }) {
//     const [shadeIn, setShadeIn] = useState(false);

//     const handleAccept = (id) => {
//         setShadeIn(true);
//         const employee = employees.find(emp => emp.id === id);
//         Swal.fire({
//             icon: 'success',
//             title: 'Employee Accepted!',
//             text: `${employee.firstName} ${employee.lastName}'s data has been accepted.`,
//             showConfirmButton: false,
//             timer: 1500,
//         });
//         // Perform accept logic here, such as updating database or state
//         // After accepting, you might want to remove the employee from the list or mark them as accepted
//         setTimeout(() => {
//             setShadeIn(false);
//         }, 1000); // Adjust the time based on your transition duration
//     };

//     const handleDecline = (id) => {
//         setShadeIn(true);
//         const employee = employees.find(emp => emp.id === id);
//         Swal.fire({
//             icon: 'error',
//             title: 'Employee Declined!',
//             text: `${employee.firstName} ${employee.lastName}'s data has been declined.`,
//             showConfirmButton: false,
//             timer: 1500,
//         });
//         // Perform decline logic here, such as updating database or state
//         // After declining, you might want to remove the employee from the list or mark them as declined
//         setTimeout(() => {
//             setShadeIn(false);
//         }, 1000); // Adjust the time based on your transition duration
//     };

//     const handleViewEmployee = (id) => {
//         handleView(id);
//     };

//     return (
//         <div>
//             {shadeIn && <div className="shade" />} {/* CSS class .shade to implement shade effect */}
//             <div style={styles.containTable}>
//                 <table style={styles.table}>
//                     <thead>
//                         <tr>
//                             <th style={styles.th}>No.</th>
//                             <th style={styles.th}>First Name</th>
//                             <th style={styles.th}>Last Name</th>
//                             <th style={styles.th}>Designation</th>
//                             <th colSpan={5} style={{ ...styles.th, ...styles.textCenter }}>
//                                 Actions
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {employees.length > 0 ? (
//                             employees.map((employee, i) => (
//                                 <tr key={employee.id} style={i % 2 === 0 ? styles.evenRow : null}>
//                                     <td style={styles.td}>{i + 1}</td>
//                                     <td style={styles.td}>{employee.firstName}</td>
//                                     <td style={styles.td}>{employee.lastName}</td>
//                                     <td style={styles.td}>{employee.designation}</td>
//                                     <td style={{ ...styles.td, ...styles.buttonWrapper }}>
//                                         <button
//                                             onClick={() => handleEdit(employee.id)}
//                                             style={{ ...styles.button, ...styles.mutedButton }}
//                                         >
//                                             <FaEdit />
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(employee.id)}
//                                             style={{ ...styles.button, ...styles.mutedButton }}
//                                         >
//                                             <FaTrash />
//                                         </button>
//                                         <button
//                                             onClick={() => handleAccept(employee.id)}
//                                             style={{ ...styles.acceptButton }}
//                                         >
//                                             <FaCheckCircle />
//                                         </button>
//                                         <button
//                                             onClick={() => handleDecline(employee.id)}
//                                             style={{ ...styles.declineButton }}
//                                         >
//                                             <FaTimesCircle />
//                                         </button>
//                                         <button
//                                             onClick={() => handleViewEmployee(employee.id)}
//                                             style={{ ...styles.button, ...styles.viewButton }}
//                                         >
//                                             <FaEye />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={5} style={styles.td}>
//                                     No Employees
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     containTable: {
//         marginTop: '20px',
//         border: '1px solid #ddd',
//         borderRadius: '5px',
//         overflow: 'hidden'
//     },
//     table: {
//         width: '100%',
//         borderCollapse: 'collapse'
//     },
//     th: {
//         padding: '12px',
//         textAlign: 'left',
//         backgroundColor: '#f5f5f5',
//         color: '#333'
//     },
//     evenRow: {
//         backgroundColor: '#f9f9f9'
//     },
//     td: {
//         padding: '12px',
//         textAlign: 'left',
//         borderTop: '1px solid #ddd'
//     },
//     buttonWrapper: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     button: {
//         padding: '8px 16px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer'
//     },
//     mutedButton: {
//         backgroundColor: 'transparent',
//         color: '#007bff'
//     },
//     acceptButton: {
//         padding: '8px 16px',
//         backgroundColor: '#28a745',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         marginRight: '8px',
//     },
//     declineButton: {
//         padding: '8px 16px',
//         backgroundColor: '#dc3545',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     viewButton: {
//         marginLeft: '8px',
//         backgroundColor: '#ffc107',
//     },
// };

// export default List;
