"use client";

import { useEffect, useRef, useCallback } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  accent: boolean;
};

const NODE_COUNT = 36;
const CONNECTION_DISTANCE = 150;
const SPEED = 0.18;

export function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const initializedRef = useRef(false);

  const initNodes = useCallback((width: number, height: number) => {
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      accent: Math.random() < 0.2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      if (width === 0 || height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      if (!initializedRef.current) {
        initNodes(width, height);
        initializedRef.current = true;
      }
    };

    resize();

    const draw = () => {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      if (width === 0 || height === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const hasAccent = nodes[i].accent || nodes[j].accent;
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.25;
            ctx.strokeStyle = hasAccent
              ? `rgba(179, 58, 58, ${opacity})`
              : `rgba(80, 80, 80, ${opacity})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.fillStyle = node.accent
          ? "rgba(179, 58, 58, 0.35)"
          : "rgba(80, 80, 80, 0.3)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.accent ? 2.5 : 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
