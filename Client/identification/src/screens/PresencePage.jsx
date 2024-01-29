// screens/PresencePage.jsx
import React, { useState } from 'react';
import {
  Box, Button, Text, Heading, Image, VStack, Container, Divider, useColorModeValue,
  useToast, Spinner
} from '@chakra-ui/react';
import faceIO from '@faceio/fiojs'; // Assurez-vous d'avoir installé @faceio/fiojs

export default function PresencePage() {
  const courseBoxBg = useColorModeValue('gray.100', 'gray.700');
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour le chargement

  const handleEmargementClick = async () => {
    setIsLoading(true);
    try {
      const faceio = new faceIO('fioa4a2a');
      const userInfo = await faceio.authenticate({ locale: "fr" });

      navigator.geolocation.getCurrentPosition(async (position) => {
        const gps_position = `${position.coords.latitude}, ${position.coords.longitude}`;
        const date = new Date().toISOString();

        const response = await fetch('http://localhost:3000/emargement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ faceio_id: userInfo.facialId, date, gps_position })
        });

        if (response.ok) {
          toast({
            title: "Émargement réussi",
            description: "Votre présence a été enregistrée avec succès.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setIsLoading(false);
        } else {
          throw new Error('Échec de l\'émargement');
        }

      }, (err) => {
        console.error(err);
        toast({
          title: "Erreur de localisation",
          description: "Impossible de récupérer la position GPS.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });

    } catch (err) {
      console.error(err);
      toast({
        title: "Échec de l'authentification",
        description: "L'authentification a échoué.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };



  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={5}>
        <Heading>Émargement de Présence</Heading>
        <Text>Utilisez la reconnaissance faciale pour émarger votre présence pour le cours.</Text>
        
        {/* Ici, vous pouvez afficher l'image ou l'avatar du cours */}
        <Image
          borderRadius="md"
          src="/chemin-vers-votre-image.jpg" // Remplacez par le chemin de votre image
          alt="Image du cours"
        />

        {/* Informations sur le cours */}
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg={courseBoxBg}
          width="full"
        >
          <Heading fontSize="xl">Cours de Mathématiques Avancées</Heading>
          <Text mt={4}>Professeur: Jean Dupont</Text>
          <Text>Date: 12/03/2023</Text>
          <Text>Heure: 14h00 - 16h00</Text>
          <Divider my={4} />
          <Text fontWeight="bold">Sujet du jour: Équations différentielles</Text>
        </Box>

        {/* Bouton pour l'émargement */}
        <Button isDisabled={isLoading} colorScheme="teal" size="lg" onClick={handleEmargementClick} >
          Émarger Maintenant
        </Button>
        {isLoading && <Spinner />}
        {/* Modal pour la webcam */}

        {/* ... Autres composants ... */}
      </VStack>
    </Container>
  );
}
