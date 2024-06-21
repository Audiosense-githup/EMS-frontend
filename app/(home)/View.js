// import React from 'react';

// function View({ selectedEmployee, setIsViewing }) {
//     if (!selectedEmployee) {
//         return null; // Render nothing if selectedEmployee is undefined
//     }

//     const { 
//         firstName, 
//         lastName, 
//         position, 
//         qualification, 
//         address, 
//         contactNumber, 
//         resume, 
//         degreeCertificates, 
//         aadharCard, 
//         panCard, 
//         bankPassbook, 
//         photo 
//     } = selectedEmployee;

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.heading}>Employee Details</h2>
//             <div style={styles.details}>
//                 <p><strong>First Name:</strong> {firstName}</p>
//                 <p><strong>Last Name:</strong> {lastName}</p>
//                 <p><strong>Position:</strong> {position}</p>
//                 <p><strong>Qualification:</strong> {qualification}</p>
//                 <p><strong>Address:</strong> {address}</p>
//                 <p><strong>Contact Number:</strong> {contactNumber}</p>
//                 <p><strong>Resume:</strong> {resume}</p>
//                 <p><strong>Degree Certificates:</strong> {degreeCertificates}</p>
//                 <p><strong>Aadhar Card:</strong> {aadharCard}</p>
//                 <p><strong>PAN Card:</strong> {panCard}</p>
//                 <p><strong>Bank Passbook:</strong> {bankPassbook}</p>
//                 <p><strong>Photo:</strong> {photo}</p>
//             </div>
//             <button style={styles.button} onClick={() => setIsViewing(false)}>Close</button>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         backgroundColor: '#f9f9f9',
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.2)',
//         maxWidth: '500px',
//         margin: 'auto',
//     },
//     heading: {
//         fontSize: '24px',
//         color: '#333',
//         marginBottom: '20px',
//     },
//     details: {
//         marginBottom: '20px',
//     },
//     button: {
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//         padding: '10px 20px',
//         cursor: 'pointer',
//     },
// };

// export default View;
