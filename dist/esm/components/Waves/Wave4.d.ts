import React from 'react';
type vizComponentProps = {
    srcAudio: any;
    srcCanvas?: React.RefObject<HTMLCanvasElement | null>;
    options?: {};
    audioContext?: AudioContext;
};
declare function Wave4({ srcAudio, srcCanvas, options, audioContext, }: vizComponentProps): import("react/jsx-runtime").JSX.Element;
export default Wave4;
