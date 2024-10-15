import React from "react";
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.backgraound};
    padding: 0 20px;
`;

const StyledText = styled.Text`
    font-size: 30px;
    color: ${({theme}) => theme.text};
`;

const Signin = () => {
    return (
        <Container>
            <StyledText>
                Signin
            </StyledText>
        </Container>
    )
}

export default Signin;