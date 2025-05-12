
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TemplatesSettings = () => {
  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader className="pb-3">
        <CardTitle>Gestión de Plantillas</CardTitle>
        <CardDescription>Configura las plantillas disponibles para los pods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-medium">Ubuntu</h3>
              <p className="text-sm text-muted-foreground">Ubuntu 22.04 con soporte para CUDA</p>
            </div>
            <Button variant="outline">Editar</Button>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-medium">ComfyUI</h3>
              <p className="text-sm text-muted-foreground">ComfyUI con dependencias preinstaladas</p>
            </div>
            <Button variant="outline">Editar</Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Crear Nueva Plantilla</h3>
              <p className="text-sm text-muted-foreground">Configura una nueva plantilla</p>
            </div>
            <Button>Crear</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
