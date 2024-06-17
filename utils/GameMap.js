/* import { drawSprite } from "./Sprite";

export const drawMap = (ctx, lowerMap, upperMap, cameraOffset) => {
  ctx.drawImage(lowerMap, -cameraOffset.x, -cameraOffset.y);
  ctx.drawImage(upperMap, -cameraOffset.x, -cameraOffset.y);

  drawSprite(ctx, "/images/characters/people/guzma.png", 2, 4, 0, 0, cameraOffset);
  drawSprite(ctx, "/images/characters/people/guzma.png", 9, 6, 0, 0, cameraOffset);
  drawSprite(ctx, "/images/characters/people/guzma.png", 8, 9, 0, 0, cameraOffset);
};
 */
import { drawSprite } from "./Sprite";

export const drawMap = (ctx, lowerMap, upperMap, cameraOffset, images) => {
  if (!lowerMap || !upperMap || !images) return;

  ctx.drawImage(lowerMap, -cameraOffset.x, -cameraOffset.y);
  ctx.drawImage(upperMap, -cameraOffset.x, -cameraOffset.y);

/*   drawSprite(ctx, images.npc1, 2, 4, 0, 0, cameraOffset, images.shadow);
  drawSprite(ctx, images.npc2, 9, 5, 0, 0, cameraOffset, images.shadow);
  drawSprite(ctx, images.npc3, 8, 9, 0, 0, cameraOffset, images.shadow); */
};
