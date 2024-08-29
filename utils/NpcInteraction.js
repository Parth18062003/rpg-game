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
import React, { useEffect, useState } from "react";
import { checkInteraction } from "./HeroSprite";
import TextMessage from "@/components/TextMessage";

const NpcInteraction = ({
  playerPosition,
  direction,
  setNpcData,
  npcData,
  onNpcDataUpdate,
}) => {
  const [showTextMessage, setShowTextMessage] = useState(false);
  const [npcMessage, setNpcMessage] = useState("");
  const [originalDirection, setOriginalDirection] = useState(direction);
  const [originalNpcData, setOriginalNpcData] = useState([...npcData]);

  const handleTextMessageComplete = () => {
    setShowTextMessage(false);
    setNpcData(originalNpcData); 
    console.log("original",originalNpcData);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        const interactingNpc = checkInteraction(
          playerPosition,
          npcData,
          direction
        );

        if (interactingNpc) {
          setNpcMessage(interactingNpc.text);
          setShowTextMessage(true);
          // Save original direction and NPC data
          setOriginalDirection(direction);
          setOriginalNpcData(npcData.map((npc) => ({ ...npc })));

          // Update NPC direction in NPC data
          const updatedNpcData = npcData.map((npc) => {
            if (npc.x === interactingNpc.x && npc.y === interactingNpc.y) {
              npc.npcDirection = getNpcDirection(
                interactingNpc,
                playerPosition
              );
            }
            return npc;
          });

          // Update NPC data in the parent component (GameCanvas)
          console.log("updated",updatedNpcData);
          setNpcData(updatedNpcData);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition, direction, showTextMessage, npcData, setNpcData]);

  // Function to determine NPC direction based on player interaction
  const getNpcDirection = (interactingNpc, playerPosition) => {
    if (interactingNpc.x > playerPosition.x) {
      return "left";
    } else if (interactingNpc.x < playerPosition.x) {
      return "right";
    } else if (interactingNpc.y > playerPosition.y) {
      return "up";
    } else if (interactingNpc.y < playerPosition.y) {
      return "down";
    }
    return "down"; 
  };

  return (
    <>
      {showTextMessage && (
        <TextMessage text={npcMessage} onComplete={handleTextMessageComplete} />
      )}
    </>
  );
};

export default NpcInteraction;
