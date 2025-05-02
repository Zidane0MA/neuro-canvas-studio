
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Globe, Lock, Zap, ServerIcon, Image } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Acceso Remoto",
      description: "Accede a ComfyUI desde cualquier lugar a través de un navegador web.",
      icon: <Globe className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Alto Rendimiento",
      description: "Aprovecha el poder de GPUs para generar imágenes con Stable Diffusion.",
      icon: <Cpu className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Seguridad Avanzada",
      description: "Autenticación segura con Google OAuth2 y tokens JWT.",
      icon: <Lock className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Escalabilidad",
      description: "Arquitectura basada en contenedores que escala según tus necesidades.",
      icon: <ServerIcon className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Rapidez",
      description: "Interfaz optimizada para una experiencia fluida y sin retrasos.",
      icon: <Zap className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Generación de Imágenes",
      description: "Crea imágenes sorprendentes con modelos de inteligencia artificial.",
      icon: <Image className="h-6 w-6 text-purple-500" />,
    },
  ];

  return (
    <div className="bg-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Características Principales
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            NeuroPod ofrece una solución completa para ejecutar ComfyUI de forma remota.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
