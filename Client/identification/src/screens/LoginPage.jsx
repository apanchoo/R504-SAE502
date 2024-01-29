import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Heading,
  Text,
  useColorMode,
  IconButton,
  theme,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import faceIO from '@faceio/fiojs';
import { FaMoon, FaSun } from 'react-icons/fa';

const faceio = new faceIO('fioa4a2a'); // Remplacez avec votre Project ID de FaceIO

export default function LoginPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showShowPassword);
  const handleLoginSuccess = () => navigate('/select-role');

  const enrollNewUser = async () => {
    try {
      const userInfo = await faceio.enroll({
        locale: "fr", // Ou "auto" pour la détection automatique de la langue
      });
      console.log("Utilisateur inscrit avec succès:", userInfo);
      handleLoginSuccess(); // Naviguez ou gérez l'inscription réussie
    } catch (errCode) {
      console.error("Erreur lors de l'inscription:", errCode);
    }
  };

  const authenticateUser = async () => {
    try {
      const userData = await faceio.authenticate({
        locale: "fr", // Ou "auto"
      });
      console.log("Utilisateur authentifié avec succès:", userData);
      handleLoginSuccess(); // Naviguez ou gérez l'authentification réussie
    } catch (errCode) {
      console.error("Erreur lors de l'authentification:", errCode);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}>
        <Flex align="center" justify="center" height="100vh">
          <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
            <IconButton
              icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
              isRound={true}
              size="md"
              alignSelf="flex-end"
              onClick={toggleColorMode}
              aria-label="Toggle theme"
            />
            <Stack align="center">
              <Heading fontSize="4xl">Connectez-vous à votre compte</Heading>
              <Text fontSize="lg" color={colorMode === 'dark' ? 'gray.200' : 'gray.600'}>
                pour profiter de tous nos services ✌️
              </Text>
            </Stack>
            <Box rounded="lg" bg={colorMode === 'dark' ? 'gray.700' : 'white'} boxShadow="lg" p={8}>
              <Stack spacing={4}>
                {/* Autres éléments du formulaire si nécessaire */}
              </Stack>
              <Stack spacing={6}>
                <Button onClick={authenticateUser} bg="green.400" color="white" _hover={{ bg: 'green.500' }}>
                  Connexion avec FaceIO
                </Button>
                <Button onClick={enrollNewUser} bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
                  S'inscrire avec FaceIO
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
