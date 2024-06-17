/* // utils/Sprite.js
export const drawHeroSprite = (ctx, src, x, y, frameX, frameY) => {
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(
      image,
      frameX * 32,
      frameY * 32,
      32,
      32,
      x * 16 - 8,
      y * 16 - 18,
      32,
      32
    );
  };
  image.src = src;
  const shadow = new Image();
  shadow.onload = () => {
    ctx.drawImage(shadow, 0, 0, 32, 32, x * 16 - 8, y * 16 - 18, 32, 32);
  };
  shadow.src = "/images/characters/shadow.png";
};

// utils/utils.js
export const nextPosition = (position, direction) => {
  const directionUpdate = {
    up: { x: 0, y: -0.25 },
    down: { x: 0, y: 0.25 },
    left: { x: -0.25, y: 0 },
    right: { x: 0.25, y: 0 },
  };

  const firstStep = {
    x: position.x + directionUpdate[direction].x,
    y: position.y + directionUpdate[direction].y,
  };

  const secondStep = {
    x: firstStep.x + directionUpdate[direction].x,
    y: firstStep.y + directionUpdate[direction].y,
  };

  return { firstStep, secondStep };
};


// utils/Player.js
export const movePlayer = (position, direction, isMoving) => {
  const animationKey = isMoving ? `walk-${direction}` : `idle-${direction}`;
  const animationFrames = {
    "idle-down": [[0, 0]],
    "idle-right": [[0, 1]],
    "idle-up": [[0, 2]],
    "idle-left": [[0, 3]],
    "walk-down": [
      [1, 0],
      [0, 0],
      [3, 0],
      [0, 0],
    ],
    "walk-right": [
      [1, 1],
      [0, 1],
      [3, 1],
      [0, 1],
    ],
    "walk-up": [
      [1, 2],
      [0, 2],
      [3, 2],
      [0, 2],
    ],
    "walk-left": [
      [1, 3],
      [0, 3],
      [3, 3],
      [0, 3],
    ],
  };
  const frames = animationFrames[animationKey];
  const [frameX, frameY] = frames[0]; // Get the first frame

  return { frameX, frameY };
};
 */
// For 256X256 sprites
/* export const drawHeroSprite = (ctx, src, x, y, frameX, frameY) => {
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(
      image,
      frameX * 64,
      frameY * 64,
      64,
      64,
      x * 16 - 8,
      y * 16 - 18,
      32,
      32
    );
  };
  image.src = src;
  const shadow = new Image();
  shadow.onload = () => {
    ctx.drawImage(shadow, 0, 0, 32, 32, x * 16 - 8, y * 16 - 18, 32, 32);
  };
  shadow.src = "/images/characters/shadow.png";
}; */

// utils/utils.js
export const nextPosition = (position, direction) => {
  const directionUpdate = {
    up: { x: 0, y: -0.5 },
    down: { x: 0, y: 0.5 },
    left: { x: -0.5, y: 0 },
    right: { x: 0.5, y: 0 },
  };

  const firstStep = {
    x: position.x + directionUpdate[direction].x,
    y: position.y + directionUpdate[direction].y,
  };

  const secondStep = {
    x: firstStep.x + directionUpdate[direction].x,
    y: firstStep.y + directionUpdate[direction].y,
  };

  return { firstStep, secondStep };
};

export const movePlayer = (position, direction, isMoving) => {
  const animationKey = isMoving ? `walk-${direction}` : `idle-${direction}`;
  const animationFrames = {
    "idle-down": [[0, 0]],
    "idle-right": [[0, 2]],
    "idle-up": [[0, 3]],
    "idle-left": [[0, 1]],
    "walk-down": [
      [1, 0],
      [0, 0],
      [3, 0],
      [0, 0],
    ],
    "walk-right": [
      [1, 2],
      [0, 2],
      [3, 2],
      [0, 2],
    ],
    "walk-up": [
      [1, 3],
      [0, 3],
      [3, 3],
      [0, 3],
    ],
    "walk-left": [
      [1, 1],
      [0, 1],
      [3, 1],
      [0, 1],
    ],
  };
  const frames = animationFrames[animationKey];
  const [frameX, frameY] = frames[0]; // Get the first frame

  return { frameX, frameY };
};

export const isValidMove = (position, walls) => {
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
  const maxX = 20;
  const maxY = 20;
  console.log(position);

  return position.x >= 0 && position.x < maxX && position.y >= 0 && position.y < maxY ;
};

/* 
export const checkInteraction = (playerPosition, npcPositions, direction) => {
  const adjacentPositions = [
    { x: playerPosition.x, y: playerPosition.y - 1 }, // Up
    { x: playerPosition.x, y: playerPosition.y + 1 }, // Down
    { x: playerPosition.x - 1, y: playerPosition.y }, // Left
    { x: playerPosition.x + 1, y: playerPosition.y }, // Right
  ];

  for (const npc of npcPositions) {
    for (const position of adjacentPositions) {
      if (npc.x === position.x && npc.y === position.y) {
        return true; // Player is adjacent to an NPC
      }
    }
  }

  return false;
}; */
export const checkInteraction = (playerPosition, npcPositions, playerDirection) => {
  const adjacentPositions = [
    { x: playerPosition.x, y: playerPosition.y - 1 }, // Up
    { x: playerPosition.x, y: playerPosition.y + 1 }, // Down
    { x: playerPosition.x - 1, y: playerPosition.y }, // Left
    { x: playerPosition.x + 1, y: playerPosition.y }, // Right
  ];

  for (const npc of npcPositions) {
    for (const position of adjacentPositions) {
      if (npc.x === position.x && npc.y === position.y) {
        return npc; // Return the NPC object
      }
    }
  }

  return null; // No interaction
};
