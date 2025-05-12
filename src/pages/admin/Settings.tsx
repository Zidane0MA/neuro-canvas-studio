
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  Settings as SettingsIcon, 
  FileBox, 
  DollarSign, 
  HardDrive, 
  ServerCog, 
  Save, 
  Download 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminSettings = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <DashboardLayout title="Configuración">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Configuración</h1>
        <p className="text-sm text-muted-foreground">Gestiona la configuración del sistema</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <div className="border rounded-md mb-3 p-1 bg-muted">
          <ScrollArea className="w-full" orientation="horizontal">
            <div className="flex w-full justify-center">
              <TabsList className="bg-transparent">
                <TabsTrigger value="profile" className="flex gap-1 items-center">
                  <User className="h-3.5 w-3.5" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="system" className="flex gap-1 items-center">
                  <ServerCog className="h-3.5 w-3.5" />
                  Sistema
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex gap-1 items-center">
                  <FileBox className="h-3.5 w-3.5" />
                  Plantillas
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex gap-1 items-center">
                  <DollarSign className="h-3.5 w-3.5" />
                  Precios
                </TabsTrigger>
                <TabsTrigger value="logs" className="flex gap-1 items-center">
                  <HardDrive className="h-3.5 w-3.5" />
                  Logs
                </TabsTrigger>
              </TabsList>
            </div>
          </ScrollArea>
        </div>
        
        <TabsContent value="profile" className="space-y-3">
          <Card className="overflow-hidden max-w-5xl mx-auto">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Perfil de Administrador</CardTitle>
              <CardDescription>Gestiona tu información de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" value={user?.name || ""} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ""} disabled />
                </div>
              </div>
              
              <div className="border-t pt-3">
                <Button className="flex gap-1.5 items-center bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
              
              <div className="border-t pt-3">
                <h3 className="font-semibold mb-2">Acciones del Perfil</h3>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="w-auto">
                    Eliminar todos los pods
                  </Button>
                  <Button variant="destructive" className="flex gap-1.5 items-center w-auto">
                    Eliminar cuenta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <Card className="max-w-5xl mx-auto">
            <CardHeader className="pb-3">
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>Gestiona la configuración general del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-shutdown">Auto-apagado de pods inactivos</Label>
                      <p className="text-sm text-muted-foreground">Apaga automáticamente los pods inactivos</p>
                    </div>
                    <Switch id="auto-shutdown" defaultChecked />
                  </div>
                  
                  <div className="pt-2">
                    <Label>Tiempo de inactividad (minutos)</Label>
                    <div className="flex justify-between mt-1 mb-1">
                      <span className="text-sm">30 min</span>
                      <span className="text-sm">240 min</span>
                    </div>
                    <Slider defaultValue={[120]} min={30} max={240} step={30} />
                    <div className="text-center mt-1">
                      <span className="text-sm font-medium">120 minutos</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notificaciones</Label>
                      <p className="text-sm text-muted-foreground">Envía notificaciones por email</p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance">Modo mantenimiento</Label>
                      <p className="text-sm text-muted-foreground">Activa el modo de mantenimiento</p>
                    </div>
                    <Switch id="maintenance" />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <Button className="flex gap-2 items-center bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4" />
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <Card className="max-w-5xl mx-auto">
            <CardHeader className="pb-3">
              <CardTitle>Precios y Cuotas</CardTitle>
              <CardDescription>Configura los precios y límites del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-medium">Precios GPU</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rtx-4050-price">NVIDIA RTX 4050</Label>
                    <div className="flex items-center">
                      <Input id="rtx-4050-price" type="number" defaultValue="2.50" className="max-w-[100px]" />
                      <span className="ml-2">€/hora</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rtx-4080-price">NVIDIA RTX 4080</Label>
                    <div className="flex items-center">
                      <Input id="rtx-4080-price" type="number" defaultValue="4.99" className="max-w-[100px]" />
                      <span className="ml-2">€/hora</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rtx-4090-price">NVIDIA RTX 4090</Label>
                    <div className="flex items-center">
                      <Input id="rtx-4090-price" type="number" defaultValue="8.99" className="max-w-[100px]" />
                      <span className="ml-2">€/hora</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Precios Almacenamiento</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="container-disk-price">Container Disk</Label>
                    <div className="flex items-center">
                      <Input id="container-disk-price" type="number" defaultValue="0.05" className="max-w-[100px]" />
                      <span className="ml-2">€/GB/hora</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="volume-disk-price">Volume Disk</Label>
                    <div className="flex items-center">
                      <Input id="volume-disk-price" type="number" defaultValue="0.10" className="max-w-[100px]" />
                      <span className="ml-2">€/GB/hora</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="free-tier">Free Tier</Label>
                      <p className="text-sm text-muted-foreground">Habilita el nivel gratuito</p>
                    </div>
                    <Switch id="free-tier" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <Button className="flex gap-2 items-center bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4" />
                  Guardar Precios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card className="max-w-5xl mx-auto">
            <CardHeader className="pb-3">
              <CardTitle>Logs y Backups</CardTitle>
              <CardDescription>Gestiona los logs y backups del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium">Logs del Sistema</h3>
                <Textarea 
                  className="font-mono h-[160px] resize-none bg-black text-white"
                  readOnly
                  value={`[2023-05-09 10:15:32] INFO: Sistema iniciado correctamente
[2023-05-09 10:15:35] INFO: Conectados a la base de datos
[2023-05-09 10:17:42] INFO: Usuario usuario1@example.com ha iniciado sesión
[2023-05-09 10:23:15] INFO: Pod ComfyUI-1 iniciado
[2023-05-09 10:45:22] WARNING: Uso de CPU al 80%
[2023-05-09 11:02:18] INFO: Usuario usuario2@example.com ha iniciado sesión
[2023-05-09 11:15:32] ERROR: Error al conectar con la GPU en el Pod-15`}
                />
                <Button variant="outline" className="flex gap-2 items-center">
                  <Download className="h-4 w-4" />
                  Descargar Logs
                </Button>
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <h3 className="font-medium">Backups</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Último backup: 09/05/2023 04:00</span>
                    <Button variant="outline" className="flex gap-2 items-center">
                      <Download className="h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Backup manual</span>
                    <Button>Crear Backup</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-backup">Backups automáticos</Label>
                    <p className="text-sm text-muted-foreground">Realiza backups automáticos diarios</p>
                  </div>
                  <Switch id="auto-backup" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminSettings;
