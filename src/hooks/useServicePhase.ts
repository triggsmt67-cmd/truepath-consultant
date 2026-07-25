"use client";

import { useCallback, useState } from "react";

export type ServicePhase = 1 | 2 | 3;

const phaseViewport = {
  margin: "-20% 0px -20% 0px",
} as const;

export function useServicePhase() {
  const [activePhase, setActivePhase] = useState<ServicePhase>(1);

  const getPhaseProps = useCallback((phase: ServicePhase) => {
    return {
      viewport: phaseViewport,
      onViewportEnter: () => setActivePhase(phase),
    };
  }, []);

  return { activePhase, getPhaseProps };
}
