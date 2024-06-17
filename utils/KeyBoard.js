"use client";

import { useEffect } from "react";
import { nextPosition } from "@/utils/HeroSprite";

const KeyboardMovement = ({
  playerPosition,
  setPlayerPosition,
  direction,
  setDirection,
  isMoving,
  setIsMoving,
  walls,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isMoving) return;

      const { key } = event;
      let newPosition = { ...playerPosition };

      switch (key) {
        case "ArrowUp":
          setDirection("up");
          newPosition = nextPosition(playerPosition, "up");
          break;
        case "ArrowDown":
          setDirection("down");
          newPosition = nextPosition(playerPosition, "down");
          break;
        case "ArrowLeft":
          setDirection("left");
          newPosition = nextPosition(playerPosition, "left");
          break;
        case "ArrowRight":
          setDirection("right");
          newPosition = nextPosition(playerPosition, "right");
          break;
        default:
          return;
      }

      if (isValidMove(newPosition.secondStep, walls)) {
        setIsMoving(true);
        setPlayerPosition(newPosition.firstStep);

        setTimeout(() => {
          setPlayerPosition(newPosition.secondStep);
          setIsMoving(false);
        }, 200); // Duration of the movement
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition, isMoving, direction, walls]);

  const isValidMove = (position, walls) => {
    for (const wall of walls) {
      if (
        (wall.startX !== undefined &&
          wall.endX !== undefined &&
          wall.y !== undefined &&
          position.x >= wall.startX &&
          position.x <= wall.endX &&
          position.y === wall.y) || // Horizontal wall
        (wall.startY !== undefined &&
          wall.endY !== undefined &&
          wall.x !== undefined &&
          position.y >= wall.startY &&
          position.y <= wall.endY &&
          position.x === wall.x) || // Vertical wall
        (wall.x !== undefined &&
          wall.y !== undefined &&
          position.x === wall.x &&
          position.y === wall.y) // Single point wall
      ) {
        return false;
      }
    }
    const maxX = 20;
    const maxY = 20;

    return (
      position.x >= 0 &&
      position.x < maxX &&
      position.y >= 0 &&
      position.y < maxY
    );
  };

  return null;
};

export default KeyboardMovement;
