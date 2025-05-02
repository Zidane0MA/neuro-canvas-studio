
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="block">Run ComfyUI</span>
              <span className="block text-purple-500">Anywhere, Anytime</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              NeuroPod es una plataforma que te permite ejecutar ComfyUI de forma remota a través de tu navegador. 
              Genera imágenes sorprendentes con Stable Diffusion sin preocuparte por la configuración técnica.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/docs">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-pulse rounded-full bg-purple-500/20 p-8 inline-flex">
                    <BrainCircuitAnimation />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Visualización de IA generando imágenes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrainCircuitAnimation = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-purple-500"
    >
      <path d="M12 2a5 5 0 0 0-5 5v10a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"></path>
      <path d="M8 10V7a4 4 0 0 1 8 0v10a4 4 0 0 1-8 0v-3"></path>
      <path d="M12 2v20"></path>
      <path d="M8 7h8"></path>
      <path d="M8 17h8"></path>
      <path d="m2 22 3-3"></path>
      <path d="M19 22c-.998-.499-1.497-.998-1.996-1.997"></path>
      <path d="M2 17c.998.499 1.497.998 1.996 1.997"></path>
      <path d="m19 17-3 3"></path>
      <path d="m2 12 20 0"></path>
    </svg>
  );
};
