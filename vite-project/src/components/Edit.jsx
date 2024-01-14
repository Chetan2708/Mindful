import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  CheckboxGroup,
  Checkbox,
  Select,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Edit = () => {
  const allData = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    state: '',
  });
  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    // Fetch existing user data (excluding password) and populate updateData state
    console.log(allData)
    const currentUser = allData.find((user) => user._id === id);
    if (currentUser) {
      const { password, ...userDataWithoutPassword } = currentUser;
      setUpdateData(userDataWithoutPassword);
    }
  }, [id, allData]);

  const handleInputChange = (field, value) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    console.log(id);
    try {
      // Check if the browser is online
      if (!navigator.onLine) {
        // Display a message or trigger a Snackbar for no internet connection
        toast({
          title: 'No Internet Connection',
          description: 'Please check your Wi-Fi or Mobile Data',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        return;
      }

      // Display confirmation dialog using SweetAlert
      const confirmResult = await Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      });

      if (confirmResult.isConfirmed) {
        const response = await axios.put(`/api/user/edit/${id}`, updateData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // Handle successful update (e.g., show success message)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard');
        } else {
          // Handle update failure (e.g., show error message)
          toast({
            title: 'Update Failed',
            description: 'Failed to update user details',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      } else if (confirmResult.isDenied) {
        // Handle case where the user chooses not to save changes
        Swal.fire('Changes are not saved', '', 'info');
      }
    } catch (error) {
      console.error('Error during update request:', error.message);
    }
  };

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <VStack spacing="5px" style={{color:'white'}}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name (Alphabets only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          value={updateData.name}
          onChange={(e) => handleInputChange('name', e.target.value.replace(/[^A-Za-z\s]/g, ''))}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          value={updateData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </FormControl>

      <FormControl id="phone" isRequired>
        <FormLabel>Phone</FormLabel>
        <Input
          placeholder="Enter Your Phone Number (Numbers only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          value={updateData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value.replace(/[^0-9]/g, ''))}
        />
      </FormControl>

      <FormControl id="gender" isRequired>
        <FormLabel>Gender</FormLabel>
        <RadioGroup onChange={(value) => setUpdateData((prevData) => ({ ...prevData, gender: value }))} value={updateData.gender}>
          <HStack spacing="24px">
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
            <Radio value="Other">Other</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl id="city" isRequired>
        <FormLabel> City</FormLabel>

        <Select value={updateData.city} placeholder="Select City" onChange={(e) => handleInputChange('city', e.target.value)} >
          <option value="mumbai" style={{color:"black"}}> Mumbai </option>
          <option value="pune" style={{color:"black"}}>Pune</option>
          <option value="ahmedabad" style={{color:"black"}}>Ahmedabad</option>
        </Select>
      </FormControl>

      <FormControl id="state" isRequired>
        <FormLabel>State</FormLabel>
        <Input
          placeholder="Enter Your State"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          value={updateData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="whatsapp"
        width="20%"
        style={{ marginTop: 15 }}
        onClick={handleUpdate}
        background="green.400"
        color="white"
      >
        Edit
      </Button>
      <Button colorScheme="red" width="20%" style={{ marginTop: 15 }} onClick={handleClose} color="white">
        Close
      </Button>
    </VStack>
  );
};

export default Edit;
