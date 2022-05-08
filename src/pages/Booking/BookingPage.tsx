import React, { useState } from 'react'


import { Box, Button, Center, Heading, FormLabel, Input, FormControl, FormErrorMessage, FormHelperText, InputGroup, InputLeftAddon, InputLeftElement, Select, Text, Textarea, useToast, VStack, toast } from '@chakra-ui/react'
import { PhoneIcon } from "@chakra-ui/icons"
import { Field, FieldProps, Form, Formik, useFormik } from 'formik'


import { useNavigate } from 'react-router-dom'
import { useBookingContext } from '../../utils/context/BookingContext'

import Room from '../../components/ui/Room/Room'
import { useLoginContext } from '../../utils/context/LoginContext'

import PhoneInput from '../../components/ui/PhoneInput/PhoneInput'
import { usePhoneInput } from '../../components/ui/PhoneInput/usePhoneInput'

interface Values {
  title: string;
  firstName: string;
  lastName: string;
  nationality: "German" | "EU" | "non-EU" | undefined;
  phone: string;
  email: string;
  noteToHotel: string;

}

const BookingPage = () => {

  const { selectedRoom } = useBookingContext()
  const { user } = useLoginContext()


  const mailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  const toast = useToast()
  return (
    <VStack py="16" >

      <Center>
        <Heading>Vervollständige deine Buchung!</Heading>
      </Center>
      {selectedRoom &&
        <Center w="50%">
          <Room room={selectedRoom} onSelect={() => { }} onlyView={true} />
        </Center>}
      <Box w="sm">
        <Heading size="md">Deine Daten:</Heading>
        <Formik
          initialValues={{
            title: "", firstName: user?.firstName || "", lastName: user?.lastName || "", nationality: undefined, phone: "", email: "", noteToHotel: ""
          }}
          onSubmit={(values: Values, { setSubmitting, validateForm }) => {
            setTimeout(() => {

              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);

            }, 2000);

          }}


        >
          {({ values, errors, touched, handleSubmit, isSubmitting, isValid }) =>
            <Form onSubmit={handleSubmit} >

              <VStack spacing={4} align="flex-start" mt="8">
                <FormControl isRequired>
                  <FormLabel>Titel</FormLabel>
                  <Field as={Select} id="title" name="title" variant="filled"  >
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mx.</option>
                  </Field>
                </FormControl>
                <FormControl isRequired isInvalid={touched.firstName && !!errors.firstName}>
                  <FormLabel>Vorname</FormLabel>
                  <Field
                    as={Input} id="firstName" name="firstName" type="text" variant="filled" autocomplete="given-name"
                    placeholder="John"
                    validate={(value: string) => {
                      if (value.length < 2) return "Bitte geben sie Ihren Vornamen an!"
                      if (value.length > 42) return "Bitte gebe einen gültigen Vornamen an"
                    }}
                  />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={touched.lastName && !!errors.lastName}>
                  <FormLabel>Nachname</FormLabel>
                  <Field
                    as={Input} id="lastName" name="lastName" placeholder="Doe" type="text" variant="filled" autocomplete="family-name"
                    validate={(value: string) => {
                      if (value.length < 2) return "Bitte gebe deinen Nachnamen an!"
                      if (value.length > 42) return "Bitte gebe einen gültigen Nachnamen an"
                    }}
                  />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={touched.email && !!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    placeholder="email@example.com"
                    validate={(value: string) => {
                      if (!value.match(mailRegex)) return "Bitte gebe eine valide Mail Adresse an!"
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Nationalität</FormLabel>
                  <Field as={Select} id="nationality" name="nationality" variant="filled" placeholder="-">
                    <option>German</option>
                    <option>EU</option>
                    <option>non EU</option>
                  </Field>
                </FormControl>
                <FormControl isRequired isInvalid={touched.phone && !!errors.phone}>
                  <FormLabel>Telefonnummer</FormLabel>
                  <Field name="phone">
                    {
                      (field: FieldProps) => <PhoneInput fieldProps={field} />
                    }

                  </Field>
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Ihre Nachricht an das Hotel</FormLabel>
                  <Field as={Textarea} id="noteToHotel" name="noteToHotel" />
                </FormControl>
                <Button isFullWidth colorScheme="gray" onClick={() => { alert(JSON.stringify(values, null, 2)); }}>Debug</Button>
                <Button
                  type="submit"
                  isFullWidth
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  onClick={() => {
                    if (isValid) {
                      handleSubmit()
                    } else {
                      toast({ title: "Eingabefehler", description: "Bitte fülle alle Felder aus!", status: "info" })
                    }
                  }}
                >Buchung fortsetzen</Button>
              </VStack>
            </Form>
          }
        </Formik>
      </Box>
    </VStack >
  )
}

export default BookingPage