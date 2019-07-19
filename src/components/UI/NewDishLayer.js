import React from "react";
import PropTypes from "prop-types";

import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: rotate(45deg);
    box-shadow: 0 1px 3px #000;
    opacity: 1;
  }
  50% {
    transform: rotate(45deg);
    box-shadow: 1px 2px 8px #000;
    opacity: .5;
  }
  100% {
    transform: rotate(45deg);
    box-shadow: 0 1px 3px #000;
    opacity: 1
  }
`;

const Box = styled.div`
  position: absolute;
  font-size: 9px;
  top: 5px;
  right: -30px;
  animation: 2s ${pulse} infinite;
  background: #0066cc;
  padding: 0.2rem 2rem 0.2rem 2rem;
  z-index: 999;
`;

const StyledSpan = styled.div`
  color: #fff;
  letter-spacing: 1px;
`;

export default function NewDishlayer(props) {
  const { date } = props;

  const render = date => {
    if (new Date(date).toDateString() === new Date().toDateString())
      return (
        <Box>
          <StyledSpan>NEW</StyledSpan>
        </Box>
      );

    return null;
  };

  return render(date);
}

NewDishlayer.propTypes = {
  date: PropTypes.string.isRequired
};
