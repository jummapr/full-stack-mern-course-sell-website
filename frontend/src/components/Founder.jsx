import { Avatar, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Founder = () => {
  return (
    <>
      <Stack direction={['column','row']} spacing={['4',"16"]} padding="8">
        <VStack>
            <Avatar boxSize={['40','48']} src='https://res.cloudinary.com/dbqkfleqb/image/upload/v1681200267/pngshoylicr008ruot1u.png' />
            <Text children="Co-Founder" opacity={0.7}/>
        </VStack>

        <VStack justifyContent={'center'} alignItems={['center','flex-start']}>
            <Heading children="Jumma Hingorja" size={['md','xl']}/>
            <Text textAlign={['center','left']} children={`Hi My Name Is Jumma Hingorja. I am Full Stack Developer. As Well As Mobile App Deveoper Using React Native. I am Work With Lots Of Projects. I am Expresions Developer.My Skills : Html,Css, JavaScript, ReactJs , Next JS, Node Js, `}/>
        </VStack>
      </Stack>
    </>
  )
}

export default Founder
