import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/Actions/user';
import toast from 'react-hot-toast';

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const {loading,error,subscriptionId} = useSelector(state => state.subscription)
  const {error:CourseError} = useSelector(state => state.courses)

  const subscribeHandler = async() =>  {
   const {data} = await axios.get(`${server}/razorpaykey`)
   setKey(data.key)
   dispatch(buySubscription())
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (CourseError) {
      toast.error(CourseError);
      dispatch({ type: 'clearError' });
    }

    if (subscriptionId) {
      const openPopup = () => {
        const option = {
          key,
          name: "courseJumma",
          description: "Get Access to All premium content",
          // image: "",
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverifiction`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: ""
          },

          notes: {
            address : "Jumma Hingorja From India"
          },
          theme: {
            color: "#FFC800"
        }

        }

        const razor = new window.Razorpay(option);
        razor.open()
      } 
      openPopup()
    }
  },[dispatch,error,CourseError,user.name,user.email,key,subscriptionId])

  return (
    <div>
      <Container h={'90vh'} p={'16'}>
        <Heading children={'Welcome'} m={'8'} textAlign="center" />
        <VStack
          boxShadow={'lg'}
          alignItems="stretch"
          borderRadius={'lg'}
          spacing="0"
        >
          <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0 ' }}>
            <Text color={'black'} children={`Pro Pack - $299.00`} />
          </Box>
          <Box p={'4'}>
            <VStack textAlign={'center'} p="8" mt={'4'} spacing="8">
              <Text children={`Join Pro Pack And Get Access To All Content.`} />
              <Heading size={'md'} children={'$299 Only'} />
            </VStack>
            <Button isLoading={loading} my={'8'} w="full" colorScheme={'yellow'} onClick={subscribeHandler}>
              Buy Now
            </Button>
          </Box>
          <Box
            bg={'blackAlpha.600'}
            p="4"
            css={{ borderRadius: '0 0 8px 8px' }}
          >
            <Heading
              color={'white'}
              textTransform="uppercase"
              size={'sm'}
              children={'100% Refund at  cancellation'}
            />
            <Text
              fontSize={'xs'}
              color="white"
              children="*Terms And Condition Apply"
            />
          </Box>
        </VStack>
      </Container>
    </div>
  );
};

export default Subscribe;
