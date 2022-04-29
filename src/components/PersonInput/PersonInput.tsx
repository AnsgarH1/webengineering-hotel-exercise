import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, IconButton, Text } from '@chakra-ui/react';

interface PersonInputProps {
    variant: "ADULT" | "CHILD";
    value?: number;
    onIncrease: () => void;
    onDecrease: () => void;

}

const PersonInput = ({ variant = "ADULT", value = 0, onIncrease, onDecrease }: PersonInputProps) => {

    return (
        <Box borderWidth={2} p="2" borderRadius="md">
            <Heading size="xs">{variant === "ADULT" ? "Erwachsene" : "Kinder"}</Heading>
            <Text>{variant === "ADULT" ? "ab 13 Jahren" : "2-13 Jahre   "}</Text>
            <Flex pt="2">
                <IconButton size="xs" aria-label={`remove ${variant}`} icon={<MinusIcon />} onClick={() => onDecrease()} />
                <Center w="50px">
                    <Text size="sm" >{value}</Text>
                </Center>
                <IconButton size="xs" aria-label={`add ${variant}`} icon={<AddIcon />} onClick={() => onIncrease()} />
            </Flex>
        </Box>
    )
}

export default PersonInput

