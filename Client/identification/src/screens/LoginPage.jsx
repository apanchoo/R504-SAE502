import React from 'react';
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

import { FaMoon, FaSun } from 'react-icons/fa'; // Assurez-vous d'installer react-icons

export default function LoginPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  // ... useState et autres hooks

  const handleLoginSuccess = () => {
    // Après une connexion réussie
    navigate('/presence');
  };

  return (
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
                <FormControl id="email">
                  <FormLabel color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}>Adresse email</FormLabel>
                  <Input type="email" required />
                </FormControl>
                <FormControl id="password">
                  <FormLabel color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}>Mot de passe</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} required />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? 'Cacher' : 'Montrer'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10}>
                  <Button
                  onClick={handleLoginSuccess}
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Connexion
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
   
  );
}
