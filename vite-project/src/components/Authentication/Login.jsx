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


const Login = () => {
  const [show1, setshow1] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpw] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo){
      navigate("/dashboard")
    }
}, [])


  const handleClick = async () => {
    setLoading(true);

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
        "/api/user/login",
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
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="Email" isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your Email "
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => setemail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show1 ? "text" : "password"}
            value={password}
            placeholder="Enter Your Password"
            _placeholder={{ opacity: 0.5, color: 'black' }}
            onChange={(e) => setpw(e.target.value)}
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
        onClick={() => {
          setemail("guest@example.com");
          setpw("1234");
        }}
      >
        Guest Login
      </Button>
    </VStack>
  );
};

export default Login;
