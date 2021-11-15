import {Container, Heading, Input, Text} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {addQuestion} from "../redux/voteSlice";
import {userAddedQuestion} from "../redux/userSlice";

function AddQuestion(){
    let loggedIn = useAppSelector(s => s.user.loggedIn)
    let loginUser = useAppSelector(s => s.user.loginUser)
    let { register, handleSubmit } = useForm<FormData>()
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    let questions = useAppSelector(s => s.vote.questions)

    interface FormData{
        optionA: string
        optionB: string
    }

    let onSubmit: SubmitHandler<FormData> = (data) => {
        let payload = Object.assign({}, data, { author: loginUser })
        dispatch(addQuestion(payload))
        dispatch(userAddedQuestion({loginUser, questions}))
        navigate("/vote")
    }

    let inputPlaceholder = "Please enter question text"

    return (
        loggedIn ?
        <Container minW={"80vw"} id="add-question">
            <Heading>Add Question</Heading>

            <form onSubmit={handleSubmit(onSubmit)} >
                <Text fontSize={"2xl"} mt={5}>Option A</Text>
                <Input size={"lg"} placeholder={inputPlaceholder}
                       type="text" {...register("optionA", {required: "required", maxLength: 50})} />

                <Text fontSize={"2xl"} mt={5}>Option B</Text>
                <Input size={"lg"} placeholder={inputPlaceholder}
                       type="text" {...register("optionB", {required: "required", maxLength: 50})} />

                <Input bg={"yellow.300"} mt={5} variant={"filled"} type="submit" value={"SUBMIT"}/>
            </form>

        </Container> : <Navigate to={"/"}/>
    )
}

export default AddQuestion