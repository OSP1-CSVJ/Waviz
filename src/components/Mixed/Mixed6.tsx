import React, { useRef, useEffect, useState } from 'react';
import Waviz from '../../core/waviz';
//* Polar particles and lines with a linear gradient.
//* Props: Color1, Color2

type vizComponentProps = {
  srcAudio: any;
  srcCanvas?: React.RefObject<HTMLCanvasElement | null>;
  options?: {};
  audioContext?: AudioContext;
};

function Mixed6({
  srcAudio,
  srcCanvas,
  options,
  audioContext,
}: vizComponentProps) {
  // References
  const wavizReference = useRef<Waviz | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasReady, setCanvasReady] = useState(false); // Needed in case of defaulting back to preset canvas. UseRef only will not trigger page re-render, causing visualizer to run before canvas is rendered

  // User options
  let userOptions = {};
  if (options) {
    userOptions = [
      {
        domain: ['time', 300, 100, 'hann'],
        coord: ['polar', 100, 90],
        viz: ['particles', [0.5, 0.5], -0.01, , 5, 20],
        color: ['linearGradient', options[0], options[1], 'flip'],
        stroke: [4],
      },
      {
        domain: ['time', 300, 100, 'hann'],
        coord: ['polar', 100, 90],
        viz: ['line'],
        color: ['linearGradient', options[0], options[1], 'flip'],
        stroke: [5],
      },
    ];
  }

  const defaults = [
    {
      domain: ['time', 300, 100, 'hann'],
      coord: ['polar', 100, 90],
      viz: ['particles', [0.5, 0.5], -0.01, , 5, 20],
      color: ['linearGradient', 'yellow', 'red', 'flip'],
      stroke: [4],
    },
    {
      domain: ['time', 300, 100, 'hann'],
      coord: ['polar', 100, 90],
      viz: ['line'],
      color: ['linearGradient', 'yellow', 'red', 'flip'],
      stroke: [5],
    },
  ];
  const optionsObject = [
    Object.assign(defaults[0], userOptions[0]),
    Object.assign(defaults[1], userOptions[1]),
  ];

  // Use Effect Logic
  useEffect(() => {
    //Check if canvas is passed in and assign srcCanvas to canvasRef if passed in
    if (srcCanvas?.current) {
      //! Logic shortened with ? operator to throw undefined instead of of error
      canvasRef.current = srcCanvas.current;
      setCanvasReady(true);
    } else if (canvasRef.current) {
      setCanvasReady(true);
    }
  }, [srcCanvas]);

  useEffect(() => {
    // Check if canvas exists
    if (!canvasReady || !canvasRef.current || !srcAudio.current) return;

    if (!wavizReference.current) {
      wavizReference.current = new Waviz(
        canvasRef.current,
        srcAudio.current,
        audioContext
      );
    }

    if (srcAudio.current instanceof HTMLAudioElement) {
      const playWave = () => wavizReference.current?.render(optionsObject);
      const stopWave = () => wavizReference.current?.visualizer.stop();

      // Event Listeners
      srcAudio.current.addEventListener('play', playWave);
      srcAudio.current.addEventListener('pause', stopWave);

      return () => {
        // Cleanup Listeners
        srcAudio.current.removeEventListener('play', playWave);
        srcAudio.current.removeEventListener('pause', stopWave);
        wavizReference.current?.visualizer.stop();
      };
    } else {
      wavizReference.current.render(optionsObject);
    }
  }, [canvasReady, srcAudio, options, audioContext]);

  return (
    <div>
      {!srcCanvas && <canvas ref={canvasRef} width={500} height={300}></canvas>}
    </div>
  );
}
export default Mixed6;
