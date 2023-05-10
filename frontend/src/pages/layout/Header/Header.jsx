import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import NavbarLinksList from '../../../components/NavbarLinksList';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../redux/Actions/user';

const Header = ({isAuthenticated=false,user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const {isAuthenticated} = useSelector(state=> state.user)
  
  const dispatch = useDispatch()

  const logout = () => {
    onClose()
    dispatch(Logout());
  }

  return (
    <Header__Components>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={'12'}
        zIndex="overlay"
        rounded="full"
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(5px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>JummaCourse</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <NavbarLinksList url="/" title="Home"  onClose={onClose}/>
              <NavbarLinksList url="/courses" title="Courses"  onClose={onClose}/>
              <NavbarLinksList url="/request" title="Request a course"  onClose={onClose}/>
              <NavbarLinksList url="/contact" title="Contact"  onClose={onClose}/>
              <NavbarLinksList url="/about" title="About"  onClose={onClose}/>

              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom={'2rem'}
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to={'/profile'}>
                          <Button variant={'ghost'} colorScheme={'yellow'}>
                            Profile
                          </Button>
                        </Link>
                        <Button variant={'ghost'} onClick={logout}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>

                      {
                        user&& user.role === 'admin' && <Link to={'/admin/dashboard'}>
                          <Button onClick={onClose} colorScheme={'purple'} variant="ghost">
                            <RiDashboardFill style={{margin: '4px'}}/>
                            DashBoard
                          </Button>
                        </Link>
                      }
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to={'/login'}>
                      <Button colorScheme={'yellow'}>Login</Button>
                    </Link>

                    <p>OR</p>

                    <Link onClick={onClose} to={'/register'}>
                      <Button colorScheme={'yellow'}>register</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Header__Components>
  );
};

const Header__Components = styled.section``;

export default Header;
