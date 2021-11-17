import { CreateGroupForm } from '@components/CreateGroupForm/CreateGroupForm';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Container } from '@ui/Container/Container';
import React from 'react';

export const CreateGroupPage: React.FC = () => (
  <>
    <Header isInteractive />
    <Container>
      <CreateGroupForm />
    </Container>
    <Footer />
  </>
);
