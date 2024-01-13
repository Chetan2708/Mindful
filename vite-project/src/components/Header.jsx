import React from 'react'
import { HStack, Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
const Header = ({ setisAdding }) => {
  const navigate =useNavigate()
  const handleLogout =()=>{
    localStorage.removeItem("userInfo");
    navigate("/");
  }
  return (
    <header>
      <HStack display={'flex'} justifyContent={'space-between'}>

      <Heading>Dashboard</Heading>
      <Button colorScheme='teal' variant='outline'  onClick={handleLogout}>Logout</Button>
      </HStack>
      <Link to="/dashboard/add">

        <Button colorScheme='teal' variant='outline' margin={'20px'} width={'30%'}>
          Add User
        </Button>
      </Link>
    </header>
  )
}

export default Header