import React, { useRef, useEffect, useState } from "react";
import {
  Group,
  Image,
  Label,
  Layer,
  Rect,
  Stage,
  Tag,
  Text,
} from "react-konva";
import useImage from "use-image";

interface BoundingBoxesProps {
  response: any | undefined;
  imageURL: string;
}

export default function BoundingBoxes({
  response,
  imageURL,
}: BoundingBoxesProps) {
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [image, status] = useImage(imageURL);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (stageRef.current) {
      const container = (stageRef.current as any).parentNode;
      setStageSize({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (image) {
      const newScale = Math.min(
        stageSize.width / image.width,
        stageSize.height / image.height
      );
      const x = stageSize.width / 2 - (image.width / 2) * newScale;
      const y = stageSize.height / 2 - (image.height / 2) * newScale;
      setScale(newScale);
      setOffset({ x, y });
    }
  }, [image, stageSize]);

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const URLImage = ({ url, scale, offset }: any) => {
    return image ? (
      <Image
        x={offset.x}
        y={offset.y}
        scaleX={scale}
        scaleY={scale}
        image={image}
        alt=""
      />
    ) : null;
  };

  return (
    <div ref={stageRef}>
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer>
          <URLImage url={imageURL} scale={scale} offset={offset} />
          {response &&
            response.predictions.map((prediction: any, i: any) => {
              const x1 =
                (prediction.x - prediction.width / 2) * scale + offset.x;
              const y1 =
                (prediction.y - prediction.height / 2) * scale + offset.y;
              const width = prediction.width * scale;
              const height = prediction.height * scale;
              return (
                <Group key={i}>
                  <Rect
                    x={x1}
                    y={y1}
                    width={width}
                    height={height}
                    stroke={randomColor()}
                    strokeWidth={5}
                  />
                  <Label x={x1 + 5} y={y1 + 5}>
                    <Tag fill="red" />
                    <Text
                      text={`${
                        prediction.class
                      }-${prediction.confidence.toFixed(2)}`}
                      fontSize={10}
                      fill="white"
                      padding={5}
                    />
                  </Label>
                </Group>
              );
            })}
        </Layer>
      </Stage>
    </div>
  );
}
