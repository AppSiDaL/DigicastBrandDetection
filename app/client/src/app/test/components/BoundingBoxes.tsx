import React from "react";
import { Group, Image, Layer, Rect, Stage, Text } from "react-konva";
import useImage from "use-image";

interface BoundingBoxesProps {
  response: any;
  imageURL: string;
}
export default function BoundingBoxes({
  response,
  imageURL,
}: BoundingBoxesProps) {
  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };
  const URLImage = ({ url, width, height }: any) => {
    const [image] = useImage(url);
    return <Image width={width} height={height} image={image} alt="" />;
  };
  return (
    <Stage width={response.image.width} height={response.image.height}>
      <Layer>
        <URLImage
          url={imageURL}
          width={response.image.width}
          height={response.image.height}
        />
        <Rect
          x={0}
          y={0}
          width={response.image.width}
          height={response.image.height}
          stroke="red"
          strokeWidth={2}
        />
        {response.predictions.map((prediction: any, i: any) => {
          const x1 = prediction.x - prediction.width / 2;
          const y1 = prediction.y - prediction.height / 2;
          return (
            <Group key={i}>
              <Rect
                x={x1}
                y={y1}
                width={prediction.width}
                height={prediction.height}
                stroke={randomColor()}
                strokeWidth={5}
              />
              <Text
                fill={randomColor()}
                text={`${prediction.class}-${prediction.confidence.toFixed(2)}`}
                fontSize={15}
                x={x1 + 5}
                y={y1 + 5}
              />
            </Group>
          );
        })}
      </Layer>
    </Stage>
  );
}
