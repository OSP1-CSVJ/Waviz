import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import Waviz from '../../core/waviz';
import { getCSSColor, rgbToHsl, hexToRgb, rgbToArray, HSLtoArray, } from '../../utils/colorUtils';
function Wave4({ srcAudio, srcCanvas, options, audioContext, }) {
    // References
    const wavizReference = useRef(null);
    const canvasRef = useRef(null);
    const [canvasReady, setCanvasReady] = useState(false); // Needed in case of defaulting back to preset canvas. UseRef only will not trigger page re-render, causing visualizer to run before canvas is rendered
    let userOptions = {};
    let defaults = [
        { domain: ['time', 450], color: ['#eb1b00ff'] },
        { domain: ['time', 400], color: ['#eb4300ff'] },
        { domain: ['time', 350], color: ['#ff6715ff'] },
        { domain: ['time', 300], color: ['#ff9320ff'] },
        { domain: ['time', 250], color: ['#ffb836ff'] },
        { domain: ['time', 200], color: ['#ffca68ff'] },
        { domain: ['time', 150], color: ['#ffdd9dff'] },
        { domain: ['time', 100], color: ['#ffeeceff'] },
    ];
    defaults.forEach((e, i) => {
        if (!options || typeof options !== 'string') {
            return;
        }
        else {
            let hsl;
            if (options.includes('rgb')) {
                const rgb = rgbToArray(options);
                hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
            }
            else if (options.includes('hsl')) {
                hsl = HSLtoArray(options);
            }
            else if (options.includes('#')) {
                const rgb = hexToRgb(options);
                hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
            }
            else {
                const hex = getCSSColor(options);
                const rgb = hexToRgb(hex);
                hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
            }
            e.color[0] = `hsl(${hsl[0] + i * 10},${hsl[1] / ((i + 1) / 2)}%,${hsl[2]}%)`;
        }
    });
    const optionsObject = Object.assign(defaults, userOptions);
    // Use Effect Logic
    useEffect(() => {
        //Check if canvas is passed in and assign srcCanvas to canvasRef if passed in
        if (srcCanvas === null || srcCanvas === void 0 ? void 0 : srcCanvas.current) {
            //! Logic shortened with ? operator to throw undefined instead of of error
            canvasRef.current = srcCanvas.current;
            setCanvasReady(true);
        }
        else if (canvasRef.current) {
            setCanvasReady(true);
        }
    }, [srcCanvas]);
    useEffect(() => {
        // Check if canvas exists
        if (!canvasReady || !canvasRef.current || !srcAudio.current)
            return;
        if (!wavizReference.current) {
            wavizReference.current = new Waviz(canvasRef.current, srcAudio.current, audioContext);
        }
        if (srcAudio.current instanceof HTMLAudioElement) {
            const playWave = () => { var _a; return (_a = wavizReference.current) === null || _a === void 0 ? void 0 : _a.render(optionsObject); };
            const stopWave = () => { var _a; return (_a = wavizReference.current) === null || _a === void 0 ? void 0 : _a.visualizer.stop(); };
            // Event Listeners
            srcAudio.current.addEventListener('play', playWave);
            srcAudio.current.addEventListener('pause', stopWave);
            return () => {
                var _a;
                // Cleanup Listeners
                srcAudio.current.removeEventListener('play', playWave);
                srcAudio.current.removeEventListener('pause', stopWave);
                (_a = wavizReference.current) === null || _a === void 0 ? void 0 : _a.visualizer.stop();
            };
        }
        else {
            wavizReference.current.render(optionsObject);
        }
    }, [canvasReady, srcAudio, options, audioContext]);
    return (_jsx("div", { children: !srcCanvas && _jsx("canvas", { ref: canvasRef, width: 500, height: 300 }) }));
}
export default Wave4;
//# sourceMappingURL=Wave4.js.map