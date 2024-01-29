// App.jsx
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './screens/LoginPage';
import RoleSelectionPage from './screens/RoleSelectionPage';
import PresencePage from './screens/PresencePage';
import ProfPage from './screens/ProfPage'; // Assurez-vous que le chemin est correct
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/presence" element={<PresencePage />} />
          <Route path="/select-role" element={<RoleSelectionPage />} />
          <Route path="/teacher-dashboard" element={<ProfPage />} /> {/* Ajout de la route pour ProfPage */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
