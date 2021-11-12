import {Heading} from "@chakra-ui/react";
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

    return (
        loggedIn ?
        <div id="add-question">
            <Heading>Add Question</Heading>

            <form onSubmit={handleSubmit(onSubmit)} >
                <p>option A</p>
                <input type="text" {...register("optionA", {required: "required", maxLength: 50})} />

                <p>option B</p>
                <input type="text" {...register("optionB", {required: "required", maxLength: 50 })} />

                <input type="submit" value={"submit"}/>
            </form>

        </div> : <Navigate to={"/"}/>
    )
}

export default AddQuestion