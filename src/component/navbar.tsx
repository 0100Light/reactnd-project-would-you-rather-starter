import React from "react";
import {Flex, Heading} from "@chakra-ui/react";
import {Link} from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return <div>
            <Flex p={5}>
                <Heading>Would U Rather</Heading>
                <Link to={"/home"} >Home</Link>
            </Flex>
        </div>
    }
}

export default Navbar