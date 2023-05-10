import React from 'react';
import styled from 'styled-components';
import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import HeroImage from '../../Image/hero.png';
import { CgGoogle, CgYoutube, CgFacebook } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';

const Home = () => {
  return (
    <Home__Section>
      <div className="Home">
        <div className="Container">
          <Stack
            direction={['column', 'row']}
            height="100%"
            justifyContent={['center', 'space-between']}
            alignItems="center"
            spacing={['16', '40']}
          >
            <VStack width={'full'} alignItems={['center', 'flex-end']} spacing="8">
              <Heading textAlign={['center','left']} marginTop={'40'} children="Learn From The Expert" size={'2xl'} />
              <Text fontFamily={'cursive'} textAlign={['center','left']} children="Learn mern And Full Stack Developer From Scratch" />
              <Link to="/courses">
                <Button size={'lg'} colorScheme="yellow">
                  Enroll Now
                </Button>
              </Link>
            </VStack>
            <Image
              className="vector__graphic"
              boxSize={'md'}
              src={HeroImage}
              objectFit="contain"
            />
          </Stack>
        </div>
      </div>
      <Box padding={'8'} bg="blackAlpha.800">
        <Heading
          textAlign={'center'}
          fontFamily="body"
          color={'yellow.400'}
          children="Our Brands"
        />

        <HStack
          className="Brands__Banner"
          justifyContent={'space-evenly'}
          marginTop="4"
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="Container__Two">
        <video
          autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src=""
        ></video>
      </div>
    </Home__Section>
  );
};

const Home__Section = styled.section`
  .Home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    .Container {
    }

    .vector__graphic {
      filter: drop-shadow(0 40px 10px rgba(0, 0, 0, 0.3));
      animation: VectorAnimation 1s infinite ease-in-out alternate;
    }
    @keyframes VectorAnimation {
      to {
        transform: translateY(-10px);
      }
    }
  }

  .Brands__Banner > svg {
    color: white;
    font-size: 3rem;
    transition: color 0.5s;

    &:hover {
      color: rgb(255, 221, 0);
    }
  }

  .Container__Two {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    video {
      border: 1px solid rgba(0, 0, 0, 0.18);
      width: 60%;
      border-radius: 5px;
      outline: none;
    }
  }

  @media screen and (max-width: 600px) {
    .Container__Two {
      height: unset;
      padding: 8vh 0;
    }
    .Container__Two video {
      width: 100%;
    }
  }
`;

export default Home;
