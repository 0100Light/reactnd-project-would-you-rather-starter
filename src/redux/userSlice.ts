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
interface UserType {
    id: string
    username: string
    createdAt: number
    lastLogin: number
    asked: number
    answered: number
    points: number
}

interface UserState {
    users: UserType[],
    getUsers: any[],
    loggedIn: boolean,
    loginUser?: User
}

// Define the initial state using that type
const initialState: UserState = {
    getUsers: [],
    users: [],
    loggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<string>) => {
            let username = action.payload
            let user: UserType = {
                answered: 0, asked: 0,
                createdAt: Date.now().valueOf(),
                id: uuidv4(),
                lastLogin: Date.now().valueOf(),
                points: 0,
                username: username
            }
            state.users.push(user)
        },
        loadUsers: (state, action) => {
            let newarr = Object.entries(action.payload).map(([_, v]) => v)
            state.getUsers = newarr as Object[]
            // console.log("NAR", newarr)
            // state.getUsers.push(...newarr as Object[])
        },
        loginWithUser: (state, action:PayloadAction<User>) => {
            state.loggedIn = true;
            state.loginUser = action.payload
        },
        logoutUser: (state => {
            state.loggedIn = false
            state.loginUser = undefined
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
export const { addUser, loadUsers, loginWithUser, logoutUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer