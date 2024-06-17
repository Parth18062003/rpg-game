"use client";

import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const TextMessage = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const handleButtonClick = () => {
    onComplete();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsTyping(false);
      }
    }, 40);

    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  useEffect(() => {
    if (!isTyping) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isTyping]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleButtonClick();
    }
  };

  return (
    <div className="text-container absolute bottom-0 left-0 border-[1rem] border-[#bd8f74] w-full min-h-32 max-h-60 bg-[#e8bca0] bg-opacity-75 p-4 flex lg:flex-col items-center justify-center overflow-y-scroll">
      <button
        className="absolute top-0 right-0 cursor-pointer"
        onClick={handleButtonClick}
      >
        <IoMdClose className="h-8 w-8 md:h-12 md:w-12" />
      </button>
      <p className="text-white text-xl lg:text-3xl text-center">
        {displayText} {isTyping && <span className="animate-pulse">|</span>}
      </p>
    </div>
  );
};

export default TextMessage;
