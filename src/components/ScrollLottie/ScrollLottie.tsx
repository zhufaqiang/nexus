'use client';

import Lottie from "lottie-react";
import React from "react";
import './ScrollLottie.css';
import scrollDownAnimation from './lottie/scroll-down-bright.json'; 

type ScrollLottieProps = {
  onClick?: () => void;
};

const ScrollLottie: React.FC<ScrollLottieProps> = ({ onClick }) => {
  return (
    <div
      className="scroll-lottie"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-label="スクロールして次のセクションへ"
    >
      <Lottie animationData={scrollDownAnimation} loop={true} />
    </div>
  );
};

export default ScrollLottie;
