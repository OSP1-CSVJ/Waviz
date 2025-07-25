import React from "react";
type vizComponentProps = {
    srcAudio: any;
    srcCanvas: React.RefObject<HTMLCanvasElement>;
    options: {};
    audioContext?: AudioContext;
};
declare function BarComponent({ srcAudio, srcCanvas, options, audioContext }: vizComponentProps): import("react/jsx-runtime").JSX.Element;
export default BarComponent;
