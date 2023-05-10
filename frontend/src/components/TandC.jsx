import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const TandC = ({TermsAndCondition}) => {
  return (
    <div>
      <Box>
        <Heading size={'md'} children="Terms And Conditions" textAlign={['center','left']} my="4"/>

        <Box h={'sm'} p={'4'} overflowY={'scroll'}>
            <Text textAlign={['center','left']} letterSpacing={'widest'} fontFamily="heading">
                {TermsAndCondition}
            </Text>
            <Heading my={'4'} size={'xs'} children="Refund only Applicable For Cancellation  Within 7 days."/>
        </Box>
      </Box>
    </div>
  )
}

export default TandC
