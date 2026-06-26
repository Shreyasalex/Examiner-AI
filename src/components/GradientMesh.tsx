import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GradientMesh() {
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        gsap.to(meshRef.current, {
          x: x,
          y: y,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={meshRef}
      className="fixed inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%] -z-10 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 20% 15%, #C9B8EC 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 85% 10%, #A9BFF2 0%, transparent 55%),
          radial-gradient(ellipse 65% 55% at 75% 85%, #F2EBE0 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 10% 90%, #E3D9F7 0%, transparent 60%),
          #FAF6EE
        `,
        filter: "blur(60px)",
        animation: "meshDrift 80s ease-in-out infinite alternate",
      }}
    >
      <style>{`
        @keyframes meshDrift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10px, -8px) scale(1.02); }
          66% { transform: translate(-8px, 12px) scale(1.03); }
          100% { transform: translate(15px, 5px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default GradientMesh;
