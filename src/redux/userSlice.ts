import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid';
// @ts-ignore
import {_getUsers} from "../_DATA";
import User from "../types/User";

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (_) => {
        const response:string = await _getUsers()
        console.log(response.toString())
        return response.toString()
    }
)
// Define a type for the slice state
interface UserState {
    users: {[key: string]: User}
    getUsers: any[]
    loggedIn: boolean
    loginUser?: User
    shouldFetchUsers: boolean
}

// Define the initial state using that type
const initialState: UserState = {
    loginUser: undefined,
    shouldFetchUsers: true,
    getUsers: [],
    users: {},
    loggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<string>) => {
            let username = action.payload
            let user: User = {
                answers: {}, avatarURL: "", id: uuidv4(), name: username, questions: []
                // TODO: add user function
            }
            state.users[user.id] = user
        },
        loadUsers: (state, action) => {
            state.users = action.payload
            state.shouldFetchUsers = false
        },
        loginWithUser: (state, action:PayloadAction<User>) => {
            state.loggedIn = true;
            state.loginUser = action.payload
        },
        logoutUser: (state => {
            state.loggedIn = false
            state.loginUser = undefined
        }),
        userVoted: (state, action) => {
            let { option, question, user } = action.payload
            let optionText = ""
            if (option === 1) optionText = "optionOne"
            if (option === 2) optionText = "optionTwo"
            state.users[user.id].answers[question.id] = optionText
        },
        userAddedQuestion: ((state, action) => {
            let { loginUser, questions } = action.payload
            // get qid's
            for (let key in questions){
                if (questions[key].author === loginUser.id){
                    state.users[loginUser.id].questions.push(key)
                }
            }
        })
    },
    extraReducers: builder => {
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            console.log(action.payload)
            state.getUsers.push(action.payload)
        })
    }
})

// export const {increment, decrement, incrementByAmount} = userSlice.actions
export const { addUser, loadUsers, loginWithUser, logoutUser,
    userVoted, userAddedQuestion } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer