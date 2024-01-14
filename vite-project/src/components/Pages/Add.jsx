import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../../App';
const Add = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const HandleClick = async () => {
    setLoad(true);
  
    try {
      // Check if the browser is online
      if (!navigator.onLine) {
        // Display a message or trigger a Snackbar for no internet connection
        toast({
          title: "No Internet Connection",
          description: "Please check your Wi-Fi or Mobile Data",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoad(false);
        return;
      }
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      let { data } = await axios.post(
        `${baseUrl}/api/user/addUser`,
        {
          name,
          email,
          
          phone,
        },
        config
      );
  
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoad(false);
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoad(false);
    }
  };
  return (
    <VStack spacing="5px" style={{color:"white"}}>

      <FormControl id="name" isRequired>
        <FormLabel> Name</FormLabel>
        <Input
          placeholder="Enter Your Name (Alphabets only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => setName(e.target.value.replace(/[^A-Za-z]/g, ''))}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          placeholder="Enter Your Email (Alphanumeric only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => setEmail(e.target.value.replace(/[^a-zA-Z0-9@._-]/g, ''))}
        ></Input>
      </FormControl>
  
      <FormControl id="phone" isRequired>
        <FormLabel> Phone</FormLabel>
        <Input
          placeholder="Enter Your Phone Number (Numbers only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
        ></Input>
      </FormControl>



      <Button
        colorScheme="whatsapp"
        width="50%"
        style={{ marginTop: 15 }}
        onClick={HandleClick}
        isLoading={load}
        background="green.400"
        color='white'
      >
        Save
      </Button>
      <Button
        width="50%"
        style={{ marginTop: 15 }}
        onClick={()=>{navigate("/dashboard")}}
        isLoading={load}
        background="red"
        color='white'>
          Cancel
      </Button >

    </VStack>

  )
}

export default Add