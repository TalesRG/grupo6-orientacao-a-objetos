"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Calendar, FileText } from "lucide-react"
import {useEffect, useState} from "react";
import api from "@/lib/api";

export default function DashboardPage() {

  const [numeroLocatarios, setNumeroLocatarios] = useState<number>()
  const [numeroLocadorasAtivas, setNumeroLocadorasAtivas] = useState<number>()
  const [reservaAtivas, setReservaAtivas] = useState<number>()
  const [receitaMensal, setReceitaMensal] = useState<number>()


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const reservasAtivaResponse = await api.get("/reserva/total/ativos");
        const locatariosResponse = await api.get("/locatario/total/ativos");
        const locadorasAtivasResponse = await api.get("/locadora/total/ativos");
        const receitaResponse = await api.get("/reserva/receitaMensal");

        const reservasAtiva = reservasAtivaResponse.data;
        const locatarios = locatariosResponse.data;
        const locadorasAtivas = locadorasAtivasResponse.data;
        const receita = receitaResponse.data;

        setNumeroLocatarios(locatarios);
        setNumeroLocadorasAtivas(locadorasAtivas);
        setReservaAtivas(reservasAtiva);
        setReceitaMensal(receita);

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locatários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{String(numeroLocatarios)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locadoras Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numeroLocadorasAtivas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservas Ativas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservaAtivas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${receitaMensal}</div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
