
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Button, Image, TextInput, StyleSheet, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { updateEmployee } from '../../data'; // Import the updateEmployee function

const EditEmployee = ({ selectedEmployee, setIsModalOpen }) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    qualification: '',
    address: '',
    contactNumber: '',
    resume: null,
    degreeCertificate: null,
    aadharCard: null,
    panCard: null,
    bankPassbook: null,
    photo: null
  });

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);
  const firstNameInput = useRef(null);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        firstName: selectedEmployee.firstName || '',
        lastName: selectedEmployee.lastName || '',
        designation: selectedEmployee.designation || '',
        qualification: selectedEmployee.qualification || '',
        address: selectedEmployee.address || '',
        contactNumber: selectedEmployee.contactNumber || '',
        resume: selectedEmployee.resume || null,
        degreeCertificate: selectedEmployee.degreeCertificate || null,
        aadharCard: selectedEmployee.aadharCard || null,
        panCard: selectedEmployee.panCard || null,
        bankPassbook: selectedEmployee.bankPassbook || null,
        photo: selectedEmployee.photo || null
      });
    }

    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();

    // Focus on the first name input field when component mounts
    firstNameInput.current?.focus();
  }, [selectedEmployee]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (name, file) => {
    if (file) {
      setFormData({ ...formData, [name]: file });
    }
  };

  const handleUpdateEmployee = async () => {
    const { firstName, lastName, designation, qualification, address, contactNumber, resume, degreeCertificate, aadharCard, panCard, bankPassbook, photo } = formData;

    // Check if any required fields are empty
    if (!firstName || !lastName || !designation || !qualification || !address || !contactNumber || !resume || !degreeCertificate || !aadharCard || !panCard || !bankPassbook || !photo) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true
      });
      return;
    }

    const updatedEmployee = {
      ...selectedEmployee,
      ...formData
    };

    try {
      // Simulate server request (replace with actual API call)
      await axios.post(`http://localhost:8081/Dashboard/Edit/${selectedEmployee.id}`, updatedEmployee);

      // Update the employee in the local data store
      updateEmployee(updatedEmployee);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${firstName} ${lastName}'s data has been updated.`,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsModalOpen(false); // Close the modal
               navigation.navigate('employeeDashboard');
        }
      });

      // Reset form data after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        designation: '',
        qualification: '',
        address: '',
        contactNumber: '',
        resume: null,
        degreeCertificate: null,
        aadharCard: null,
        panCard: null,
        bankPassbook: null,
        photo: null
      });
    } catch (error) {
      console.error('Error updating employee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update employee. Please try again.',
        showConfirmButton: true
      });
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setFormData({ ...formData, photo: photoData.uri });
      setIsCameraOpen(false);
    }
  };

   const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <ScrollView>
      <LinearGradient colors={["#FF69B4", "#E9E4F0"]} style={styles.gradient}>
        <View style={styles.container}>
          {isCameraOpen ? (
            <Camera style={styles.camera} ref={cameraRef}>
              <View style={styles.cameraControls}>
                <Button title="Take Photo" onPress={takePhoto} style={styles.controls}/>
                <Button title="Cancel" onPress={() => setIsCameraOpen(false)} style={styles.controls} />
              </View>
            </Camera>
          ) : (
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <Text style={styles.title}>Edit Employee</Text>
                <InputField
                  label="First Name"
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  ref={firstNameInput}
                />
                <InputField
                  label="Last Name"
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                />
                <InputField
                  label="Designation"
                  value={formData.designation}
                  onChangeText={(value) => handleInputChange('designation', value)}
                />
                <InputField
                  label="Qualification"
                  value={formData.qualification}
                  onChangeText={(value) => handleInputChange('qualification', value)}
                />
                <InputField
                  label="Address"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
                <InputField
                  label="Contact Number"
                  value={formData.contactNumber}
                  onChangeText={(value) => handleInputChange('contactNumber', value)}
                />
                <FileInputField
                  label="Resume"
                  accept=".pdf"
                  onChange={(file) => handleFileChange('resume', file)}
                  selectedFileName={formData.resume ? formData.resume.name : ''}
                />
                <FileInputField
                  label="Degree Certificate"
                  accept=".pdf"
                  onChange={(file) => handleFileChange('degreeCertificate', file)}
                  selectedFileName={formData.degreeCertificate ? formData.degreeCertificate.name : ''}
                />
                <FileInputField
                  label="Aadhar Card"
                  accept="image/*"
                  onChange={(file) => handleFileChange('aadharCard', file)}
                  selectedFileName={formData.aadharCard ? formData.aadharCard.name : ''}
                />
                <FileInputField
                  label="PAN Card"
                  accept="image/*"
                  onChange={(file) => handleFileChange('panCard', file)}
                  selectedFileName={formData.panCard ? formData.panCard.name : ''}
                />
                <FileInputField
                  label="Bank Passbook"
                  accept=".pdf"
                  onChange={(file) => handleFileChange('bankPassbook', file)}
                  selectedFileName={formData.bankPassbook ? formData.bankPassbook.name : ''}
                />
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Photo</Text>
                  <Button title="Take a Live Photo" onPress={() => setIsCameraOpen(true)} />
                </View>
                {formData.photo && (
                  <Image source={{ uri: formData.photo }} style={styles.photoPreview} />
                )}
                <View style={styles.buttonContainer}>
                  <Button title="Update" onPress={handleUpdateEmployee} style={styles.button} />
                  <Button title="Cancel" onPress={handleCancel} style={styles.button} />
                </View>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const InputField = React.forwardRef(({ label, value, onChangeText }, ref) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      ref={ref}
      style={styles.input}
    />
  </View>
));

const FileInputField = ({ label, accept, onChange, selectedFileName }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.fileInput}>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        style={{ display: 'none' }} // Hide the file input
        id={`${label}-input`}
      />
      <label htmlFor={`${label}-input`} style={styles.chooseFileLabel}>
        Choose File
      </label>
      <Text style={styles.selectedFileName}>{selectedFileName}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333'
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555555'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    color: '#333333'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: 'center',
    width: '48%',
    fontSize: 16
  },
  photoPreview: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 10
  },
  camera: {
    width: '45%',
    aspectRatio: 3 / 4,
    marginBottom: 20,
    marginLeft: 200
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  controls: {
    backgroundColor: '#007BFF',
    color: 'white',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: 'center',
    width: '48%',
    fontSize: 16
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10
  },
  chooseFileLabel: {
    color: '#555555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 18,
    textAlign: 'center'
  },
  selectedFileName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333333'
  }
});

export default EditEmployee;
