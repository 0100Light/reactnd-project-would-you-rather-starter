import {Box, Button, Center, Circle, Container, Flex, Heading, Spacer, Text, VStack} from "@chakra-ui/react";
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {voteForOption} from "../redux/voteSlice";
import {userVoted} from "../redux/userSlice";

function VoteDetail() {
    let isLoggedIn = useAppSelector(s => s.user.loggedIn)
    let loggedInUser = useAppSelector(s => s.user.loginUser)
    let {qid} = useParams()
    let questions = Object.values(useAppSelector(s => s.vote.questions))
    let q = questions.filter(q => q.id === qid)[0]
    let dispatch = useAppDispatch()
    let users = useAppSelector(s => s.user.users)
    let authorAvatar = () => {
        if (q && users) {
            return users[q.author].avatarURL
        } else {
            return ""
        }
    }

    if (!isLoggedIn || !loggedInUser) {
        return <Navigate to={"/"}/>
    }

    let handleVoteForOption = (option: number) => {
        if (!loggedInUser) return null

        switch (option) {
            case 1: {
                let payload = {
                    "option": 1,
                    "question": q,
                    "user": loggedInUser
                }
                dispatch(voteForOption(payload))
                dispatch(userVoted(payload))
                break
            }
            case 2: {
                let payload = {
                    "option": 2,
                    "question": q,
                    "user": loggedInUser
                }
                dispatch(voteForOption(payload))
                dispatch(userVoted(payload))
                break
            }
            default:
                return null
        }
    }

    return (
        (!isLoggedIn && loggedInUser) ? <Navigate to={"/"}/> : (
            <Container minW={"80vw"}>
                <Heading my={5}>Vote detail</Heading>
                <Box boxShadow={"lg"} p={30} mb={"5vh"}>
                    <Center>
                        <VStack>
                            <img src={authorAvatar() ? authorAvatar() : ""} alt="Author avatar"
                                 style={{borderRadius: "50%"}} width={150}/>
                            <p>asked by</p>
                            <Heading size={"lg"}>{authorAvatar.name}</Heading>
                            <p>Would your rather</p>
                        </VStack>
                    </Center>
                    <Flex>
                        <Box id="optionA" w={"50vw"} fontSize={"2xl"} m={15} p={10}>
                            <Center>
                                <VStack>
                                    <p><strong>{q.optionOne.text}</strong></p>
                                    {(q.optionOne.votes.length + q.optionTwo.votes.length) > 0 ?
                                        <Text fontSize={"sm"}>{q.optionOne.votes.length} votes
                                            ({q.optionOne.votes.length / (q.optionOne.votes.length + q.optionTwo.votes.length) * 100} %)</Text>
                                        : null
                                    }
                                    <Button m={3} bg={"yellow.300"}
                                            onClick={() => handleVoteForOption(1)}>Choose</Button>
                                    {q.optionOne.votes.indexOf(loggedInUser.id) > -1 &&
                                    <Circle size="40px" bg={"green.500"} color="white" m={3}>
                                        V
                                    </Circle>
                                    }
                                </VStack>
                            </Center>
                        </Box>
                        <Spacer/>
                        <Box id="optionB" w={"50vw"} fontSize={"2xl"} m={15} p={10}>
                            <Center>
                                <VStack>
                                    <p><strong>{q.optionTwo.text}</strong></p>
                                    {(q.optionOne.votes.length + q.optionTwo.votes.length) > 0 ?
                                        <Text fontSize={"sm"}>{q.optionTwo.votes.length} votes
                                            ({q.optionTwo.votes.length / (q.optionOne.votes.length + q.optionTwo.votes.length) * 100} %)</Text>
                                        : null
                                    }
                                    <Button m={3} bg={"yellow.300"}
                                            onClick={() => handleVoteForOption(2)}>Choose</Button>
                                    {q.optionTwo.votes.indexOf(loggedInUser.id) > -1 &&
                                    <Circle size="40px" bg={"green.500"} color="white" m={3}>
                                        V
                                    </Circle>
                                    }
                                </VStack>
                            </Center>
                        </Box>
                    </Flex>
                </Box>
            </Container>
        )
    )
}

export default VoteDetail