import {Box, Heading} from "@chakra-ui/react";

function LoginUserBox(props: any) {
    let { id, name, avatarURL } = props.loginUser

    return (
        <Box boxShadow={"base"}
             display="flex"
             maxW={"80vw"}
             borderRadius="lg" m={3} p={5}
             bg={"gray.50"}>
            <img style={{ borderRadius: "50%" }} width={"100"}
                 src={avatarURL} alt="{property.imageAlt}"/>
            <Box p="6">
                <Heading size={"md"}>{name}</Heading>
                <p>{"id: " + id}</p>
            </Box>
        </Box>
    )
}

export default LoginUserBox