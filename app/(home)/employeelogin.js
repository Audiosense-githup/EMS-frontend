
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import AlertAsync from 'react-native-alert-async';
// import Swal from 'sweetalert2';

// const AuthScreen = () => {
//   const navigation = useNavigation();
//   const [isLogin, setIsLogin] = useState(true);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [approvalMessage, setApprovalMessage] = useState('');

//   const handleToggle = () => {
//     setIsLogin(!isLogin);
//   };

//   const showAlert = async (title, message) => {
//     await AlertAsync(
//       title,
//       message,
//       [
//         { text: 'OK', onPress: () => Promise.resolve() },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleLogin = async () => {
//     if (!firstName || !lastName) {
//       await showAlert('Error', 'Please fill in both first name and last name.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Simulating a login request
//       setTimeout(async () => {
//         setLoading(false);

//         // Check if the employee with the provided first name and last name is approved
//         const employeeApproved = await checkEmployeeApproval(firstName, lastName);

//         if (employeeApproved) {
//           Swal.fire({
//             icon: 'success',
//             title: 'Login Successful',
//             text: 'You are approved by an admin. Logging in...',
//           }).then(() => {
//             // Navigate to ViewTask page after successful login
//             navigation.navigate('viewtask');
//           });
//         } else {
//          Swal.fire({
//             icon:"error",
//             title: 'Access Denied',
//             text: 'You are not approved by an admin. Please wait for admin approval.',
//           })
//         }
//       }, 1500);
//     } catch (error) {
//       setLoading(false);
//       console.error('Login Error:', error);
//       showAlert('Error', 'Failed to login. Please try again.');
//     }
//   };

//   // const handleSignup = async () => {
//   //   if (!email || !password || !confirmPassword) {
//   //     await showAlert('Error', 'All fields are required.');
//   //     return;
//   //   }

//   //   if (password !== confirmPassword) {
//   //     await showAlert('Error', 'Passwords do not match.');
//   //     return;
//   //   }

//   //   if (password.length < 6) {
//   //     await showAlert('Error', 'Password must be at least 6 characters long.');
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     // Simulating a signup request
//   //     setTimeout(async () => {
//   //       setLoading(false);
//   //       await showAlert('Signup Successful', 'User created successfully');
//   //     }, 1500);
//   //   } catch (error) {
//   //     setLoading(false);
//   //     console.error('Signup Error:', error);
//   //     await showAlert('Error', 'Failed to signup. Please try again.');
//   //   }
//   // };

//   const checkEmployeeApproval = async (firstName, lastName) => {
//     // Simulating an async call to check if employee is approved
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         // Assuming some logic to check if the employee is approved
//         // For demo purposes, let's approve if the first name and last name match
//         // and the employee is approved
//         if (firstName === 'John','Jane','srisha' && lastName === 'Doe','Smith','sri') {
//           resolve(true); // Employee is approved
//         } else {
//           resolve(false); // Employee is not approved
//         }
//       }, 1000); // Simulating delay
//     });
//   };

//   useEffect(() => {
//     // Navigate to login page when component mounts
//     navigation.navigate('Login');
//   }, []);
//   const handleSignup=()=>{
//     navigation.navigate("empHeader")
//   }

//   return (
//     <LinearGradient colors={['#FF69B4', '#E9E4F0']} style={styles.gradient}>
//       <View style={styles.container}>
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>{isLogin ? 'Employee Login' : 'Employee Signup'}</Text>
          
//           {/* First Name and Last Name fields */}
//           {isLogin && (
//             <>
//               <TextInput
//                 style={styles.input}
//                 value={firstName}
//                 onChangeText={setFirstName}
//                 placeholder="Enter First Name"
//                 autoCapitalize="words"
//               />
//               <TextInput
//                 style={styles.input}
//                 value={lastName}
//                 onChangeText={setLastName}
//                 placeholder="Enter Last Name"
//                 autoCapitalize="words"
//               />
//                <TextInput
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter Email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//               <TextInput
//                 style={styles.input}
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Enter Password"
//                 secureTextEntry
//               />
//             </>
//           )}
  
//           {/* Email, Password, Confirm Password fields */}
//           {!isLogin && (
//             <>
//               <TextInput
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter Email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//               <TextInput
//                 style={styles.input}
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Enter Password"
//                 secureTextEntry
//               />
//               <TextInput
//                 style={styles.input}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 placeholder="Confirm Password"
//                 secureTextEntry
//               />
//             </>
//           )}
  
//           {/* Approval Message */}
//           {!!approvalMessage && (
//             <Text style={styles.approvalMessage}>{approvalMessage}</Text>
//           )}
  
//           {/* Common Buttons */}
//           {loading ? (
//             <ActivityIndicator size="large" color="#FF69B4" style={styles.loader} />
//           ) : (
//             <>
//               <Pressable onPress={isLogin ? handleLogin : handleSignup} style={styles.button}>
//                 <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
//               </Pressable>
//               <View style={styles.toggleContainer}>
//                 <Text style={styles.toggleText}>
//                   {isLogin ? "Don't have an account?" : 'Already have an account?'}
//                 </Text>
//                 <Pressable onPress={handleToggle}>
//                   <Text style={styles.toggleButton}>
//                     {isLogin ? 'Signup' : 'Login'}
//                   </Text>
//                 </Pressable>
//               </View>
//             </>
//           )}
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   formContainer: {
//     width: '80%',
//     maxWidth: 400,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//     borderRadius: 5,
//   },
//   button: {
//     width: '100%',
//     backgroundColor: '#FF69B4',
//     paddingVertical: 14,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'white',
//   },
//   loader: {
//     marginTop: 20,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   toggleText: {
//     fontSize: 14,
//     marginRight: 5,
//     color: '#333',
//   },
//   toggleButton: {
//     fontSize: 14,
//     color: '#FF69B4',
//     fontWeight: 'bold',
//   },
//   approvalMessage: {
//     marginTop: 10,
//     color: '#FF69B4',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default AuthScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AlertAsync from 'react-native-alert-async';
import Swal from 'sweetalert2';
import { employeesData } from '../../data'; // Assuming employeesData is where employee information is stored

const AuthScreen = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const showAlert = async (title, message) => {
    await AlertAsync(
      title,
      message,
      [
        { text: 'OK', onPress: () => Promise.resolve() },
      ],
      { cancelable: true }
    );
  };

  const handleLogin = async () => {
    if (!firstName || !lastName) {
      await showAlert('Error', 'Please fill in both first name and last name.');
      return;
    }

    setLoading(true);

    try {
      // Simulating a login request
      setTimeout(async () => {
        setLoading(false);

        // Check if the employee with the provided first name and last name is approved
        const employeeApproved = await checkEmployeeApproval(firstName, lastName);

        if (employeeApproved) {
          const loggedInEmployee = employeesData.find(emp => emp.firstName === firstName && emp.lastName === lastName);
          if (loggedInEmployee) {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'You are approved by an admin. Logging in...',
            }).then(() => {
              // Navigate to ViewTask page after successful login
              navigation.navigate('viewtask', {
                loggedInEmployee: loggedInEmployee,
              });
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Access Denied',
              text: 'Employee not found in the database.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'You are not approved by an admin. Please wait for admin approval.',
          });
        }
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Login Error:', error);
      showAlert('Error', 'Failed to login. Please try again.');
    }
  };

  const checkEmployeeApproval = async (firstName, lastName) => {
    // Simulating an async call to check if employee is approved
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Assuming some logic to check if the employee is approved
        // For demo purposes, let's approve if the first name and last name match
        const approvedEmployees = [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Smith' },
          { firstName: 'srisha', lastName: 'sri' }
        ];
        const isApproved = approvedEmployees.some(emp => emp.firstName === firstName && emp.lastName === lastName);
        resolve(isApproved);
      }, 1000); // Simulating delay
    });
  };

  useEffect(() => {
    // Navigate to login page when component mounts
    navigation.navigate('Login');
  }, []);

  const handleSignup = () => {
    navigation.navigate("empHeader");
  };

  return (
    <LinearGradient colors={['#FF69B4', '#E9E4F0']} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isLogin ? 'Employee Login' : 'Employee Signup'}</Text>
          
          {/* First Name and Last Name fields */}
          {isLogin && (
            <>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter First Name"
                autoCapitalize="words"
              />
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter Last Name"
                autoCapitalize="words"
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                secureTextEntry
              />
            </>
          )}
  
          {/* Email, Password, Confirm Password fields */}
          {!isLogin && (
            <>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
              />
            </>
          )}
  
          {/* Approval Message */}
          {!!approvalMessage && (
            <Text style={styles.approvalMessage}>{approvalMessage}</Text>
          )}
  
          {/* Common Buttons */}
          {loading ? (
            <ActivityIndicator size="large" color="#FF69B4" style={styles.loader} />
          ) : (
            <>
              <Pressable onPress={isLogin ? handleLogin : handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
              </Pressable>
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </Text>
                <Pressable onPress={handleToggle}>
                  <Text style={styles.toggleButton}>
                    {isLogin ? 'Signup' : 'Login'}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    backgroundColor: '#FF69B4',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  loader: {
    marginTop: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  toggleText: {
    fontSize: 14,
    marginRight: 5,
    color: '#333',
  },
  toggleButton: {
    fontSize: 14,
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  approvalMessage: {
    marginTop: 10,
    color: '#FF69B4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AuthScreen;
