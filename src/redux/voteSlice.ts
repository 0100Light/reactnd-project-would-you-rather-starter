import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Question from "../types/Question";

// Define a type for the slice state
interface VoteState {
    questions: {[key: string]: Question}
}

// Define the initial state using that type
const initialState: VoteState = {
    questions: {}
}

export const voteSlice = createSlice({
    name: 'vote',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        fetchQuestions: (state, action: PayloadAction<{[key: string]: Question}>) => {
            state.questions = action.payload
        }

    },
})

export const { fetchQuestions } = voteSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default voteSlice.reducer