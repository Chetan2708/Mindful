import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  Stack,
} from '@chakra-ui/react'
import { useDispatch , useSelector } from 'react-redux'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { setVal } from '../features/inputSlice'

const List = ({ handleEdit, handleDelete, handleView }) => {
  const allData = useSelector((state) => state.allUsers)
  const search = useSelector((state) => state.searchResult)
  const temp = useSelector((state) => state.temp)
  const dispatch = useDispatch()
  const [option, setOption] = useState(localStorage.getItem('filters') || 'A-Z');



  useEffect(()=>{
    setOption(localStorage.getItem('filters') || 'A-Z');
    dispatch(setVal(localStorage.getItem('filters') || 'A-Z'))
  },[temp])

  const sortedData = allData
    .filter(
      (item) =>
        search.toLowerCase() === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (option === 'A-Z' || option === 'Z-A') {
        return option === 'A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (option === 'lastModified') {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return dateB - dateA;
      } else if (option === 'lastInserted') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      }
  
      return 0;

    });
      {console.log(sortedData)}
  return (
    <Box margin={'10px'}>
      <Stack spacing={4}>
      <TableContainer style={{ color: 'white' }}>
        <Table size='m'>
          <Thead >
            <Tr >
              <Th width='5%'>Id</Th>
              <Th width='10%'>Name</Th>
              <Th width='10%'>Email</Th>
              <Th width='10%'>Phone number</Th>
              <Th width='5%' colSpan={3} >
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            { 
            sortedData.length > 0 ? (
              sortedData
                .map((emp, i) => (
                  <Tr
                    key={emp.id}
                    bg={i % 2 === 0 ? 'gray.700' : 'gray.800 '} 
                  >
                    <Td fontSize={'20px'}>{i + 1}</Td>
                    <Td fontSize={'20px'}>{emp.name}</Td>
                    <Td>{emp.email}</Td>
                    
                    <Td>{emp.phone}</Td>
                    <Td>
                      <Button
                        colorScheme='green'
                        onClick={() => handleEdit(emp._id)}
                      >
                        <EditIcon/>
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme='red'
                        margin={10}
                        onClick={() => handleDelete(emp._id)}
                      >
                       <DeleteIcon />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme='blue'
                        margin={10}
                        onClick={() => handleView(emp._id)}
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))
            ) : (
              <Tr>
                <Td colSpan={7}>No Data Found</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      </Stack>
    </Box>
  );
}

export default List