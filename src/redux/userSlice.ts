import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid';

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
    users: UserType[]
}

// Define the initial state using that type
const initialState: UserState = {
    users: []
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
        }
    },
})

// export const {increment, decrement, incrementByAmount} = userSlice.actions
export const { addUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer