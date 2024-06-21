
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Swal from 'sweetalert2';
// import { MaterialIcons } from '@expo/vector-icons';
// import { addCompletedTask, addIncompleteTask } from '../../TasksData'; // Import tasksData

// const ViewTask = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const [incompleteTasks, setIncompleteTasks] = useState([]);
//     const [completedTasks, setCompletedTasks] = useState([]);

//     const loggedInEmployee = route.params.loggedInEmployee;

//     useEffect(() => {
//         if (loggedInEmployee) {
//             setIncompleteTasks(loggedInEmployee.tasks.filter(task => !task.completed));
//             setCompletedTasks(loggedInEmployee.tasks.filter(task => task.completed));
//         }
//     }, [loggedInEmployee]);

//     const getTodayDate = () => {
//         const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//         return new Date().toLocaleDateString(undefined, options);
//     };

//     const handleTaskSubmit = () => {
//         // Add incomplete tasks to tasksData
//         incompleteTasks.forEach(task => {
//             addIncompleteTask({
//                 employeeName: `${loggedInEmployee.firstName} ${loggedInEmployee.lastName}`,
//                 taskDescription: task.description,
//                 date: getTodayDate(),
//             });
//         });

//         // Add completed tasks to tasksData
//         completedTasks.forEach(task => {
//             addCompletedTask({
//                 employeeName: `${loggedInEmployee.firstName} ${loggedInEmployee.lastName}`,
//                 taskDescription: task.description,
//                 date: getTodayDate(),
//             });
//         });

//         // Show success message with SweetAlert
//         Swal.fire({
//             icon: 'success',
//             title: 'Task Submitted',
//             text: 'Your tasks have been successfully submitted.',
//             showConfirmButton: true,
//         }).then(() => {
//             navigation.navigate('index');
//         });
//     };

//     const toggleTaskStatus = (taskId) => {
//         const taskToMove = incompleteTasks.find(task => task.id === taskId);

//         if (taskToMove) {
//             // Move task from incomplete to completed
//             setIncompleteTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//             setCompletedTasks(prevTasks => [...prevTasks, { ...taskToMove, completed: true }]);
//         } else {
//             // Move task from completed to incomplete
//             const taskToMoveBack = completedTasks.find(task => task.id === taskId);
//             if (taskToMoveBack) {
//                 setCompletedTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//                 setIncompleteTasks(prevTasks => [...prevTasks, { ...taskToMoveBack, completed: false }]);
//             }
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.scrollViewContent}>
//             <View style={styles.container}>
//                 <Text style={styles.title}>Today's Tasks</Text>
//                 <Text style={styles.date}>{getTodayDate()}</Text>
//                 {loggedInEmployee ? (
//                     <View style={styles.taskContainer}>
//                         <Text style={styles.employeeName}>{`${loggedInEmployee.firstName} ${loggedInEmployee.lastName}'s Tasks`}</Text>
                        
//                         <View style={styles.taskSection}>
//                             <Text style={styles.sectionTitle}>Incomplete Tasks</Text>
//                             {incompleteTasks.length > 0 ? (
//                                 incompleteTasks.map((task) => (
//                                     <View key={task.id} style={styles.taskItem}>
//                                         <Text style={styles.taskDescription}>{task.description}</Text>
//                                         <TouchableOpacity onPress={() => toggleTaskStatus(task.id)}>
//                                             <MaterialIcons name="check-circle" size={24} color="#D32F2F" />
//                                         </TouchableOpacity>
//                                     </View>
//                                 ))
//                             ) : (
//                                 <Text style={styles.noTasks}>No incomplete tasks.</Text>
//                             )}
//                         </View>

//                         <View style={styles.taskSection}>
//                             <Text style={styles.sectionTitle}>Completed Tasks</Text>
//                             {completedTasks.length > 0 ? (
//                                 completedTasks.map((task) => (
//                                     <View key={task.id} style={styles.taskItem}>
//                                         <Text style={styles.taskDescription}>{task.description}</Text>
//                                         <TouchableOpacity onPress={() => toggleTaskStatus(task.id)}>
//                                             <MaterialIcons name="check-circle" size={24} color="#388E3C" />
//                                         </TouchableOpacity>
//                                     </View>
//                                 ))
//                             ) : (
//                                 <Text style={styles.noTasks}>No completed tasks.</Text>
//                             )}
//                         </View>

//                         <TouchableOpacity style={styles.submitButton} onPress={handleTaskSubmit}>
//                             <Text style={styles.buttonText}>Submit</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('index')}>
//                             <Text style={styles.buttonText}>Back to Home</Text>
//                         </TouchableOpacity>
//                     </View>
//                 ) : (
//                     <Text style={styles.noTasks}>No tasks found.</Text>
//                 )}
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     scrollViewContent: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         backgroundColor: '#F5F5F5',
//     },
//     container: {
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingVertical: 40,
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 10,
//     },
//     date: {
//         fontSize: 18,
//         color: '#666',
//         marginBottom: 20,
//     },
//     taskContainer: {
//         width: '100%',
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 4,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//         elevation: 5,
//     },
//     employeeName: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     taskSection: {
//         marginBottom: 20,
//     },
//     sectionTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#555',
//         marginBottom: 10,
//     },
//     taskItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: '#F9F9F9',
//         padding: 15,
//         borderRadius: 8,
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.05,
//         shadowRadius: 5,
//         elevation: 3,
//     },
//     taskDescription: {
//         flex: 1,
//         fontSize: 16,
//         color: '#333',
//     },
//     noTasks: {
//         fontSize: 16,
//         color: '#888',
//         textAlign: 'center',
//         marginTop: 10,
//     },
//     submitButton: {
//         backgroundColor: '#007BFF',
//         paddingVertical: 12,
//         borderRadius: 8,
//         marginBottom: 10,
//         alignItems: 'center',
//     },
//     backButton: {
//         backgroundColor: '#6C757D',
//         paddingVertical: 12,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default ViewTask;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swal from 'sweetalert2';
import { MaterialIcons } from '@expo/vector-icons';
import { addCompletedTask, addIncompleteTask } from '../../TasksData'; // Import tasksData

const ViewTask = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [incompleteTasks, setIncompleteTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [viewTaskPage, setViewTaskPage] = useState(false);
    const [viewFolderPage, setViewFolderPage] = useState(false);

    const loggedInEmployee = route.params.loggedInEmployee;

    useEffect(() => {
        if (loggedInEmployee) {
            setIncompleteTasks(loggedInEmployee.tasks.filter(task => !task.completed));
            setCompletedTasks(loggedInEmployee.tasks.filter(task => task.completed));
        }
    }, [loggedInEmployee]);

    const getTodayDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    };

    const handleTaskSubmit = () => {
        // Add incomplete tasks to tasksData
        incompleteTasks.forEach(task => {
            addIncompleteTask({
                employeeName: `${loggedInEmployee.firstName} ${loggedInEmployee.lastName}`,
                taskDescription: task.description,
                date: getTodayDate(),
            });
        });

        // Add completed tasks to tasksData
        completedTasks.forEach(task => {
            addCompletedTask({
                employeeName: `${loggedInEmployee.firstName} ${loggedInEmployee.lastName}`,
                taskDescription: task.description,
                date: getTodayDate(),
            });
        });

        // Show success message with SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Task Submitted',
            text: 'Your tasks have been successfully submitted.',
            showConfirmButton: true,
        }).then(() => {
            navigation.navigate('index');
        });
    };

    const toggleTaskStatus = (taskId) => {
        const taskToMove = incompleteTasks.find(task => task.id === taskId);

        if (taskToMove) {
            // Move task from incomplete to completed
            setIncompleteTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            setCompletedTasks(prevTasks => [...prevTasks, { ...taskToMove, completed: true }]);
        } else {
            // Move task from completed to incomplete
            const taskToMoveBack = completedTasks.find(task => task.id === taskId);
            if (taskToMoveBack) {
                setCompletedTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
                setIncompleteTasks(prevTasks => [...prevTasks, { ...taskToMoveBack, completed: false }]);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                {!viewTaskPage && !viewFolderPage ? (
                    <>
                        <Text style={styles.mainTitle}>Welcome Employee!</Text>
                        <TouchableOpacity style={styles.mainButton} onPress={() => setViewTaskPage(true)}>
                            <Text style={styles.buttonText}>View Your Task</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainButton} onPress={() => setViewFolderPage(true)}>
                            <Text style={styles.buttonText}>View Folder</Text>
                        </TouchableOpacity>
                    </>
                ) : viewTaskPage ? (
                    <View style={styles.taskContainer}>
                        <Text style={styles.title}>Today's Tasks</Text>
                        <Text style={styles.date}>{getTodayDate()}</Text>
                        {loggedInEmployee ? (
                            <>
                                <Text style={styles.employeeName}>{`${loggedInEmployee.firstName} ${loggedInEmployee.lastName}'s Tasks`}</Text>
                                
                                <View style={styles.taskSection}>
                                    <Text style={styles.sectionTitle}>Incomplete Tasks</Text>
                                    {incompleteTasks.length > 0 ? (
                                        incompleteTasks.map((task) => (
                                            <View key={task.id} style={styles.taskItem}>
                                                <Text style={styles.taskDescription}>{task.description}</Text>
                                                <TouchableOpacity onPress={() => toggleTaskStatus(task.id)}>
                                                    <MaterialIcons name="check-circle" size={24} color="#D32F2F" />
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={styles.noTasks}>No incomplete tasks.</Text>
                                    )}
                                </View>

                                <View style={styles.taskSection}>
                                    <Text style={styles.sectionTitle}>Completed Tasks</Text>
                                    {completedTasks.length > 0 ? (
                                        completedTasks.map((task) => (
                                            <View key={task.id} style={styles.taskItem}>
                                                <Text style={styles.taskDescription}>{task.description}</Text>
                                                <TouchableOpacity onPress={() => toggleTaskStatus(task.id)}>
                                                    <MaterialIcons name="check-circle" size={24} color="#388E3C" />
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={styles.noTasks}>No completed tasks.</Text>
                                    )}
                                </View>

                                <TouchableOpacity style={styles.submitButton} onPress={handleTaskSubmit}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setViewTaskPage(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <Text style={styles.noTasks}>No tasks found.</Text>
                        )}
                    </View>
                ) : (
                    <View style={styles.folderContainer}>
                        <Text style={styles.folderTitle}>Folder View</Text>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setViewFolderPage(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 30,
        textAlign: 'center',
    },
    mainButton: {
        backgroundColor: '#3498DB',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        alignSelf: 'flex-start',
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
    date: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    taskContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    employeeName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    taskSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E8F8F5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    taskDescription: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    noTasks: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: '#28A745',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#D32F2F',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    folderContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    folderTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default ViewTask;
