import './init.js'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './components/Home';


createRoot(document.getElementById('root')!).render(
  <ChakraProvider resetCSS>
    <Home />
  </ChakraProvider>
)
