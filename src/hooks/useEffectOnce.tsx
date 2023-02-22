import { useEffect, useRef } from 'react';

const useEffectOnce = (callback?: () => void) => {
  const isTriggered = useRef(false);

  useEffect(() => {
    if (isTriggered.current) return;

    isTriggered.current = true;

    callback?.();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useEffectOnce;
