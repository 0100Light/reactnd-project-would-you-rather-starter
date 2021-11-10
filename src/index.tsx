import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './redux/store'
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./component/navbar";
import Login from "./component/login";
import Vote from "./component/vote";
import NotFound from "./component/notFound";
import VoteDetail from "./component/voteDetail";

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Login/>} />
                    <Route path={"/vote"} element={ <Vote/> } />
                    <Route path={"/voteDetail/:qid"} element={ <VoteDetail/> } />
                    <Route path="*" element={ <NotFound/> } />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>,
document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
