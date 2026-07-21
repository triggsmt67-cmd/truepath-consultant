"use client";

import { useEffect, useRef, useState } from "react";

export default function LeadFlowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setIsAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`lead-flow ${isAnimated ? "is-animated" : ""}`}
      aria-label="Lead generated, website visit, phone call, follow-up, job booked"
    >
      <div className="lead-flow__labels" aria-hidden="true">
        <span>Lead generated</span>
        <span>Website</span>
        <span>Phone call</span>
        <span>Follow-up</span>
        <span>Job booked</span>
      </div>

      <div className="lead-flow__track" aria-hidden="true">
        <span className="lead-flow__line"></span>

        <span className="lead-flow__node node-1"></span>
        <span className="lead-flow__node node-2"></span>
        <span className="lead-flow__node node-3"></span>
        <span className="lead-flow__node node-4"></span>
        <span className="lead-flow__node node-5"></span>

        <span className="lead-flow__moving-dot"></span>

        <span className="lead-flow__leak leak-1"></span>
        <span className="lead-flow__leak leak-2"></span>
        <span className="lead-flow__leak leak-3"></span>
      </div>

      <style jsx>{`
        .lead-flow {
          /* Mapped to your brand tokens for consistency */
          --flow-color: var(--color-foreground);
          --flow-accent: var(--color-primary);
          --flow-muted: var(--color-muted-border);

          width: min(100%, 620px);
          margin: 48px 0 24px 0;
          padding-right: 16px;
        }

        .lead-flow__labels {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          align-items: end;
          color: var(--flow-color);
          font-family: inherit;
          font-size: 12px;
          line-height: 1.2;
        }

        .lead-flow__labels span {
          text-align: center;
        }

        .lead-flow__labels span:first-child {
          text-align: left;
        }

        .lead-flow__labels span:last-child {
          text-align: right;
        }

        .lead-flow__track {
          position: relative;
          height: 48px;
          margin-top: 12px;
        }

        .lead-flow__line {
          position: absolute;
          top: 4px;
          right: 0;
          left: 0;
          height: 1px;
          background: var(--flow-muted);
          transform: scaleX(0);
          transform-origin: left;
        }

        .lead-flow__node,
        .lead-flow__moving-dot,
        .lead-flow__leak {
          position: absolute;
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transform: translateX(-50%);
        }

        .lead-flow__node {
          top: 0;
          background: var(--flow-muted);
        }

        .node-1 { left: 0; }
        .node-2 { left: 25%; }
        .node-3 { left: 50%; }
        .node-4 { left: 75%; }
        .node-5 { left: 100%; }

        .lead-flow__moving-dot {
          top: 0;
          left: 0;
          z-index: 2;
          background: var(--flow-accent);
          opacity: 0;
        }

        .lead-flow__leak {
          top: 0;
          background: var(--flow-accent);
          opacity: 0;
        }

        .leak-1 { left: 25%; }
        .leak-2 { left: 50%; }
        .leak-3 { left: 75%; }

        .lead-flow.is-animated .lead-flow__line {
          animation: draw-line 1s ease-out forwards;
        }

        .lead-flow.is-animated .lead-flow__moving-dot {
          animation: move-lead 4s ease-in-out 0.25s forwards;
        }

        .lead-flow.is-animated .leak-1 {
          animation: drop-lead 0.6s ease-out 1.25s forwards;
        }

        .lead-flow.is-animated .leak-2 {
          animation: drop-lead 0.6s ease-out 2.25s forwards;
        }

        .lead-flow.is-animated .leak-3 {
          animation: drop-lead 0.6s ease-out 3.25s forwards;
        }

        @keyframes draw-line {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes move-lead {
          0% {
            left: 0;
            opacity: 0;
          }

          6% {
            opacity: 1;
          }

          100% {
            left: 100%;
            opacity: 1;
          }
        }

        @keyframes drop-lead {
          0% {
            opacity: 0;
            transform: translate(-50%, 0);
          }

          30% {
            opacity: 1;
          }

          100% {
            opacity: 0.35;
            transform: translate(-50%, 25px);
          }
        }

        @media (max-width: 520px) {
          .lead-flow__labels {
            font-size: 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lead-flow__line {
            transform: scaleX(1);
          }

          .lead-flow__moving-dot {
            left: 100%;
            opacity: 1;
          }

          .lead-flow__leak {
            opacity: 0.35;
            transform: translate(-50%, 25px);
          }
        }
      `}</style>
    </div>
  );
}
