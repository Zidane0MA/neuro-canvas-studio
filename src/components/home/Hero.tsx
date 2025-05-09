
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

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
                    <BrainCircuit size={64} className="text-purple-500" />
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
