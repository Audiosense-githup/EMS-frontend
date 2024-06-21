
let employeesData = [
  {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      designation: 'Software Engineer',
      qualification: 'B.E. in Computer Science',
      address: '123 Main St, City, Country',
      contactNumber: '123-456-7890',
      resume: 'john_doe_resume.pdf',
      degreeCertificate: 'john_doe_degree.pdf',
      aadharCard: 'john_doe_aadhar.jpg',
      panCard: 'john_doe_pan.jpg',
      bankPassbook: 'john_doe_passbook.pdf',
      photo: 'john_doe_photo.jpg',
      status: 'approved',
      tasks: [
          { id: 1, description: 'Implement feature X' },
          { id: 2, description: 'Bug fixes on module Y' },
      ],
  },
  {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      designation: 'HR Manager',
      qualification: 'MBA in Human Resources',
      address: '456 Park Ave, City, Country',
      contactNumber: '987-654-3210',
      resume: 'jane_smith_resume.pdf',
      degreeCertificate: 'jane_smith_degree.pdf',
      aadharCard: 'jane_smith_aadhar.jpg',
      panCard: 'jane_smith_pan.jpg',
      bankPassbook: 'jane_smith_passbook.pdf',
      photo: 'jane_smith_photo.jpg',
      status: 'approved',
      tasks: [
          { id: 3, description: 'Interview candidate A' },
          { id: 4, description: 'Plan team outing' },
      ],
  },
]

const addEmployee = (newEmployee) => {
  // Assign a new id to the employee
  const id = employeesData.length + 1;
  const employeeWithId = { ...newEmployee, id };

  // Assuming new employees are pending approval
  employeeWithId.status = 'pending';

  // Push the new employee to the array
  employeesData.push(employeeWithId);

  // Return the new employee object
  return employeeWithId;
};

const updateEmployee = (updatedEmployee) => {
  const index = employeesData.findIndex((employee) => employee.id === updatedEmployee.id);
  if (index !== -1) {
      // Update employee's tasks
      employeesData[index].tasks = updatedEmployee.tasks;

      // Update any other fields if needed
      employeesData[index] = { ...employeesData[index], ...updatedEmployee };

      return employeesData[index];
  }
  return null;
};

const getEmployeeById = (id) => {
  return employeesData.find((employee) => employee.id === id);
};

// Function to get logged-in employee by id
const getLoggedInEmployeeById = (id) => {
  return employeesData.find((employee) => employee.id === id);
};

export { employeesData, addEmployee, updateEmployee, getEmployeeById, getLoggedInEmployeeById };
