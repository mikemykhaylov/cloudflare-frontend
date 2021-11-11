import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useToast } from '@chakra-ui/react';

import Feed from '../containers/Feed';
import NewPost from '../containers/NewPost';
import Navbar from './General/Navbar';

const queryClient = new QueryClient({});

const App: React.FC = () => {
  const toast = useToast();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/new" element={<NewPost toast={toast} />} />
          <Route path="/" element={<Feed />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
