// utils/NpcInteraction.js
"use client";
/* 
import React, { useEffect } from "react";
import { checkInteraction } from "./HeroSprite";
// Adjust path as per your project structure

const NpcInteraction = ({ playerPosition, direction, drawables }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        const npcPositions = drawables
          .filter((drawable) => drawable.type === "npc") // Assuming NPCs are marked in drawables
          .map((npc) => ({ x: npc.x, y: npc.y }));

        if (checkInteraction(playerPosition, npcPositions, direction)) {
          // Handle interaction logic here
          console.log("Player interacted with an NPC!");
          // Example: setShowTextMessage(true); to show a message
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition, direction, drawables]);

  return null;
};

export default NpcInteraction;
 */
// utils/NpcInteraction.js

import { useEffect, useState } from "react";
import { checkInteraction } from "./HeroSprite";
import TextMessage from "@/components/TextMessage";

const NpcInteraction = ({ playerPosition, direction }) => {
  const [showTextMessage, setShowTextMessage] = useState(false);

  const [currentNpc, setCurrentNpc] = useState(null); 
  const handleTextMessageComplete = () => {
    setShowTextMessage(false);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        const npcPositions = [
          { x: 2, y: 4 },
          { x: 9, y: 5 },
          { x: 8, y: 9 },
        ];

        if (checkInteraction(playerPosition, npcPositions, direction)) {
          // Handle interaction logic here
          setShowTextMessage(true);
          console.log("Player interacted with an NPC!");
          console.log(showTextMessage);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition, direction, showTextMessage]);

  return (
    <>
      {showTextMessage && (
        <TextMessage
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ratione eius aliquam sequi, autem odit illo. Qui maxime molestiae necessitatibus quaerat voluptate magnam ducimus vel? Recusandae mollitia ad laborum at?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur sapiente est distinctio labore optio corrupti ullam. Similique at, id quibusdam ratione nesciunt in cumque veniam optio. Cum ratione ex deserunt."
          onComplete={handleTextMessageComplete}
        />
      )}
    </>
  );
};

export default NpcInteraction;
 