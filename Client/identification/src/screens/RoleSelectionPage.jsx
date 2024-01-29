import React from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const boxBg = useColorModeValue('white', 'gray.700');

  const handleSelectRole = (role) => {
    // Supposons que la route '/presence' est la page de présence pour les élèves
    if (role === 'student') {
      navigate('/presence');
    } else if (role === 'teacher') {
      // Ici, vous pouvez naviguer vers une autre page spécifique aux enseignants
      navigate('/teacher-dashboard');
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.800')} align="center" justify="center">
      <VStack spacing={8} mx="auto" maxW="md" py={12} px={6} align="center" justify="center" height="100vh">
        <Heading fontSize="4xl" textAlign="center">Sélectionnez votre rôle</Heading>
        <Box p={8} bg={boxBg} rounded="lg" boxShadow="lg" width="full">
          <VStack spacing={4}>
            <Button
              leftIcon={<Icon as={FaUserGraduate} />}
              width="full"
              colorScheme="blue"
              onClick={() => handleSelectRole('student')}
            >
              Élève
            </Button>
            <Button
              leftIcon={<Icon as={FaChalkboardTeacher} />}
              width="full"
              colorScheme="teal"
              onClick={() => handleSelectRole('teacher')}
            >
              Enseignant
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
