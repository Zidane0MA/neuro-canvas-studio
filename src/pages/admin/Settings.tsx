
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SettingsTabs } from "@/components/admin/settings/SettingsTabs";

const AdminSettings = () => {
  return (
    <DashboardLayout title="Configuración">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Configuración</h1>
        <p className="text-sm text-muted-foreground">Gestiona la configuración del sistema</p>
      </div>
      
      <SettingsTabs />
    </DashboardLayout>
  );
};

export default AdminSettings;
