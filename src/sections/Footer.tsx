'use client';

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="pt-20 pb-10 px-6 relative z-10 border-t border-[rgba(30,27,36,0.07)]" style={{ background: 'rgba(242,235,224,0.55)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4 inline-flex">
              <Image 
                src="/logo.png" 
                alt="Examiner AI Logo" 
                width={36} 
                height={36} 
                className="object-contain transition-transform group-hover:scale-105"
              />
              <span className="font-display font-bold text-xl tracking-tight text-[#1E1B24]">
                EXAMINER AI
              </span>
            </Link>
            <p className="text-[#5C5868] text-sm">
              Intelligent exams for the next generation.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-[#1E1B24] mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="#overview" className="text-[#5C5868] hover:text-[#1E1B24] text-sm transition-colors">Overview</Link></li>
              <li><Link href="#students" className="text-[#5C5868] hover:text-[#1E1B24] text-sm transition-colors">For Students</Link></li>
              <li><Link href="#faculty" className="text-[#5C5868] hover:text-[#1E1B24] text-sm transition-colors">For Faculty</Link></li>
              <li><Link href="#workflow" className="text-[#5C5868] hover:text-[#1E1B24] text-sm transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-[#1E1B24] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[#5C5868] hover:text-[#1E1B24] text-sm transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[#5C5868] hover:text-[#1E1B24] text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(30,27,36,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#5C5868] text-sm">
            © 2026 Examiner AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-[#5C5868] hover:text-[#4A63C9] transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-[#5C5868] hover:text-[#4A63C9] transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-[#5C5868] hover:text-[#4A63C9] transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
