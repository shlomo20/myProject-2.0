import React from "react";
import styled, { keyframes } from "styled-components"; 

export default function TextAnimation(){

    return(
        <Text>I'd love to hear your feedback!</Text>
    )
}

const blink = keyframes`
 0%{opacity: 0; }
 50% {  text-shadow: 0 0 5px #fff, 0 0 20px #fff, 0 0 30px #efdec5, 0 0 40px #efdec5, 0 0 50px #0050e6, 0 0 60px #fcfaec, 0 0 70px #fcfaec;}
 100% {text-shadow: 0 0 10px #fff, 0 0 30px #fff, 0 0 40px #fff, 0 0 50px #fff, 0 0 60px #fff, 0 0 70px #fff, 0 0 80px #fff; }
`

const Text = styled.span`
    position: absolute;
    margin: 10px;
    font-size: 2.5em;
    /*top: 300px;*/
    left: 10px;
    animation-name: ${blink};
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
`
