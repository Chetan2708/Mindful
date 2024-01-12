import React from 'react'
import { Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Header = ({setisAdding}) => {
  return (
    <header>
        <Heading>User Management System</Heading>
<Link to ="/add">

        <Button colorScheme='teal' variant='outline'  margin={'20px'} width={'30%'}>
    Add User 
  </Button>
</Link>
    </header>
  )
}

export default Header