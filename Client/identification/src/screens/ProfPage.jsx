// ProfPage.jsx
import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';

const students = [
  { id: 1, name: 'Alice', present: true },
  { id: 2, name: 'Bob', present: false },
  { id: 3, name: 'Charlie', present: null }, // null représente "Pas encore signé"
  // Ajoutez d'autres élèves ici
];

const ProfPage = () => {
  const getStatusBadge = (present) => {
    if (present === true) {
      return <Badge colorScheme="green">Présent</Badge>;
    } else if (present === false) {
      return <Badge colorScheme="red">Absent</Badge>;
    } else {
      return <Badge colorScheme="yellow">Pas encore signé</Badge>;
    }
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Liste des élèves</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Statut</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map(student => (
            <Tr key={student.id}>
              <Td>{student.name}</Td>
              <Td>{getStatusBadge(student.present)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProfPage;
