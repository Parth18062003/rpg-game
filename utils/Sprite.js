/* export const drawSprite = (ctx, src, x, y, frameX, frameY, cameraOffset) => {
  const image = new Image();
  const shadow = new Image();

  shadow.onload = () => {
    ctx.drawImage(
      shadow,
      0,
      0,
      32,
      32,
      x * 16 - 8 - cameraOffset.x,
      y * 16 - 18 - cameraOffset.y,
      32,
      32
    );
  };
  shadow.src = "/images/characters/shadow.png";

  image.onload = () => {
    ctx.drawImage(
      image,
      frameX * 64,
      frameY * 64,
      64,
      64,
      x * 16 - 8 - cameraOffset.x,
      y * 16 - 18 - cameraOffset.y,
      32,
      32
    );
  };
  image.src = src;
}; */
/*
export const drawSprite = (ctx, image, x, y, frameX, frameY, cameraOffset, shadow) => {
  if (!image || !shadow) return;

  ctx.drawImage(
    shadow,
    0,
    0,
    32,
    32,
    x * 16 - 8 - cameraOffset.x,
    y * 16 - 18 - cameraOffset.y,
    32,
    32
  );

  ctx.drawImage(
    image,
    frameX * 64,
    frameY * 64,
    64,
    64,
    x * 16 - 8 - cameraOffset.x,
    y * 16 - 18 - cameraOffset.y,
    32,
    32
  );
}; 
*/

import { movePlayer } from "@/utils/HeroSprite";

export const drawSprite = (ctx, image, x, y, frameX, frameY, cameraOffset, shadow) => {
  if (!image || !shadow) return;

  ctx.drawImage(
    shadow,
    0,
    0,
    32,
    32,
    x * 16 - 8 - cameraOffset.x,
    y * 16 - 18 - cameraOffset.y,
    32,
    32
  );

  ctx.drawImage(
    image,
    frameX * 64,
    frameY * 64,
    64,
    64,
    x * 16 - 8 - cameraOffset.x,
    y * 16 - 18 - cameraOffset.y,
    32,
    32
  );
};  

/* export const getDrawables = (playerPosition, direction, isMoving, images) => {
  return [
    {
      x: playerPosition.x,
      y: playerPosition.y,
      frameX: movePlayer(playerPosition, direction, isMoving).frameX,
      frameY: movePlayer(playerPosition, direction, isMoving).frameY,
      image: images.hero,
      shadow: images.shadow,
      isPlayer: true,
      facingDirection: direction, // Assuming player has a facing direction
    },
    {
      x: 2,
      y: 4,
      frameX: 0,
      frameY: 0,
      image: images.npc1,
      shadow: images.shadow,
      npcDirection: "down", // Example NPC direction
      text: "NPC 1 text message here",
    },
    {
      x: 9,
      y: 5,
      frameX: 0,
      frameY: 0,
      image: images.npc2,
      shadow: images.shadow,
      npcDirection: "left", // Example NPC direction
      text: "NPC 2 text message here",
    },
    {
      x: 8,
      y: 9,
      frameX: 0,
      frameY: 0,
      image: images.npc3,
      shadow: images.shadow,
      npcDirection: "up", // Example NPC direction
      text: "NPC 3 text message here",
    },
  ];
}; */
export const getDrawables = (playerPosition, direction, isMoving, images, npcData) => {
  const playerDrawable = {
    x: playerPosition.x,
    y: playerPosition.y,
    frameX: movePlayer(playerPosition, direction, isMoving).frameX,
    frameY: movePlayer(playerPosition, direction, isMoving).frameY,
    image: images.hero,
    shadow: images.shadow,
    isPlayer: true,
    facingDirection: direction, // Assuming player has a facing direction
  };

  //const npcData = createNpcData(images); 
  const npcDrawables = npcData.map(npc => ({
    x: npc.x,
    y: npc.y,
    frameX: npcDirection(npc.npcDirection).frameX,
    frameY: npcDirection(npc.npcDirection).frameY,
    image: npc.image, // Access image from images based on npc.image
    shadow: npc.shadow, // Assuming 'shadow' is a key in images
    npcDirection: npc.npcDirection,
    text: npc.text,
  }));

  return [playerDrawable, ...npcDrawables];
};

export const drawSprites = (
  ctx,
  drawables,
  playerPosition,
  tileSize,
  canvas
) => {
  drawables
    .sort((a, b) => a.y - b.y)
    .forEach(({ x, y, frameX, frameY, image, shadow }) => {
      drawSprite(
        ctx,
        image,
        x,
        y,
        frameX,
        frameY,
        {
          x: playerPosition.x * tileSize - (canvas.width / 2 - tileSize / 2),
          y: playerPosition.y * tileSize - (canvas.height / 2 - tileSize / 2),
        },
        shadow
      );
    });
};


/* export const createNpcData = (images, npcDirection) => [
  {
    x: 2,
    y: 4,
    frameX: 0,
    frameY: 0,
    image: images.npc1 || "/images/characters/people/alola.png",
    shadow: images.shadow,
    npcDirection: npcDirection || "down", // Example NPC direction
    text: "NPC 1 text message here",
  },
  {
    x: 9,
    y: 5,
    frameX: 0,
    frameY: 0,
    image: images.npc2 || "/images/characters/people/cyrus.png",
    shadow: images.shadow,
    npcDirection: npcDirection || "down", // Example NPC direction
    text: "NPC 2 text message here",
  },
  {
    x: 8,
    y: 9,
    frameX: 0,
    frameY: 0,
    image: images.npc3 || "/images/characters/people/alola.png",
    shadow: images.shadow,
    npcDirection: npcDirection || "down", // Example NPC direction
    text: "NPC 3 text message here",
  },
]; */
export const createNpcData = {
  diningRoom: (images) => [
    {
      x: 2,
      y: 4,
      frameX: 0,
      frameY: 0,
      image: images.npc1 || "/images/characters/people/alola.png",
      shadow: images.shadow,
      npcDirection: "down",
      text: "Always start with a budget. Know your income and expenses. It's like creating a map for your money!",
    },
    {
      x: 9,
      y: 5,
      frameX: 0,
      frameY: 0,
      image: images.npc2 || "/images/characters/people/cyrus.png",
      shadow: images.shadow,
      npcDirection: "down",
      text: "Saving a little each week adds up! Start now and watch your savings grow over time.",
    },
    {
      x: 8,
      y: 9,
      frameX: 0,
      frameY: 0,
      image: images.npc3 || "/images/characters/people/alola.png",
      shadow: images.shadow,
      npcDirection: "down",
      text: "Set short-term and long-term goals. They give you something to work towards and keep you motivated.",
    },
  ],
  newMap: (images) => [
    {
      x: 8,
      y: 9,
      frameX: 0,
      frameY: 0,
      image: images.npc1,
      shadow: images.shadow,
      npcDirection: "down",
      text: "Not everything you want is something you need. Learn to prioritize your spending on essentials first.",
    },
    {
      x: 4,
      y: 5,
      frameX: 0,
      frameY: 0,
      image: images.npc3 ,
      shadow: images.shadow,
      npcDirection: "down",
      text: "Be cautious with loans and credit cards. Borrow only what you can afford to pay back on time.",
    },
  ],
};


export const npcDirection = (npcDirection) => {
  const animationKey =`${npcDirection}`;
  const animationFrames = {
    "down": [[0, 0]],
    "right": [[0, 2]],
    "up": [[0, 3]],
    "left": [[0, 1]],
  };
  const frames = animationFrames[animationKey];
  
  const [frameX, frameY] = frames[0]; // Get the first frame

  return { frameX, frameY };
};