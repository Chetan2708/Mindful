import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Container, Box, Text } from "@chakra-ui/react";
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';


const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        align="center"
        p={4}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        background="white"
      >
        <Text fontSize="3xl" fontFamily="Work sans" color="black">
          User Connect
        </Text>
      </Box>
      <Box
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        background="white"
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="whatsapp">
          <TabList mb="1em">
            <Tab w="50%" p={4}>
              Login
            </Tab>
            <Tab w="50%" p={4}>
              SignUp
            </Tab> 
          </TabList>
          <TabPanels>
            <TabPanel>{ <Login/>}</TabPanel>
            <TabPanel>{ <Signup/> }</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
