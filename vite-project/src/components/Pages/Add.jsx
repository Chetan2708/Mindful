import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    setLoad(true);

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
          position: 'bottom',
        });
        setLoad(false);
        return;
      }

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      let { data } = await axios.post(
        `/api/user/addUser`,
        formData,
        config
      );

      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoad(false);
      console.log(data);
      navigate('/dashboard');
    } catch (error) {
      if (error.response.status===409){

        toast({
          title: 'User already Registered!',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoad(false);
      }
      else{
        
        toast({
          title: 'Error Occurred!',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoad(false);
      }
    }
    };
    
    return (
      <VStack spacing="5px" style={{ color: 'white' }}>
        <Text fontSize="2xl" fontFamily="Work sans">Add a new User</Text>
      <FormControl id="name" isRequired>
        <FormLabel> Name</FormLabel>
        <Input
          placeholder="Enter Your Name (Alphabets only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          placeholder="Enter Your Email (Alphanumeric only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        ></Input>
      </FormControl>

      <FormControl id="phone" isRequired>
        <FormLabel> Phone</FormLabel>
        <Input
          placeholder="Enter Your Phone Number (Numbers only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        ></Input>
      </FormControl>

      <Button
        colorScheme="whatsapp"
        width="50%"
        style={{ marginTop: 15 }}
        onClick={handleClick}
        isLoading={load}
        background="green.400"
        color="white"
      >
        Save
      </Button>
      <Button
        width="50%"
        style={{ marginTop: 15 }}
        onClick={() => {
          navigate('/dashboard');
        }}
        isLoading={load}
        background="red"
        color="white"
      >
        Cancel
      </Button>
    </VStack>
  );
};

export default Add;
