import React, { useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { baseUrl } from '../../App';


const Login = () => {
  const [show1, setshow1] = useState(false);
  const [formData, setFormData] = useState({
    email: "", 
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo) {
      navigate("/dashboard")
    }
  }, [])


  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGuestLogin = () => {
    setFormData({
      email: "guest@example.com",
      password: "abc"
    });
  };
  const handleClick = async () => {
    setLoading(true);
    const {
      email ,
      password
    } = formData
    if (!navigator.onLine) {
      toast({
        title: "No Internet Connection",
        description: "Please check your internet connection and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      return;
    }

    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let { data } = await axios.post(
        `/api/user/login`,
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          toast({
            title: "Invalid Credentials",
            description: "Please check your email and password.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        } else {
          toast({
            title: "Error Occurred!",
            description: "Something went wrong. Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      } else if (error.request) {

        toast({
          title: "Network Error",
          description: "Please check your internet connection and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {

        toast({
          title: "Error Occurred!",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="Email" isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          value={formData.email}
          placeholder="Enter Your Email "
          _placeholder={{ opacity: 0.5, color: 'black' }}
          name='email'
          onChange={handleInputChange}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show1 ? "text" : "password"}
            value={formData.password}
            placeholder="Enter Your Password"
            _placeholder={{ opacity: 0.5, color: 'black' }}
            onChange={handleInputChange}
            name='password'
          />
          <InputRightElement w="4rem">
            <Button
              h="1.7rem"
              size="sm"
              color="black"
              background="#a0a0a0"
              onClick={() => setshow1(!show1)}
            >
              {show1 ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="whatsapp"
        w='100%'
        color='white'
        background='green.400'
        onClick={handleClick}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        colorScheme='red'
        w='100%'
        color='white'
        background='#b04747'
        onClick={handleGuestLogin}
      >
        Guest Login
      </Button>
    </VStack>
  );
};

export default Login;
