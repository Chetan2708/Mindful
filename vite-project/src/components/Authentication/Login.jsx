import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import { useState } from "react";
const Login = () => {

    const [show1, setshow1] = useState(false)
    const [email, setemail] = useState()
    const [password, setpw] = useState()
    const [loading, setLoading] = useState(false)
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
                    ></Input>
                    <InputRightElement w="4rem">
                        <Button h="1.7rem" size='sm'  color="black" background="#a0a0a0">
                            {show1 ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme="whatsapp" w='100%' color='white' background='green.400'
               
                isLoading={loading} >
                Login
            </Button>
            <Button colorScheme='red' w='100%' color='white' background='#b04747'
                onClick={() => {
                    setemail("guest@example.com")
                    setpw("1234")
                }}>
                Guest Login
            </Button>
        </VStack>
    )
}

export default Login
