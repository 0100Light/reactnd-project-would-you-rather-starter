import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Question from "../types/Question";
import {v4 as uuidv4} from 'uuid'

// Define a type for the slice state
interface VoteState {
    questions: {[key: string]: Question}
    displayedQuestions?: Question[]
    displayOption: string
    fetchQuestions: boolean
}

// Define the initial state using that type
const initialState: VoteState = {
    questions: {},
    displayOption: "all",
    fetchQuestions: true
}

export const voteSlice = createSlice({
    name: 'vote',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        fetchQuestions: (state, action: PayloadAction<{[key: string]: Question}>) => {
            if (state.fetchQuestions) {
                state.questions = action.payload
                state.displayedQuestions = Object.values(state.questions)
                state.fetchQuestions = false
            }
            // state.questions = action.payload
        },
        voteForOption: (state, action) => {
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

            state.displayedQuestions = Object.values(state.questions)
        },
        changeVisibility: ((state, action) => {
            state.displayOption = action.payload.displayOption
            state.displayedQuestions = action.payload.displayedQuestions
        }),
        addQuestion: (state, action) => {
            let q: Question = {
                author: action.payload.author.id,
                id: uuidv4(),
                optionOne: {text: action.payload.optionA, votes: []},
                optionTwo: {text: action.payload.optionB, votes: []},
                timestamp: Date.now()
            }
            state.questions[q.id] = q
            state.displayedQuestions = Object.values(state.questions)
        }

    },
})

export const { fetchQuestions, voteForOption, changeVisibility, addQuestion } = voteSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default voteSlice.reducer