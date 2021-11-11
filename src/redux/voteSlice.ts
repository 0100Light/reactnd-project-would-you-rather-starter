import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Question from "../types/Question";

// Define a type for the slice state
interface VoteState {
    questions: {[key: string]: Question}
    displayedQuestions?: Question[]
    displayOption: string
}

// Define the initial state using that type
const initialState: VoteState = {
    questions: {},
    displayOption: "all"
}

export const voteSlice = createSlice({
    name: 'vote',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        fetchQuestions: (state, action: PayloadAction<{[key: string]: Question}>) => {
            state.questions = action.payload
            state.displayedQuestions = Object.values(action.payload)
        },
        voteForOption: ((state, action) => {
            let { option, question, user } = action.payload
            let oneVotes = state.questions[question.id].optionOne.votes
            let twoVotes = state.questions[question.id].optionTwo.votes
            console.log(option, question.id, user.id)
            if (option === 1){
                if ( oneVotes.indexOf(user.id) === -1 ) oneVotes.push(user.id)
                state.questions[question.id].optionTwo.votes = twoVotes.filter(i => i !== user.id) as string[]
            }
            if (option === 2){
                if ( twoVotes.indexOf(user.id) === -1 ) twoVotes.push(user.id)
                state.questions[question.id].optionOne.votes = oneVotes.filter(i => i !== user.id) as string[]
            }
        }),
        changeVisibility: ((state, action) => {
            state.displayOption = action.payload.displayOption
            state.displayedQuestions = action.payload.displayedQuestions
        })

    },
})

export const { fetchQuestions, voteForOption, changeVisibility } = voteSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default voteSlice.reducer