import { Avatar, Box } from '@chakra-ui/react'
import React from 'react'

import { useLoginContext } from "../../../utils/context/LoginContext"

function Auth() {

    const { user, login, logout } = useLoginContext()

    return (
        <Box rounded="xl">
            {user ?
                <Avatar name={`${user.firstName} ${user.lastName}`} onClick={logout} /> : <Avatar onClick={login} />
            }
        </Box>
    )

}



export default Auth