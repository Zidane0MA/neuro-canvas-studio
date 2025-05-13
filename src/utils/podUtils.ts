
import { toast } from "sonner";

export interface Pod {
  id: string;
  name: string;
  status: "running" | "stopped";
  uptime: string;
  cpu: number;
  memory: string;
  gpu: number;
  ports: number[];
  user?: string;
}

// Lista de pods iniciales para cliente
export const initialClientPods: Pod[] = [
  {
    id: "pod-1",
    name: "ComfyUI-1",
    status: "running",
    uptime: "2h 15m",
    cpu: 25,
    memory: "4.2GB / 8GB",
    gpu: 65,
    ports: [8888, 7860],
  },
  {
    id: "pod-2",
    name: "Ubuntu-Dev",
    status: "stopped",
    uptime: "-",
    cpu: 0,
    memory: "0GB / 4GB",
    gpu: 0,
    ports: [8888, 22],
  },
];

// Lista de pods iniciales para admin
export const initialAdminPods: Pod[] = [
  {
    id: "pod-1",
    name: "ComfyUI-1",
    status: "running",
    uptime: "2h 15m",
    cpu: 25,
    memory: "4.2GB / 8GB",
    gpu: 65,
    ports: [8888, 7860],
    user: "admin@example.com",
  },
  {
    id: "pod-2",
    name: "Ubuntu-Dev",
    status: "stopped",
    uptime: "-",
    cpu: 0,
    memory: "0GB / 4GB",
    gpu: 0,
    ports: [8888, 22],
    user: "admin@example.com",
  },
  {
    id: "pod-3",
    name: "DataScience-1",
    status: "running",
    uptime: "5h 43m",
    cpu: 45,
    memory: "12GB / 16GB",
    gpu: 78,
    ports: [8888, 6006],
    user: "usuario1@example.com",
  },
  {
    id: "pod-4",
    name: "ComfyUI-2",
    status: "stopped",
    uptime: "-",
    cpu: 0,
    memory: "0GB / 4GB",
    gpu: 0,
    ports: [7860],
    user: "usuario2@example.com",
  },
];

// Función para generar un nuevo pod
export const createNewPod = (
  podName: string, 
  template: string, 
  containerDiskSize: number, 
  volumeDiskSize: number,
  selectedGpu: any,
  ports: string,
  user?: string
): Pod => {
  const portsArray = ports.split(",").map(port => parseInt(port.trim())).filter(port => !isNaN(port));
  
  return {
    id: `pod-${Date.now()}`,
    name: podName,
    status: "running",
    uptime: "0h 0m",
    cpu: Math.floor(Math.random() * 20) + 10, // Valor aleatorio entre 10 y 30
    memory: `${(containerDiskSize * 0.3).toFixed(1)}GB / ${containerDiskSize}GB`,
    gpu: Math.floor(Math.random() * 30) + 20, // Valor aleatorio entre 20 y 50
    ports: portsArray,
    ...(user ? { user } : {})
  };
};

// Función para cambiar el estado de un pod
export const togglePodStatus = (pod: Pod): Pod => {
  if (pod.status === "running") {
    // Apagar pod
    toast.success(`Pod ${pod.name} detenido correctamente`);
    return {
      ...pod,
      status: "stopped",
      uptime: "-",
      cpu: 0,
      gpu: 0,
      memory: pod.memory.split('/')[1].trim().replace('GB', '') + "GB / " + pod.memory.split('/')[1].trim()
    };
  } else {
    // Encender pod
    toast.success(`Pod ${pod.name} iniciado correctamente`);
    return {
      ...pod,
      status: "running",
      uptime: "0h 1m",
      cpu: Math.floor(Math.random() * 30) + 10,
      gpu: Math.floor(Math.random() * 50) + 30,
      memory: `${(parseFloat(pod.memory.split('/')[1].trim().replace('GB', '')) * 0.4).toFixed(1)}GB / ${pod.memory.split('/')[1].trim()}`
    };
  }
};

// Función para eliminar un pod
export const deletePod = (podId: string, pods: Pod[]): Pod[] => {
  return pods.filter(pod => pod.id !== podId);
};
