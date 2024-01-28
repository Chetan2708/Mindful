// Signup.jsx
import React, { useState } from 'react';
import { Button, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import FormGroup from '../FormGroup/FormGroup';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    howHeard: [],
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });
  const [load, setLoad] = useState(false);
  const toast = useToast();
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)


  const handleInputChange = (fieldName, value) => {
    let sanitizedValue = value;
  
    // Apply constraints based on the field name
    if (fieldName === 'name') {
      // Allow only alphabets
      sanitizedValue = sanitizedValue.replace(/[^A-Za-z]/g, '');
    } else if (fieldName === 'email') {
      // Allow only alphanumeric characters and special characters allowed in an email
      sanitizedValue = sanitizedValue.replace(/[^a-zA-Z0-9@._-]/g, '');
    } else if (fieldName === 'phone') {
      // Allow only numbers
      sanitizedValue = sanitizedValue.replace(/[^0-9]/g, '');
    }
  
    setFormData((prevData) =>   ({
      ...prevData,
      [fieldName]: sanitizedValue,
    }));
  };

  const submitHandler = async () => {
    setLoad(true);

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

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !gender ||
      howHeard.length === 0 ||
      !city ||
      !state
    ) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all the required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoad(false);
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
        setLoad(false);
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
        setLoad(false);
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
      });
    } catch (error) {
      if (error.response.status === 409) {
        toast({
          title: 'User already exists',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoad(false);
      } else {
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

  const formFields = [
    {
      type: 'text',
      label: 'Name',
      placeholder: 'Enter Your Name (Alphabets only)',
      fieldName: 'name',
    },
    {
      type: 'email',
      label: 'Email',
      placeholder: 'Enter Your Email (Alphanumeric only)',
      fieldName: 'email',
    },
    {
      type: 'password',
      label: 'Password',
      placeholder: 'Enter Your Password',
      fieldName: 'password',
    },
    {
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm Your Password',
      fieldName: 'confirmPassword',
    },
    {
      type: 'text',
      label: 'Phone',
      placeholder: 'Enter Your Phone Number (Numbers only)',
      fieldName: 'phone',
    },
    {
      type: 'radio',
      label: 'Gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Others', value: 'others' },
      ],
      fieldName: 'gender',
    },
    {
      type: 'checkbox',
      label: 'How did you hear about this?',
      options: [
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Friends', value: 'friends' },
        { label: 'Job Portal', value: 'job-portal' },
        { label: 'Others', value: 'others' },
      ],
      fieldName: 'howHeard',
    },
    {
      type: 'select',
      label: 'City',
      options: [
        { label: 'Mumbai', value: 'mumbai' },
        { label: 'Pune', value: 'pune' },
        { label: 'Ahmedabad', value: 'ahmedabad' },
      ],
      fieldName: 'city',
    },
    {
      type: 'text',
      label: 'State',
      placeholder: 'Enter Your State',
      fieldName: 'state',
    },
  ];

  return (
    <VStack spacing="5px">
      {formFields.map((field) => (
        <FormGroup
          key={field.fieldName}
          type={field.type}
          label={field.label}
          options={field.options}
          onChange={(value) => handleInputChange(field.fieldName, value)}
          value={formData[field.fieldName]}
          placeholder={field.placeholder}
          show = {show}
          handleClick={handleClick}
        />
      ))}

      <Button
        colorScheme="whatsapp"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={load}
        background="green.400"
        color="white"
      >
        Save
      </Button>
    </VStack>
  );
};


export default Signup;
