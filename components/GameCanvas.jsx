/* "use client";

import React, { useEffect, useRef, useState } from "react";
import { nextPosition, movePlayer, drawHeroSprite } from "@/utils/HeroSprite";
import { drawMap } from "@/utils/GameMap";
import { DiningRoomWalls } from "@/utils/Walls";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 7, y: 6 });
  const [direction, setDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const tileSize = 16;
  const walls = DiningRoomWalls;

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
  }, [playerPosition, isMoving]);

  useEffect(() => {
    const offscreenCanvas = offscreenCanvasRef.current;
    const offscreenCtx = offscreenCanvas.getContext("2d");

    const drawFrame = () => {
      offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      drawStaticElements(offscreenCtx, playerPosition);
      drawPlayer(offscreenCtx, playerPosition, direction, isMoving);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);
      requestAnimationFrame(drawFrame);
    };

    requestAnimationFrame(drawFrame);
  }, [playerPosition, direction, isMoving]);

  const drawStaticElements = (ctx, playerPosition) => {
    const cameraOffset = {
      x: playerPosition.x * tileSize - (offscreenCanvasRef.current.width / 2 - tileSize / 2),
      y: playerPosition.y * tileSize - (offscreenCanvasRef.current.height / 2 - tileSize / 2),
    };

    drawMap(ctx, "/images/maps/DiningRoomUpper.png", "/images/maps/DiningRoomLower.png", cameraOffset);
  };

  const drawPlayer = (ctx, position, direction, isMoving) => {
    const cameraOffset = {
      x: position.x * tileSize - (offscreenCanvasRef.current.width / 2 - tileSize / 2),
      y: position.y * tileSize - (offscreenCanvasRef.current.height / 2 - tileSize / 2),
    };

    const { frameX, frameY } = movePlayer(position, direction, isMoving);
    drawHeroSprite(ctx, "/images/characters/people/guzma.png", position.x, position.y, frameX, frameY, cameraOffset);
  };

  const isValidMove = (position, walls) => {
    for (const wall of walls) {
      if (
        (wall.startX !== undefined && wall.endX !== undefined && wall.y !== undefined &&
          position.x >= wall.startX && position.x <= wall.endX && position.y === wall.y) || // Horizontal wall
        (wall.startY !== undefined && wall.endY !== undefined && wall.x !== undefined &&
          position.y >= wall.startY && position.y <= wall.endY && position.x === wall.x) || // Vertical wall
        (wall.x !== undefined && wall.y !== undefined &&
          position.x === wall.x && position.y === wall.y) // Single point wall
      ) {
        return false; // Collision detected, move is invalid
      }
    }

    const maxX = 15; // Maximum x-coordinate
    const maxY = 15; // Maximum y-coordinate
    return position.x >= 0 && position.x < maxX && position.y >= 0 && position.y < maxY;
  };

  return (
    <div className="game-container flex justify-center items-center h-screen flex-col lg:flex-row relative mx-auto">
      <canvas
        className="border border-1 border-neutral-950 w-[90vw] h-[90vh] bg-neutral-400"
        ref={canvasRef}
        width={960}
        height={540}
      ></canvas>
      <canvas
        ref={offscreenCanvasRef}
        width={960}
        height={540}
        style={{ display: "none" }}
      ></canvas>
    </div>
  );
};

export default GameCanvas;
 */

// SECOND TRY
/* "use client";

import React, { useEffect, useRef, useState } from "react";
import { nextPosition, movePlayer } from "@/utils/HeroSprite";
import { drawMap } from "@/utils/GameMap";
import { DiningRoomWalls } from "@/utils/Walls";
import { drawSprite } from "@/utils/Sprite";

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 7, y: 6 });
  const [direction, setDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const [images, setImages] = useState(null);
  const tileSize = 16;
  const walls = DiningRoomWalls;

  useEffect(() => {
    const loadImages = async () => {
      try {
        const lowerMap = await loadImage("/images/maps/DiningRoomLower.png");
        const upperMap = await loadImage("/images/maps/DiningRoomUpper.png");
        const hero = await loadImage("/images/characters/people/guzma.png");
        const shadow = await loadImage("/images/characters/shadow.png");
        const npc1 = await loadImage("/images/characters/people/alola.png");
        const npc2 = await loadImage("/images/characters/people/sabrina.png");
        const npc3 = await loadImage("/images/characters/people/grunt.png");
        setImages({ lowerMap, upperMap, hero, shadow, npc1, npc2, npc3 });
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

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
  }, [playerPosition, isMoving]);

  useEffect(() => {
    if (!images) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawFrame = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStaticElements(ctx, playerPosition);
      drawPlayer(ctx, playerPosition, direction, isMoving);
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }, [playerPosition, direction, isMoving, images]);

  const drawStaticElements = (ctx, playerPosition) => {
    const cameraOffset = {
      x: playerPosition.x * tileSize - (canvasRef.current.width / 2 - tileSize / 2),
      y: playerPosition.y * tileSize - (canvasRef.current.height / 2 - tileSize / 2),
    };

    drawMap(ctx, images.lowerMap, images.upperMap, cameraOffset, images);
  };

  const drawPlayer = (ctx, position, direction, isMoving) => {
    const cameraOffset = {
      x: position.x * tileSize - (canvasRef.current.width / 2 - tileSize / 2),
      y: position.y * tileSize - (canvasRef.current.height / 2 - tileSize / 2),
    };

    const { frameX, frameY } = movePlayer(position, direction, isMoving);
    drawSprite(ctx, images.hero, position.x, position.y, frameX, frameY, cameraOffset, images.shadow);
  };

  const isValidMove = (position, walls) => {
    for (const wall of walls) {
      if (
        (wall.startX !== undefined && wall.endX !== undefined && wall.y !== undefined &&
          position.x >= wall.startX && position.x <= wall.endX && position.y === wall.y) || // Horizontal wall
        (wall.startY !== undefined && wall.endY !== undefined && wall.x !== undefined &&
          position.y >= wall.startY && position.y <= wall.endY && position.x === wall.x) || // Vertical wall
        (wall.x !== undefined && wall.y !== undefined &&
          position.x === wall.x && position.y === wall.y) // Single point wall
      ) {
        return false;
      }
    }
    console.log(position);
    const maxX = 20; 
    const maxY = 20; 
    return position.x >= 0 && position.x < maxX && position.y >= 0 && position.y < maxY;
  };

  return (
    <div className="game-container flex justify-center items-center h-screen flex-col lg:flex-row relative mx-auto">
      <canvas
        className="border border-1 border-neutral-950 w-[90vw] h-[90vh] bg-neutral-400"
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default GameCanvas;
 */
/* "use client";

import React, { useEffect, useRef, useState } from "react";
import { nextPosition, movePlayer } from "@/utils/HeroSprite";
import { drawMap } from "@/utils/GameMap";
import { DiningRoomWalls } from "@/utils/Walls";
import { drawSprite } from "@/utils/Sprite";

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 7, y: 4 });
  const [direction, setDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const [images, setImages] = useState(null);
  const tileSize = 16;
  const walls = DiningRoomWalls;

  useEffect(() => {
    const loadImages = async () => {
      try {
        const lowerMap = await loadImage("/images/maps/DiningRoomLower.png");
        const upperMap = await loadImage("/images/maps/DiningRoomUpper.png");
        const hero = await loadImage("/images/characters/people/guzma.png");
        const shadow = await loadImage("/images/characters/shadow.png");
        const npc1 = await loadImage("/images/characters/people/alola.png");
        const npc2 = await loadImage("/images/characters/people/sabrina.png");
        const npc3 = await loadImage("/images/characters/people/grunt.png");
        setImages({ lowerMap, upperMap, hero, shadow, npc1, npc2, npc3 });
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

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
  }, [playerPosition, isMoving]);

  useEffect(() => {
    if (!images) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawFrame = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStaticElements(ctx, playerPosition);
      drawPlayer(ctx, playerPosition, direction, isMoving);
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }, [playerPosition, direction, isMoving, images]);

  const drawStaticElements = (ctx, playerPosition) => {
    const cameraOffset = {
      x: playerPosition.x * tileSize - (canvasRef.current.width / 2 - tileSize / 2),
      y: playerPosition.y * tileSize - (canvasRef.current.height / 2 - tileSize / 2),
    };

    drawMap(ctx, images.lowerMap, images.upperMap, cameraOffset, images);
  };

  const drawPlayer = (ctx, position, direction, isMoving) => {
    const cameraOffset = {
      x: position.x * tileSize - (canvasRef.current.width / 2 - tileSize / 2),
      y: position.y * tileSize - (canvasRef.current.height / 2 - tileSize / 2),
    };

    const { frameX, frameY } = movePlayer(position, direction, isMoving);
    drawSprite(ctx, images.hero, position.x, position.y, frameX, frameY, cameraOffset, images.shadow);
  };

  const isValidMove = (position, walls) => {
    for (const wall of walls) {
      if (
        (wall.startX !== undefined && wall.endX !== undefined && wall.y !== undefined &&
          position.x >= wall.startX && position.x <= wall.endX && position.y === wall.y) || // Horizontal wall
        (wall.startY !== undefined && wall.endY !== undefined && wall.x !== undefined &&
          position.y >= wall.startY && position.y <= wall.endY && position.x === wall.x) || // Vertical wall
        (wall.x !== undefined && wall.y !== undefined &&
          position.x === wall.x && position.y === wall.y) // Single point wall
      ) {
        return false;
      }
    }
    console.log(position);
    const maxX = 20; 
    const maxY = 20; 
    return position.x >= 0 && position.x < maxX && position.y >= 0 && position.y < maxY;
  };

  return (
    <div className="game-container flex justify-center items-center h-screen flex-col lg:flex-row relative mx-auto">
      <canvas
        className="border border-1 border-neutral-950 w-[90vw] h-[90vh] bg-neutral-400"
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default GameCanvas; 
*/
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { drawMap } from "@/utils/GameMap";
import { DiningRoomWalls, GreenKitchenWalls } from "@/utils/Walls";
import { getDrawables, drawSprites } from "@/utils/Sprite";
import KeyboardMovement from "@/utils/KeyBoard";
import NpcInteraction from "@/utils/NpcInteraction";
import { createNpcData } from "@/utils/Sprite";

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 7, y: 6 });
  const [direction, setDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const [images, setImages] = useState(null);
  const [newNpcImages, setNewNpcImages] = useState(null);
  const [npcData, setNpcData] = useState([]);
  const [walls, setWalls] = useState(DiningRoomWalls);

  const tileSize = 16;

  useEffect(() => {
    const loadImages = async () => {
      try {
        const lowerMap = await loadImage("/images/maps/DiningRoomLower.png");
        const upperMap = await loadImage("/images/maps/DiningRoomUpper.png");
        const hero = await loadImage("/images/characters/people/guzma.png");
        const shadow = await loadImage("/images/characters/shadow.png");
        const npc1 = await loadImage("/images/characters/people/alola.png");
        const npc2 = await loadImage("/images/characters/people/sabrina.png");
        const npc3 = await loadImage("/images/characters/people/grunt.png");
        setImages({
          lowerMap,
          upperMap,
          hero,
          shadow,
          npc1,
          npc2,
          npc3,
        });
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (images) {
      setNpcData(createNpcData.diningRoom(images));
    }
  }, [images]);

  KeyboardMovement({
    playerPosition,
    setPlayerPosition,
    direction,
    setDirection,
    isMoving,
    setIsMoving,
    walls,
  });

  useEffect(() => {
    if (!images) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawFrame = () => {
      if (!canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStaticElements(ctx, playerPosition);

      const drawables = getDrawables(
        playerPosition,
        direction,
        isMoving,
        images,
        npcData
      );
      drawSprites(ctx, drawables, playerPosition, tileSize, canvas);

      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }, [playerPosition, direction, isMoving, images, npcData, tileSize]);

  const drawStaticElements = useCallback(
    (ctx, playerPosition) => {
      const cameraOffset = {
        x:
          playerPosition.x * tileSize -
          (canvasRef.current.width / 2 - tileSize / 2),
        y:
          playerPosition.y * tileSize -
          (canvasRef.current.height / 2 - tileSize / 2),
      };

      drawMap(ctx, images.lowerMap, images.upperMap, cameraOffset, images);
    },
    [images, tileSize]
  );

  const handleNpcDataUpdate = useCallback((updatedNpcData) => {
    setNpcData(updatedNpcData);
    console.log("new npc data", updatedNpcData);
  }, []);

  useEffect(() => {
    const checkForSceneChange = () => {
      const doorPosition = { x: 7, y: 4 };

      if (
        playerPosition.x === doorPosition.x &&
        playerPosition.y === doorPosition.y
      ) {
        handleSceneChange();
      }
    };

    checkForSceneChange();
  }, [playerPosition]);

  const fadeOutAndLoadNewMap = async (newMapDetails) => {
    console.log("Fading out and loading new map...");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    for (let i = 1; i <= 10; i++) {
      ctx.globalAlpha = 1 - i * 0.1;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    console.log("Fading out completed.");

    await loadNewMap(newMapDetails);

    for (let i = 1; i <= 10; i++) {
      ctx.globalAlpha = i * 0.1;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    console.log("Fading in completed.");
  };

  const loadNewMap = async (newMapDetails) => {
    console.log("Loading new map...");

    try {
      const lowerMap = await loadImage(newMapDetails.images.lowerMap);
      const upperMap = await loadImage(newMapDetails.images.upperMap);
      const npc1 = await loadImage(newMapDetails.images.npc1);
      const npc2 = await loadImage(newMapDetails.images.npc2);
      const npc3 = await loadImage(newMapDetails.images.npc3);
      const hero = await loadImage("/images/characters/people/guzma.png");
      const shadow = await loadImage("/images/characters/shadow.png");

      const newImages = {
        lowerMap,
        upperMap,
        hero,
        shadow,
        npc1,
        npc2,
        npc3,
      };

      console.log("New images loaded:", newImages);

      setImages(newImages);
      setNewNpcImages(newImages);
      console.log();
      console.log("New map images set.");

      setWalls(newMapDetails.walls);
      console.log("Walls set for new map.");

      const newNpcData = createNpcData[newMapDetails.npcDataKey](newImages);
      console.log("New NPC data created:", newNpcData);
      setNpcData(newNpcData);
      console.log("NPC data set for new map:", newNpcData);

      setPlayerPosition(newMapDetails.playerStartPosition);
      console.log(
        "Player position set for new map:",
        newMapDetails.playerStartPosition
      );
    } catch (error) {
      console.error("Error loading new map details:", error);
      throw error;
    }
  };

  const handleSceneChange = () => {
    console.log("Handling scene change...");

    const newMapDetails = {
      images: {
        lowerMap: "/images/maps/GreenKitchenLower.png",
        upperMap: "/images/maps/GreenKitchenUpper.png",
        npc1: "/images/characters/people/burnet.png",
        npc2: "/images/characters/people/cyrus.png",
        npc3: "/images/characters/people/drayden.png",
      },
      walls: GreenKitchenWalls,
      npcDataKey: "newMap",
      playerStartPosition: { x: 5, y: 12 },
    };

    console.log("New map details:", newMapDetails);

    fadeOutAndLoadNewMap(newMapDetails)
      .then(() => {
        setNpcData(createNpcData[newMapDetails.npcDataKey](newNpcImages));
        console.log(newNpcImages);
      })
      .catch((error) => {
        console.error("Error while loading new map:", error);
      });
  };

  useEffect(() => {
    if (newNpcImages) {
      setNpcData(createNpcData.newMap(newNpcImages));
    }
  }, [newNpcImages]);

  return (
    <div className="game-container flex justify-center items-center h-screen flex-col lg:flex-row relative mx-auto">
      <div className="block md:hidden text-white">
        Please rotate your screen
      </div>
      <canvas
        className="border border-1 border-neutral-950 w-[90vw] h-[90vh] bg-neutral-400"
        ref={canvasRef}
      ></canvas>
      <NpcInteraction
        playerPosition={playerPosition}
        direction={direction}
        setDirection={setDirection}
        npcData={npcData}
        setNpcData={setNpcData}
        onNpcDataUpdate={handleNpcDataUpdate}
      />
    </div>
  );
};

export default GameCanvas;
