'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  range?: number;
  strength?: number;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function MagneticButton({
  children,
  className = '',
  range = 50,
  strength = 8,
  href,
  ...props
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const button = containerRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.75)' });
    const yTo = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.75)' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        const factor = (range - distance) / range;
        const targetX = distanceX * (strength / range) * factor * 1.5;
        const targetY = distanceY * (strength / range) * factor * 1.5;
        xTo(targetX);
        yTo(targetY);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    button.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, strength]);

  if (href) {
    return (
      <Link
        href={href}
        ref={containerRef as unknown as React.Ref<HTMLAnchorElement>}
        className={`${className} will-change-transform inline-block`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={containerRef as unknown as React.Ref<HTMLButtonElement>}
      className={`${className} will-change-transform`}
      {...props}
    >
      {children}
    </button>
  );
}

export default MagneticButton;
