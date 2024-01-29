import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const ListView = ({ handleEdit, handleDelete, handleView , data}) => {
  return (
    <Box margin={'10px'}>
      <Stack spacing={4}>
        <TableContainer style={{ color: 'white' }}>
          <Table size='m'>
            <Thead>
              <Tr>
                <Th width='5%'>Id</Th>
                <Th width='10%'>Name</Th>
                <Th width='10%'>Email</Th>
                <Th width='10%'>Phone number</Th>
                <Th width='5%' colSpan={3}>
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0 ? (
                data.map((emp, i) => (
                  <Tr key={emp.id} bg={i % 2 === 0 ? 'gray.700' : 'gray.800 '}>
                    <Td fontSize={'20px'}>{i + 1}</Td>
                    <Td fontSize={'20px'}>{emp.name}</Td>
                    <Td>{emp.email}</Td>

                    <Td>{emp.phone}</Td>
                    <Td>
                      <Button colorScheme='green' onClick={() => handleEdit(emp._id)}>
                        <EditIcon />
                      </Button>
                    </Td>
                    <Td>
                      <Button colorScheme='red' margin={10} onClick={() => handleDelete(emp._id)}>
                        <DeleteIcon />
                      </Button>
                    </Td>
                    <Td>
                      <Button colorScheme='blue' margin={10} onClick={() => handleView(emp._id)}>
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
};

export default ListView;
