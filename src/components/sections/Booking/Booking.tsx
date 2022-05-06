import { Box, Center, Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, Select, VStack } from '@chakra-ui/react'
import { Field, Form, Formik, useFormik } from 'formik'
import React from 'react'
import { RoomType } from '../../../utils/types'
import Room from '../../ui/Room/Room'



const Booking = ({ room }: { room: RoomType }) => {

  return (
    <VStack py="16" >

      <Center>
        <Heading>Vervollständige deine Buchung!</Heading>
      </Center>

      <Center w="50%">
        <Room room={room} onSelect={() => { }} onlyView={true} />
      </Center>
      <Box w="sm">
        <Heading size="md">Deine Daten:</Heading>
        <Formik initialValues={{
          title: "-", firstName: "", lastName: "", nationality: "", phone: "", email: "", noteToHotel: ""
        }} onSubmit={() => { }}>
          {(props) => <Form>

            <VStack spacing={4} align="flex-start" mt="8">
              <FormControl isRequired>
                <FormLabel>Titel</FormLabel>
                <Field as={Select} id="title" name="title" variant="filled" >
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Mx.</option>
                </Field>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Vorname</FormLabel>
                <Field as={Input} id="firstName" name="firstName" type="text" variant="filled" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nachname</FormLabel>
                <Field as={Input} id="lastName" name="lastName" type="text" variant="filled" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Field as={Input} id="email" name="email" type="mail" variant="filled" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Telefonnummer</FormLabel>
                <InputGroup>
                <InputLeftAddon children="+49" />
                  <Field as={Input} id="phone" name="phone" type="tel"  />
                </InputGroup>
              </FormControl>

            </VStack>
          </Form>
          }
        </Formik>
      </Box>
    </VStack>
  )
}

export default Booking