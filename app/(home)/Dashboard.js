import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {  ScrollView } from 'react-native';
import List from './List';
import Edit from './Edit';
import { employeesData, updateEmployee } from '../../data'; // Updated import path
import {
    addIncompleteTask,
    addCompletedTask,
    getIncompleteTasks,
    getCompletedTasks,
    deleteNotification,
    markNotificationAsRead,
} from '../../TasksData'; // Import TasksData functions

import { BsEye, BsTrash, BsCheckCircle } from 'react-icons/bs'; // Importing React Icons

function Dashboard() {
    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [view, setView] = useState('');
    const [loggedInEmployee, setLoggedInEmployee] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [readNotifications, setReadNotifications] = useState([]);
    const [notificationsDate, setNotificationsDate] = useState('');



    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        const incompleteTasks = getIncompleteTasks();
        const completedTasks = getCompletedTasks();
    
        const notificationsMap = new Map();
        const today = new Date().toLocaleDateString();
    
        incompleteTasks.forEach(task => {
            const key = task.employeeName;
            if (!notificationsMap.has(key)) {
                notificationsMap.set(key, {
                    name: task.employeeName,
                    incompleteTasks: [],
                    completedTasks: [],
                });
            }
            notificationsMap.get(key).incompleteTasks.push(task);
        });
    
        completedTasks.forEach(task => {
            const key = task.employeeName;
            if (!notificationsMap.has(key)) {
                notificationsMap.set(key, {
                    name: task.employeeName,
                    incompleteTasks: [],
                    completedTasks: [],
                });
            }
            notificationsMap.get(key).completedTasks.push(task);
        });
    
        const newNotifications = Array.from(notificationsMap.values()).map(employeeTasks => ({
            name: employeeTasks.name,
            message: `Tasks submitted by ${employeeTasks.name}`,
            incompleteTasks: employeeTasks.incompleteTasks,
            completedTasks: employeeTasks.completedTasks,
            read: false,
        }));
    
        setNotifications(newNotifications);
        setNotificationsDate(today);
    };
    const handleDeleteNotification = (notification) => {
        deleteNotification(notification);
        setNotifications(prevNotifications => prevNotifications.filter(notif => notif !== notification));
        setReadNotifications(prevReadNotifications => prevReadNotifications.filter(notif => notif !== notification));
        Swal.fire({
            icon: 'success',
            title: 'Notification Deleted!',
            showConfirmButton: false,
            timer: 1500,
        });
    };
    
    
    const handleMarkAsRead = (notification) => {
        markNotificationAsRead(notification);
        setReadNotifications((prevReadNotifications) => [
            ...prevReadNotifications,
            notification,
        ]);
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notif) => notif !== notification)
        );
        Swal.fire({
            icon: 'success',
            title: 'Notification Marked as Read!',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const handleEdit = (id) => {
        const employee = employees.find((employee) => employee.id === id);
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((emp) => emp.id !== id)
        );
    };
    const handleAssignTask = (isSpecialTask = false) => {
        if (!selectedEmployeeId) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please select an employee.',
                showConfirmButton: true,
            });
            return;
        }
        if (taskDescription.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Task description cannot be empty.',
                showConfirmButton: true,
            });
            return;
        }
    
        const employeeId = parseInt(selectedEmployeeId, 10);
        let employeeToUpdate = employees.find(emp => emp.id === employeeId);
    
        if (!employeeToUpdate) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Selected employee not found.',
                showConfirmButton: true,
            });
            return;
        }
    
        const tasksField = isSpecialTask ? 'specialTasks' : 'tasks';
        const updatedEmployees = employees.map(emp => {
            if (emp.id === employeeId) {
                return {
                    ...emp,
                    [tasksField]: [
                        ...(emp[tasksField] || []),
                        {
                            id: Math.floor(Math.random() * 1000) + 1,
                            description: taskDescription.trim(),
                            special: isSpecialTask,
                            complete: false,
                            date: new Date().toLocaleDateString(),
                        },
                    ],
                };
            }
            return emp;
        });
    
        setEmployees(updatedEmployees);
    
        const updatedEmployee = updatedEmployees.find(emp => emp.id === employeeId);
        setSelectedEmployee(updatedEmployee);
        setLoggedInEmployee(updatedEmployee);
    
        updateEmployee(updatedEmployee);
    
        Swal.fire({
            icon: 'success',
            title: 'Task Assigned!',
            text: `Task has been assigned to ${employeeToUpdate.firstName} ${employeeToUpdate.lastName}.`,
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {
            setTaskDescription('');
            setSelectedEmployeeId('');
            fetchNotifications();
        });
    };
    
    const handleEmployeeChange = (e) => {
        const selectedId = e.target.value;
        setSelectedEmployeeId(selectedId);
        const employee = employees.find(emp => emp.id === parseInt(selectedId, 10));
        setSelectedEmployee(employee);
    };
    
    const switchView = (viewName) => {
        if (viewName === 'notifications') {
            setShowNotifications(true);
        } else {
            setShowNotifications(false);
            setView(viewName);
        }
    };
    
    const handleCancel = () => {
        setView('');
        setShowNotifications(false);
        setIsModalOpen(false);
    };
    

    const handleViewNotificationTasks = (notification) => {
    const { name, incompleteTasks, completedTasks } = notification;

    const incompleteTasksHtml = incompleteTasks.map(task => `<li>${task.description}</li>`).join('');
    const completedTasksHtml = completedTasks.map(task => `<li>${task.description}</li>`).join('');

    Swal.fire({
        title: `Tasks for ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif;">
                <h3 style="margin-bottom: 10px; color: #007bff;">Incomplete Tasks</h3>
                <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
                    ${incompleteTasksHtml}
                </ul>
                <h3 style="margin-bottom: 10px; color: #28a745;">Completed Tasks</h3>
                <ul style="list-style-type: none; padding: 0;">
                    ${completedTasksHtml}
                </ul>
            </div>
        `,
        showCloseButton: true,
        customClass: {
            container: 'swal2-container',
            popup: 'swal2-popup',
            title: 'swal2-title',
            closeButton: 'swal2-close',
            htmlContainer: 'swal2-html-container',
        },
        buttonsStyling: true,
        confirmButtonClass: 'btn btn-success', // Add your custom classes here
        confirmButtonText: 'OK', // Customize the button text if needed
    });
    
};

   
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <div className="container" style={styles.container}>
            <h1 style={styles.title}>Welcome Admin!</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.viewButton} onClick={() => switchView('employeeList')}>
                    View Employee List
                </button>
                <button style={styles.viewButton} onClick={() => switchView('assignTask')}>
                    Assign Task
                </button>
                <button style={styles.viewButton} onClick={() => switchView('notifications')}>
                    Notifications
                </button>
                <button style={styles.viewButton} onClick={() => switchView('accounts')}>
                    Accounts
                </button>
                <button style={styles.viewButton} onClick={() => switchView('stacklist')}>
                    Stack List
                </button>
            </div>
            {showNotifications && (
    <div style={styles.notifications}>
        <h2 style={styles.notificationTitle}>Notifications</h2>
        <div style={styles.dateContainer}>
            <p>{new Date().toLocaleDateString()}</p>
        </div>
        <div style={styles.notificationListContainer}>
            <ul style={styles.notificationList}>
                {notifications.length === 0 ? (
                    <div>No notifications found.</div>
                ) : (
                    notifications.map((notification, index) => (
                        <li key={index} style={styles.notificationItem}>
                            <div style={styles.notificationMessage}>
                                <strong>{notification.name}</strong>: {notification.message}
                            </div>
                            <div style={styles.notificationActions}>
                               <div style={styles.notificationActions}>
                                            <button
                                                style={styles.notificationButton}
                                                onClick={() => handleViewNotificationTasks(notification)}
                                            >
                                                <BsEye style={styles.icon} />
                                            </button>
                                            <button
                                                style={styles.notificationButton}
                                                onClick={() => handleDeleteNotification(notification)}
                                            >
                                                <BsTrash style={styles.icon} />
                                            </button>
                                            <button
                                                style={styles.notificationButton}
                                                onClick={() => handleMarkAsRead(notification)}
                                            >
                                                <BsCheckCircle style={styles.icon} />
                                            </button>
                                        </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
        <h2 style={styles.notificationTitle}>Read Notifications</h2>
        <div style={styles.dateContainer}>
            <p>{new Date().toLocaleDateString()}</p>
        </div>
        <div style={styles.notificationListContainer}>
            <ul style={styles.notificationList}>
                {readNotifications.length === 0 ? (
                    <div>No read notifications found.</div>
                ) : (
                    readNotifications.map((notification, index) => (
                        <li key={index} style={styles.notificationItem}>
                            <div style={styles.notificationMessage}>
                                <strong>{notification.name}</strong>: {notification.message}
                            </div>
                            <div style={styles.notificationActions}>
                            <div style={styles.notificationActions}>
                                            <button
                                                style={styles.notificationButton}
                                                onClick={() => handleViewNotificationTasks(notification)}
                                            >
                                                <BsEye style={styles.icon} />
                                            </button>
                                            <button
                                                style={styles.notificationButton}
                                                onClick={() => handleDeleteNotification(notification)}
                                            >
                                                <BsTrash style={styles.icon} />
                                            </button>
                                        </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
        <button style={styles.cancelButton} onClick={handleCancel}>Cancel</button>
    </div>
)}



         
        {view === 'employeeList' && (
                <>
                    <List employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
                    <button style={styles.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                </>
            )}

            {view === 'assignTask' && (
                <div style={styles.assignTaskContainer}>
                    <h2 style={styles.assignTaskTitle}>Assign Task</h2>
                    <select
                        style={styles.dropdown}
                        value={selectedEmployeeId}
                        onChange={handleEmployeeChange}
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {`${emp.firstName} ${emp.lastName}`}
                            </option>
                        ))}
                    </select>
                    <textarea
                        style={styles.taskDescriptionInput}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Enter task description..."
                    />
                    <button style={styles.assignButton} onClick={() => handleAssignTask(false)}>
                        Assign Regular Task
                    </button>
                    <button style={styles.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            )}

            {isModalOpen && (
                <>
                    <div className="overlay" style={styles.overlay}></div>
                    <div className="modal" style={styles.modal}>
                        <div className="modal-content" style={styles.modalContent}>
                            <Edit
                                selectedEmployee={selectedEmployee}
                                setEmployees={setEmployees}
                                setIsModalOpen={setIsModalOpen}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
        </ScrollView>
    );
}

const styles = {
    scrollViewContent: {
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    // existing styles
    dateContainer: {
        textAlign: 'center',
        marginTop: '10px',

    },
    title: {
        textAlign: 'center',
        fontSize: '32px', // Increased font size
        marginBottom: '20px',
        color: 'black', 
        paddingBottom: '10px', // Padding bottom for space between title and underline
        textTransform: 'uppercase', // Uppercase text
        fontWeight: 'bold', // Bold font weight
    },
    
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column', // Align buttons in a column
        alignItems: 'flex-start', // Align items to the start (left)
        marginBottom: '20px',
        marginLeft: '20px', // Add some left margin for spacing from the edge
    },
    viewButton: {
        padding: '10px 20px',
        margin: '0 0 10px', // Adjust margin for spacing between buttons
        fontSize: '16px',
        cursor: 'pointer',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        outline: 'none',
        transition: 'background 0.3s ease', // Add transition for hover effect
        boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)', // Add a subtle shadow
    },

    
    
    
    cancelButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px 5px', // Reduce space between buttons
    },
    
    assignTaskContainer: {
        marginTop: '30px',
    },
    assignTaskTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    dropdown: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    taskDescriptionInput: {
        width: '98%',
        height: '100px',
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    assignButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '10px',
        marginTop:'10px',
        marginRight: '10px',
        border:'none',
    },
    cancelButton:{
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '10px',
        marginRight: '10px',
        marginTop:'10px',
        border:'none',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: '1000',
        width: '60%',
        maxHeight: '70vh',
        overflowY: 'auto',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.2)',
    },
    modalContent: {
        width: '100%',
    },
   
    notifications: {
        position: 'fixed',
        top: '0',
        right: '0',
        height: '100%',
        width: '400px',
        background: '#f8f9fa',
        borderLeft: '1px solid #ccc',
        padding: '20px',
        boxSizing: 'border-box',
        zIndex: '999',
        overflowY: 'auto',
    },
    notificationTitle: {
        fontSize: '20px',
        marginBottom: '10px',
        textAlign: 'center',
    },
    dateContainer: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    notificationListContainer: {
        maxHeight: 'calc(100% - 100px)',
        overflowY: 'auto',
        marginBottom: '10px',
    },
    notificationList: {
        listStyleType: 'none',
        padding: '0',
    },
    notificationItem: {
        marginBottom: '10px',
        padding: '10px',
        background: '#fff',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notificationMessage: {
        flexGrow: '1',
        marginRight: '10px',
    },
    notificationActions: {
        display: 'flex',
    },
    notificationButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        marginLeft: '5px',
    },
    icon: {
        fontSize: '18px',
        color: '#007bff',
    },
};

export default Dashboard;

