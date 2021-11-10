import {combineReducers, configureStore} from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'
import voteReducer from './voteSlice'

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    vote: voteReducer
})

export const store = configureStore({
    reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store