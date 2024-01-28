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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    howHeard: [],
    city: '',
    state: '',
    load: false,
    password: '',
    confirmPassword: '',
  });

  const toast = useToast();

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const submitHandler = async () => {
    setFormData((prevData) => ({ ...prevData, load: true }));

    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      gender,
      howHeard,
      city,
      state,
    } = formData;

    if (!name || !email || !password || !confirmPassword || !phone || !gender || howHeard.length === 0 || !city || !state) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all the required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setFormData((prevData) => ({ ...prevData, load: false }));
      return;
    }

    try {
      // Check if the browser is online
      if (!navigator.onLine) {
        toast({
          title: 'No Internet Connection',
          description: 'Please check your Wi-Fi or Mobile Data',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setFormData((prevData) => ({ ...prevData, load: false }));
        return;
      }

      if (password !== confirmPassword) {
        toast({
          title: 'Password Mismatch',
          description: 'Password and Confirm Password do not match.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setFormData((prevData) => ({ ...prevData, load: false }));
        return;
      }

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      let { data } = await axios.post(
        `/api/user/`,
        {
          name,
          email,
          password,
          phone,
          gender,
          howHeard,
          city,
          state,
        },
        config
      );

      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        howHeard: [],
        city: '',
        state: '',
        load: false,
      });
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setFormData((prevData) => ({ ...prevData, load: false }));
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel> Name</FormLabel>
        <Input
          placeholder="Enter Your Name (Alphabets only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => handleInputChange('name', e.target.value.replace(/[^A-Za-z]/g, ''))}
          value={formData.name}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          placeholder="Enter Your Email (Alphanumeric only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => handleInputChange('email', e.target.value.replace(/[^a-zA-Z0-9@._-]/g, ''))}
          value={formData.email}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => handleInputChange('password', e.target.value)}
          value={formData.password}
        ></Input>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm Your Password"
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          value={formData.confirmPassword}
        />
      </FormControl>

      <FormControl id="phone" isRequired>
        <FormLabel> Phone</FormLabel>
        <Input
          placeholder="Enter Your Phone Number (Numbers only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => handleInputChange('phone', e.target.value.replace(/[^0-9]/g, ''))}
          value={formData.phone}
        ></Input>
      </FormControl>

      <FormControl id="gender" isRequired>
        <FormLabel> Gender</FormLabel>
        <RadioGroup onChange={(value) => handleInputChange('gender', value)} value={formData.gender}>
          <HStack spacing="24px">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="others">Others</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl id="how-heard" isRequired>
        <FormLabel> How did you hear about this?</FormLabel>
        <CheckboxGroup onChange={(values) => handleInputChange('howHeard', values)} value={formData.howHeard}>
          <HStack spacing="24px">
            <Checkbox value="linkedin">LinkedIn</Checkbox>
            <Checkbox value="friends">Friends</Checkbox>
            <Checkbox value="job-portal">Job Portal</Checkbox>
            <Checkbox value="others">Others</Checkbox>
          </HStack>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="city" isRequired>
        <FormLabel> City</FormLabel>
        <Select
          placeholder="Select City"
          onChange={(e) => handleInputChange('city', e.target.value)}
          value={formData.city}
        >
          <option value="mumbai">Mumbai</option>
          <option value="pune">Pune</option>
          <option value="ahmedabad">Ahmedabad</option>
        </Select>
      </FormControl>

      <FormControl id="state" isRequired>
        <FormLabel> State</FormLabel>
        <Input
          placeholder="Enter Your State"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => handleInputChange('state', e.target.value)}
          value={formData.state}
        ></Input>
      </FormControl>

      <Button
        colorScheme="whatsapp"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={formData.load}
        background="green.400"
        color="white"
      >
        Save
      </Button>
    </VStack>
  );
};

export default Signup;
