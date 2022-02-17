import React, {useContext, useRef, useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from "@apollo/client";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from 'react-router-dom';
import { Box, Text, Grid, Center, Icon, Tooltip, VStack , HStack, Button, Input, FormLabel, InputGroup, InputLeftAddon, Drawer, DrawerBody,
  DrawerContent, DrawerOverlay, DrawerCloseButton, DrawerHeader, Stack, Select, Textarea, DrawerFooter, InputRightAddon, useDisclosure} from '@chakra-ui/react';

import ParticleBackground from './ParticleBackground';
import TestPage from './TestPage';
import './App.css'
import LandingPage from './LandingPage';
import {motion, AnimatePresence, useAnimation} from 'framer-motion';
import Stats from './Stats';


const Waitlist = ({ isOpen, onOpen, onClose }) => {
      const [SubmitForm, { loading: favoriteLoading }] = useMutation(SUBMIT_FORM, {
        onCompleted() {
        },
      });
    
      const firstField = useRef()
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [company, setCompany] = useState("");
      const [position, setPosition] = useState("");
      const [desc, setDesc] = useState("");
    
      async function submitForm() {
        console.log(name)
        console.log(email)
        console.log(company)
        console.log(position)
        console.log(desc)
    
        const { data } = await SubmitForm({
          variables: {
              name:name,
              email: email,
              company: company,
              position: position,
              desc: desc
          },
        });
      }
    return (
        <>
        <Drawer
            isOpen={isOpen}
            placement='right'
            initialFocusRef={firstField}
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
                Join the Waitlist
            </DrawerHeader>

            <DrawerBody>
                <Stack spacing='24px'>
                <Box>
                    <FormLabel htmlFor='username'>Name</FormLabel>
                    <Input
                    ref={firstField}
                    id='username'
                    placeholder='Please enter user name'
                    value={ name }
                    onChange={(e) => setName(e.target.value)}
                    />
                </Box>

                <Box>
                    <FormLabel htmlFor='username'>Email</FormLabel>
                    <Input
                    id='email'
                    placeholder='Please enter email'
                    value={ email }
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>

                <Box>
                    <FormLabel htmlFor='username'>Company</FormLabel>
                    <Input
                    id='email'
                    placeholder='Please enter email'
                    value={ company }
                    onChange={(e) => setCompany(e.target.value)}
                    />
                </Box>  

                <Box>
                    <FormLabel htmlFor='username'>Position in Company</FormLabel>
                    <Input
                    id='email'
                    placeholder='Please enter position'
                    value={ position }
                    onChange={(e) => setPosition(e.target.value)}
                    />
                </Box>  

                <Box>
                    <FormLabel htmlFor='desc'>Interest in Crypto</FormLabel>
                    <Textarea id='desc'
                    value={ desc }
                    onChange={(e) => setDesc(e.target.value)} />
                </Box>
                </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue' onClick={submitForm}>Submit</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
    );
}

export default Waitlist;

const SUBMIT_FORM = gql`
    mutation ($name: String!, $email: String!, $company: String!, $position: String!, $desc: String!) {
        submitForm(name: $name, email: $email, company: $company, position: $position, desc: $desc)
    }
`;