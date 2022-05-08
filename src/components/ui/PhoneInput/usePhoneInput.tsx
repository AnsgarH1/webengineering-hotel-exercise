import { AsYouType, CountryCode, isValidPhoneNumber, ParseError, parsePhoneNumber, parsePhoneNumberWithError, PhoneNumber } from "libphonenumber-js";
import { useEffect, useState } from "react";

export const usePhoneInput = function (countryCode: CountryCode) {



    const [phoneInput, setPhoneInput] = useState("")

    const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (isValidPhoneNumber(phoneInput, countryCode)) {
            setPhoneNumber(parsePhoneNumber(phoneInput, countryCode))
            setErrorMessage(undefined)
        } else {
            try {
                parsePhoneNumberWithError(phoneInput, countryCode)
            } catch (error) {
                if (error instanceof ParseError) {
                    switch (error.message) {
                        case "TOO_SHORT":
                            setErrorMessage("Fehlerhafte Telefonnummer - Bitte gebe mehr Zeichen ein!")
                            break;
                        case "TOO_LONG":
                            setErrorMessage("Fehlerhafte Telefonnummer - Bitte gebe weniger Zeichen ein! ")
                            break;
                        default:
                            setErrorMessage("Bitte gebe eine korrekte Telefonnummer ein!")
                    }
                }
            }

        }

        if (phoneNumber) {
            console.log(phoneNumber)
        }
    }, [phoneInput])

    return {
        isValidPhoneNumber: isValidPhoneNumber(phoneInput, countryCode),
        errorMessage,
        formattedPhoneNumber: new AsYouType(countryCode).input(phoneInput),
        phoneNumberValue: phoneNumber?.number || undefined,
        phoneInput,
        setPhoneInput,
    }
}