import React, { useEffect, useState } from 'react'

import { Input, InputGroup, InputLeftAddon, Select, Stack } from '@chakra-ui/react'

import { FieldProps } from 'formik'

import { CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js/max'
import ReactCountryFlag from "react-country-flag"
import { usePhoneInput } from './usePhoneInput'


function PhoneInput({ fieldProps }: { fieldProps: FieldProps }) {

    const [selectedCountryCode, setCountryCode] = useState<CountryCode>("US")

    const regionNames = new Intl.DisplayNames(
        [selectedCountryCode], { type: 'region' }
    );

    const sortCountryCodes = (a: CountryCode, b: CountryCode) => {
        const regionNameA = regionNames.of(a)
        const regionNameB = regionNames.of(b)
        if (regionNameA && regionNameB) {
            return regionNameA.localeCompare(regionNameB)
        } else {
            return a.localeCompare(b)
        }

    }

    const { field, form } = fieldProps;
    const { errorMessage, formattedPhoneNumber, phoneNumberValue, setPhoneInput} = usePhoneInput(selectedCountryCode)


    useEffect(() => {
        form.setFieldValue(field.name, phoneNumberValue || "")
    }, [phoneNumberValue])

    useEffect(() => {
        form.setFieldError(field.name, errorMessage)
    }, [errorMessage])




    return (
        <Stack>
            <InputGroup>
                <Select
                    name="country"
                    value={selectedCountryCode}
                    autoComplete="country"
                    onChange={
                        event => { setCountryCode(event.target.value as unknown as CountryCode) }
                    }
                >
                    {
                        getCountries()
                            .sort(sortCountryCodes)
                            .map(countryCode =>
                                <option key={countryCode} value={countryCode} >
                                    <ReactCountryFlag countryCode={countryCode} /> {regionNames.of(countryCode)}
                                </option>)
                    }
                </Select>
            </InputGroup>
            <InputGroup>
                <InputLeftAddon color="gray.600">+{getCountryCallingCode(selectedCountryCode)}</InputLeftAddon>
                <Input
                    type="tel"
                    id="phone"
                    onBlur={field.onBlur}
                    value={formattedPhoneNumber}
                    onChange={event => {
                        setPhoneInput(event.target.value)
                    }}
                />
            </InputGroup>

        </Stack>


    )
}

export default PhoneInput