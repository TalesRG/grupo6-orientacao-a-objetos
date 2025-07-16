"use client"

import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, DollarSign, Users } from "lucide-react"
import api from "@/lib/api";

interface RelatorioReserva {
  id: number
  locatario: string
  locadora: string
  veiculo: string
  dataInicio: string
  dataFim: string
  valorTotal: number
  seguros: string[]
  status: string
  diasLocacao: number
}

export default function RelatoriosManager() {
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    locatario: "",
    locadora: "",
    status: "Todos",
  })

  const [reservasRelatorio,setReservasRelatorio] = useState<RelatorioReserva[]>([])

  useEffect(() => {
    const fetchLocatarios = async () => {
      try {
        const response = await api.get("/reserva/listar")
        setReservasRelatorio(response.data)

      } catch (error) {
        console.error("Erro ao buscar locatários:", error)
      }
    }

    fetchLocatarios()
  }, [])

  const filtrarReservas = () => {
    return reservasRelatorio.filter((reserva) => {
      const matchDataInicio = !filtros.dataInicio || reserva.dataInicio >= filtros.dataInicio
      const matchDataFim = !filtros.dataFim || reserva.dataFim <= filtros.dataFim
      const matchLocatario =
        !filtros.locatario || reserva.locatario.toLowerCase().includes(filtros.locatario.toLowerCase())
      const matchLocadora = !filtros.locadora || reserva.locadora.toLowerCase().includes(filtros.locadora.toLowerCase())
      const matchStatus = filtros.status === "Todos" || reserva.status === filtros.status

      return matchDataInicio && matchDataFim && matchLocatario && matchLocadora && matchStatus
    })
  }

  const calcularEstatisticas = () => {
    const reservasFiltradas = filtrarReservas()
    const totalReservas = reservasFiltradas.length
    const valorTotal = reservasFiltradas.reduce((acc, reserva) => acc + reserva.valorTotal, 0)
    const diasTotais = reservasFiltradas.reduce((acc, reserva) => acc + reserva.diasLocacao, 0)
    const ticketMedio = totalReservas > 0 ? valorTotal / totalReservas : 0

    return {
      totalReservas,
      valorTotal,
      diasTotais,
      ticketMedio,
    }
  }

  const exportarRelatorio = () => {
    const reservasFiltradas = filtrarReservas()
    const csvContent = [
      ["ID", "Locatário", "Locadora", "Veículo", "Data Início", "Data Fim", "Dias", "Valor Total", "Seguros", "Status"],
      ...reservasFiltradas.map((reserva) => [
        reserva.id,
        reserva.locatario,
        reserva.locadora,
        reserva.veiculo,
        new Date(reserva.dataInicio).toLocaleDateString("pt-BR"),
        new Date(reserva.dataFim).toLocaleDateString("pt-BR"),
        reserva.diasLocacao,
        `R$ ${reserva.valorTotal.toFixed(2)}`,
        reserva.seguros.join("; "),
        reserva.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `relatorio_reservas_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const limparFiltros = () => {
    setFiltros({
      dataInicio: "",
      dataFim: "",
      locatario: "",
      locadora: "",
      status: "Todos",
    })
  }

  const estatisticas = calcularEstatisticas()

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Relatórios</h2>
          <p className="text-muted-foreground">Visualize relatórios detalhados das reservas - US06</p>
        </div>
        <Button onClick={exportarRelatorio}>
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Reservas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{estatisticas.totalReservas}</div>
            <p className="text-xs text-muted-foreground">Reservas no período</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">R$ {estatisticas.valorTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Valor total das reservas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dias Totais</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{estatisticas.diasTotais}</div>
            <p className="text-xs text-muted-foreground">Dias de locação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">R$ {estatisticas.ticketMedio.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Valor médio por reserva</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros do Relatório</CardTitle>
          <CardDescription>Configure os filtros para gerar relatórios personalizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataFim">Data Fim</Label>
              <Input
                id="dataFim"
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locatario">Locatário</Label>
              <Input
                id="locatario"
                placeholder="Nome do locatário"
                value={filtros.locatario}
                onChange={(e) => setFiltros({ ...filtros, locatario: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locadora">Locadora</Label>
              <Input
                id="locadora"
                placeholder="Nome da locadora"
                value={filtros.locadora}
                onChange={(e) => setFiltros({ ...filtros, locadora: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filtros.status} onValueChange={(value) => setFiltros({ ...filtros, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Ativa">Ativa</SelectItem>
                  <SelectItem value="Finalizada">Finalizada</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={limparFiltros}>
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Relatório */}
      <Card>
        <CardHeader>
          <CardTitle>Relatório Detalhado de Reservas</CardTitle>
          <CardDescription>Visualização completa das reservas com base nos filtros aplicados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Locatário</TableHead>
                <TableHead>Locadora</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Dias</TableHead>
                <TableHead>Seguros</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrarReservas().map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell className="font-medium">#{reserva.id}</TableCell>
                  <TableCell>{reserva.locatario}</TableCell>
                  <TableCell>{reserva.locadora}</TableCell>
                  <TableCell>{reserva.veiculo}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(reserva.dataInicio).toLocaleDateString("pt-BR")}</div>
                      <div className="text-muted-foreground">
                        até {new Date(reserva.dataFim).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{reserva.diasLocacao}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {reserva.seguros.map((seguro, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {seguro}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">R$ {reserva.valorTotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        reserva.status === "Ativa"
                          ? "default"
                          : reserva.status === "Finalizada"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {reserva.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtrarReservas().length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma reserva encontrada com os filtros aplicados
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
