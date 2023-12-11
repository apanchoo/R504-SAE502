// screens/PresencePage.jsx
import React, { useRef, useState } from 'react';

import {
    Box,
    Button,
    Text,
    Heading,
    Image,
    VStack,
    Container,
    Divider,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react';
// Importez les icônes ou images nécessaires

export default function PresencePage() {
  // Fonction pour gérer l'émargement par reconnaissance faciale

  // Style pour les boîtes de cours
  const courseBoxBg = useColorModeValue('gray.100', 'gray.700');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        setIsVideoPlaying(true);
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
      track.stop();
    });

    videoRef.current.srcObject = null;
    setIsVideoPlaying(false);
  };

  const handleEmargementClick = () => {
    onOpen();
    startVideo();
  };

  const handleClose = () => {
    onClose();
    stopVideo();
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
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleEmargementClick}
        >
          Émarger Maintenant
        </Button>
        {/* Modal pour la webcam */}
        <Modal isOpen={isOpen} onClose={handleClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Webcam</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <video ref={videoRef} width="100%" height="auto" />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleClose}>
                Fermer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* ... Autres composants ... */}
      </VStack>
    </Container>
  );
}
