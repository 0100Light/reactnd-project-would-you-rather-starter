import {Box, Heading} from "@chakra-ui/react";

function LeaderboardBox(props: any) {
    let { name, avatarURL } = props.userData
    let ansCount = Object.keys(props.userData.answers).length
    let askCount = props.userData.questions.length

    return (
        <Box boxShadow={"md"}
             display="flex"
             maxW={"80vw"}
             borderRadius="lg" m={3} p={5}>
            <img style={{ borderRadius: "50%" }} width={"150    vw"} height={"1vh"}
                 src={avatarURL} alt="{property.imageAlt}"/>
            <Box p="6">
                <Heading size={"lg"}>{name}</Heading>
                <p>Asked <strong>{askCount}</strong> questions.</p>
                <p>Answered <strong>{ansCount}</strong> questions.</p>
                <p>Total points: <strong>{askCount + ansCount}</strong></p>
            </Box>
        </Box>
    )
}

export default LeaderboardBox