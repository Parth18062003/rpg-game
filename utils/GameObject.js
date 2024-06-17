export const drawImage = (ctx, src, x, y) => {
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, 32, 32, x * 16-8, y*16-18, 32, 32);
    };
    image.src = src;
  };
  