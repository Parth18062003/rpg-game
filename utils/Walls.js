/* export const DiningRoomWalls = [
    {startX:5.5,endX: 6.5,y:5.5},
    {startX:8,endX: 9,y:5.5},
    {x:10, y:5.5},
    {startX:9.5,endX: 10.5,y:4.5},
    {startX:9,endX: 10.5,y:4},
    {startX:5,endX: 6.5,y:4.5},
    {startX:5,endX: 7.5,y:3.5},
    {startX:8,endX: 9,y:7},
    {startX:5.5,endX: 6.5,y:7},
    {x:7.5, startY:4, endY: 4.5},
    {x: 8.5, y: 3.5},
    {x:4.5, startY:2.5, endY: 7.5},
    {x:11, startY:2.5, endY: 8},
    {startX:5,endX: 7,y:8},
    {startX:8,endX: 10.5,y:8},
    {x: 6.5, y: 4},
    {x: 9, y: 5},
    {x: 8.5, y: 6.5},
] */
export const DiningRoomWalls = [
  //map border
  { x: 0, startY: 0, endY: 12 },
  { x: 13, startY: 0, endY: 12 },
  { startX: 0, endX: 5, y: 12 },
  { startX: 7, endX: 13, y: 12 },

  //tables
  { startX: 2, endX: 4, y: 10 },
  { startX: 7, endX: 9, y: 10 },
  { startX: 2, endX: 4, y: 7 },
  { startX: 7, endX: 9, y: 7 },
  { startX: 11, endX: 12, y: 7 },
  { startX: 9, endX: 12, y: 5 },
  { startX: 1, endX: 4, y: 5 },
  { startX: 1, endX: 4, y: 3 },
  { x: 6, startY: 3, endY: 5 },

  //room wall
  { startX: 5, endX: 6, y: 3 },
  { x: 8, y: 3 },
  { startX: 9, endX: 12, y: 4 },

  //npc
  { x: 2, y: 4 },
  { x: 9, y: 5 },
  { x: 8, y: 9 },
];

export const GreenKitchenWalls = [
  //map border
  {startX: 0, endX: 4, y: 12},
  {startX: 6, endX: 10, y: 12},
  {startX: 10, endX: 0, y: 0},
  {x: 10, startY: 0, endY: 12},
  {x: 0, startY: 0, endY: 12},

  //tables
  {startX: 2, endX: 4, y: 9},
  {startX: 7, endX: 9, y: 10},
  {x: 3, y: 7},
  {x: 4, y: 7},
  {x: 6, y: 7},
  {x: 8, y: 5},
  {startX: 1, endX: 6, y: 6},
  {startX: 8, endX: 9, y: 4},
  {startX: 1, endX: 7, y: 3},

  //npc 
  {x: 4, y: 5},
  {x: 8, y: 9},
];
