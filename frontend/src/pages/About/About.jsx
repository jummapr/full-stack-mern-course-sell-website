import { Button, Container, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Founder from '../../components/Founder'
import {Link} from 'react-router-dom'
import VideoPlayer from '../../components/VideoPlayer'
import { RiSecurePaymentFill } from 'react-icons/ri'
import TandC from '../../components/TandC'

const About = () => {
  return (
    <>
     <Container maxW={"container.lg"} padding="16" boxShadow={'lg'}>
        <Heading children="About Us" textAlign={["center","left"]}/>

        <Founder />

        <Stack m={'8'} direction={['column','row']} alignItems={"center"}>
            <Text fontFamily={'cursive'} m="8" textAlign={['center','left']}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magni commodi obcaecati optio corporis modi quo voluptatum culpa eius distinctio?
            </Text>
            <Link to={'/subscribe'}>
                <Button variant={'ghost'} colorScheme="yellow">Check Out The PLane</Button>
            </Link>
        </Stack>
        <VideoPlayer />
        <TandC TermsAndCondition="TermsAndCondistion"/>
        <HStack my={'4'} p="4">
            <RiSecurePaymentFill />
            <Heading size={'xs'} fontFamily="sans-serif" textTransform={'uppercase'} children="Payment Is Secure By RazerPay"/>
        </HStack>
     </Container>
    </>
  )
}

export default About
