import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {decrement, increment, incrementByAmount} from "./redux/counterSlice";
import {addUser} from "./redux/userSlice";

function App() {
    let { value: count } = useAppSelector(s => s.counter)
    let { users } = useAppSelector(state => state.user)
    let dispatch = useAppDispatch()
    return (
        <div className="App">
            <header className="App-header">
                <h3>Users</h3>
                <div id="user">
                    <div>
                        { users.map(u => (<p key={u.id}>{u.id}</p>) )}
                    </div>
                    <button id="add-user-btn" className="App-link" onClick={ () => { dispatch(addUser("testUser")) }} >Add test user</button>
                </div>

                <p>Count = {count}</p>
                <a href={"#"} onClick={ () => dispatch(incrementByAmount(10))} className="App-link">Add 10</a>
                <a href={"#"} onClick={ () => dispatch(increment())} className="App-link">Add 1</a>
                <a href={"#"} onClick={ () => dispatch(decrement())} className="App-link">Minus 1</a>
            </header>
        </div>
    );
}

export default App;
