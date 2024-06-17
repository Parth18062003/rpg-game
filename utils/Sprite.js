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

export const getDrawables = (playerPosition, direction, isMoving, images) => {
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
