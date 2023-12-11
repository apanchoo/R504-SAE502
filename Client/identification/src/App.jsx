// App.jsx
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './screens/LoginPage';
import RoleSelectionPage from './screens/RoleSelectionPage';
import PresencePage from './screens/PresencePage'; // Créez ce composant pour gérer l'émargement
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/presence" element={<PresencePage />} />
          <Route path="/select-role" element={<RoleSelectionPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
