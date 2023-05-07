interface PlaneSettings {
  width: number;
  height: number;
  gap: number;
  speedDrag: number;
  transparentImage: string;
  distortedImage: string;
}

const planeSettings: PlaneSettings = {
  width: 2,
  height: 5,
  gap: 0.3,
  speedDrag: -0.1,
  transparentImage: "/images/carousel/0.png",
  distortedImage: "/images/carousel/5.png",
};

export default planeSettings;
