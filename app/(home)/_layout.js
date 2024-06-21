import {Stack} from "expo-router";
export default function Layout(){
    return(
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="adminlogin"/>
            <Stack.Screen name="employeelogin"/>
            <Stack.Screen name="addemployee"/>
            <Stack.Screen name="Header"/>
            <Stack.Screen name="Add"/>
            <Stack.Screen name="Edit"/>
            <Stack.Screen name="List"/>
            <Stack.Screen name="Dashboard"/>
            <Stack.Screen name= "employeesignup"/>
            <Stack.Screen name= "adminDashboard"/>
            <Stack.Screen name= "empDashboard"/>
            <Stack.Screen name= "empHeader"/>
            <Stack.Screen name= "View"/>
            <Stack.Screen name= "viewtask"/>
            <Stack.Screen name= "TaskData"/>
        </Stack>
    )
        

    
}
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// export default function Layout() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" component={Index} />
//       <Stack.Screen name="adminlogin" component={AdminLogin} />
//       <Stack.Screen name="employeelogin" component={EmployeeLogin} />
//       <Stack.Screen name="Header" component={Header} />
//       <Stack.Screen name="Add" component={Add} />
//       <Stack.Screen name="Edit" component={Edit} />
//       <Stack.Screen name="List" component={List} />
//       <Stack.Screen name="adminDashboard" component={AdminDashboard} />
//       <Stack.Screen name="empDashboard" component={EmployeeDashboard} />
//       <Stack.Screen name="empHeader" component={EmployeeHeader} />
//       <Stack.Screen name="viewtask" component={ViewTask} />
//     </Stack.Navigator>
//   );
// }
