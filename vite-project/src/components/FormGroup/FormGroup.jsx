// FormGroup.jsx
import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    HStack,
    Radio,
    CheckboxGroup,
    Checkbox,
    Select,
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react';

const FormGroup = ({ type, label, options, onChange, value, placeholder, show, handleClick }) => {
    return (
        <FormControl id={type} isRequired>
            <FormLabel>{label}</FormLabel>
            {type === 'radio' && (
                <RadioGroup onChange={onChange} value={value}>
                    <HStack spacing="24px">
                        {options.map((option) => (
                            <Radio key={option.value} value={option.value}>
                                {option.label}
                            </Radio>
                        ))}
                    </HStack>
                </RadioGroup>
            )}
            {type === 'checkbox' && (
                <CheckboxGroup onChange={onChange} value={value}>
                    <HStack spacing="24px">
                        {options.map((option) => (
                            <Checkbox key={option.value} value={option.value}>
                                {option.label}
                            </Checkbox>
                        ))}
                    </HStack>
                </CheckboxGroup>
            )}
            {type === 'select' && (
                <Select
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            )}
            {type === 'password' && (
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder={placeholder}
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            )}
            {type === 'text' && (
                <Input
                    placeholder={placeholder}
                    type='text'
                    _placeholder={{ opacity: 0.5, color: 'black' }}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                />
            )}
            {type === 'email' && (
                <Input
                    placeholder={placeholder}
                    type='email'
                    _placeholder={{ opacity: 0.5, color: 'black' }}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                />
            )}
        </FormControl>
    );
};

export default FormGroup;
