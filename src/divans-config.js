function getDivansLandscapeConfig() {
  return [
    {
      frameName: 'a3',
      anchor: { x: 1, y: 0.5 },
      grid: {
        x: -0.215,
        y: 0.12,
        width: 0.5,
        height: 0.33,
        align: { x: 1, y: 0.5 },
      },
    },
    {
      frameName: 'a2',
      anchor: { x: 1, y: 0.5 },
      grid: {
        x: -0.215,
        y: 0.505,
        width: 0.5,
        height: 0.33,
        align: { x: 1, y: 0.5 },
      },
    },
    {
      frameName: 'a1',
      anchor: { x: 0, y: 0.5 },
      grid: {
        x: 0.715,
        y: 0.12,
        width: 0.5,
        height: 0.33,
        align: { x: 0, y: 0.5 },
      },
    },
    {
      frameName: 'a4',
      anchor: { x: 0, y: 0.5 },
      grid: {
        x: 0.715,
        y: 0.505,
        width: 0.5,
        height: 0.33,
        align: { x: 0, y: 0.5 },
      },
    },
  ];
}

function getDivansPortriateConfig() {
  return [
    {
      frameName: 'a1',
      anchor: { x: 1, y: 0.5 },
      grid: {
        x: -0.255,
        y: 0.2,
        width: 0.7,
        height: 0.27,
        align: { x: 1, y: 0.5 },
      },
    },
    {
      frameName: 'a4',
      anchor: { x: 1, y: 0.5 },
      grid: {
        x: -0.255,
        y: 0.505,
        width: 0.7,
        height: 0.27,
        align: { x: 1, y: 0.5 },
      },
    },
    {
      frameName: 'a3',
      anchor: { x: 0, y: 0.5 },
      grid: {
        x: 0.55,
        y: 0.2,
        width: 0.7,
        height: 0.27,
        align: { x: 0, y: 0.5 },
      },
    },
    {
      frameName: 'a2',
      anchor: { x: 0, y: 0.5 },
      grid: {
        x: 0.55,
        y: 0.505,
        width: 1,
        height: 0.27,
        align: { x: 0, y: 0.5 },
      },
    },
  ];
}

export function getDivansConfig(orientation) {
  return orientation === 'landscape' ? getDivansLandscapeConfig() : getDivansPortriateConfig();
}
