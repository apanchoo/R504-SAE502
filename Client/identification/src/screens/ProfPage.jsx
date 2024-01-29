// ProfPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';

const ProfPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/emargements')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);

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
            <Th>Date d'Émargement</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map(student => (
            <Tr key={student.id}>
              <Td>{student.name}</Td>
              <Td>{getStatusBadge(student.present)}</Td>
              <Td>{student.date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};


export default ProfPage;
