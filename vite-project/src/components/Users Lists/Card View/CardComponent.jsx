import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Card, Text } from '@chakra-ui/react'
import React from 'react'

const CardComponent = ({item , i , handleEdit, handleDelete, handleView} ) => {
    return (
        <Card key={item.id} className='whole-card' bg={i % 2 === 0 ? 'gray.700' : 'gray.800 '}>
            <div key={item.id} className='card-details' >
                <div className='card-content' style={{ color: 'white' }}>
                    <Text fontSize="xl" >ID: {i + 1}</Text>
                    <Text fontSize="xl">Name: {item.name}</Text>
                    <Text>Email: {item.email}</Text>
                    <Text>Phone: {item.phone}</Text>
                </div>
                <div className='card-action-btns'>
                    <Button sx={{marginBottom: 4}} colorScheme="green" onClick={() => handleEdit(item._id)}>
                        <EditIcon />
                    </Button>
                    <Button sx={{ marginBottom: 4 }} colorScheme="red" onClick={() => handleDelete(item._id)}>
                        <DeleteIcon />
                    </Button>
                    <Button sx={{ marginBottom: 4}} colorScheme="blue" onClick={() => handleView(item._id)}>
                        View
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default CardComponent