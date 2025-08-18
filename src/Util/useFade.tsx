import { useEffect, useState } from "react";

export type UseFadeResult = { shouldRender: boolean; fadeClass: string };
interface FadeOptions {
  duration?: number; // ms
  fadeIn?: boolean; // default true
  fadeOut?: boolean; // default true
}

/**
 * Fades in on mount, fades out on hide, then unmounts.
 * @param isMounted external show/hide flag
 * @param options details on fadein, fadeout and duration
 */
const useFade = (
  isMounted: boolean,
  options: FadeOptions = {}
): UseFadeResult => {
  const { duration = 300, fadeIn = true, fadeOut = true } = options;
  const [shouldRender, setShouldRender] = useState(isMounted);
  const [fadeClass, setFadeClass] = useState("opacity-0");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (isMounted) {
      setShouldRender(true);
      if (fadeIn) {
        // Ensure mounted, then fade in next frame
        setFadeClass("opacity-0");
        // react insert component to DOM immediately and opacity-0 can't have animation.
        // so we need this function
        requestAnimationFrame(() => setFadeClass("opacity-100"));
      } else {
        // no fadein
        setFadeClass("opacity-100");
      }
    } else if (shouldRender) {
      if (fadeOut) {
        // Fade out, then unmount after duration
        setFadeClass("opacity-0");
        timeoutId = setTimeout(() => setShouldRender(false), duration);
      } else {
        // no fade-out. remove immediately
        setShouldRender(false);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMounted, fadeIn, fadeOut, duration, shouldRender]);

  return {
    shouldRender,
    fadeClass: `${fadeClass} transition-opacity ease-in-out duration-${duration}`,
  };
};

export default useFade;
