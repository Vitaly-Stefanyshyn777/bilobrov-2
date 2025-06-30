import React from "react";
import Lottie from "lottie-react";
import styled from "styled-components";
import { useWindowSize } from "../../hooks/useWindowSize";

import heartAnimation from "./animation-heart.json";

export const Loader = ({ product }: { product?: boolean }) => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  return (
    <div
      style={{
        maxWidth: isMobile ? "80%" : "50%",
        margin: "0 auto",
        transform: "translateX(3.5vw)",
        ...(product && { paddingTop: isMobile ? "100vw" : "20vw" }),
      }}
    >
      <StyledWrapper>
        <Lottie
          animationData={heartAnimation}
          loop
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
