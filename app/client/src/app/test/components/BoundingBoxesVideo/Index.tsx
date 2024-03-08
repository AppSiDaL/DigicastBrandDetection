import React, { useRef, useEffect, useState } from "react";
import { Group, Layer, Rect, Stage, Text } from "react-konva";
import ReactPlayer from "react-player";

interface BoundingBoxesProps {
  response: any | undefined;
  videoURL: string;
}

export default function BoundingBoxes({
  response,
  videoURL,
}: BoundingBoxesProps) {
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
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
    if (videoRef.current) {
      const video:any = videoRef.current;
      if (typeof video.videoWidth !== 'undefined' && typeof video.videoHeight !== 'undefined') {
        const newScale = Math.min(
          stageSize.width / video.videoWidth,
          stageSize.height / video.videoHeight
        );
        const x = stageSize.width / 2 - (video.videoWidth / 2) * newScale;
        const y = stageSize.height / 2 - (video.videoHeight / 2) * newScale;
        setScale(newScale);
        setOffset({ x, y });
      }
    }
  }, [videoRef, stageSize]);

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };
  return (
    <div ref={stageRef}>
      <ReactPlayer ref={videoRef} url={videoURL} />
      {response && <div></div>}
    </div>
  );
}
