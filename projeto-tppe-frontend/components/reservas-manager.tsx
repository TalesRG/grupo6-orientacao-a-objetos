"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit, Eye, Calculator } from "lucide-react"

interface Reserva {
  id: number
  locatario: string
  locadora: string
  veiculo: string
  dataInicio: string
  dataFim: string
  valorBase: number
  seguros: string[]
  valorTotal: number
  status: "Ativa" | "Finalizada" | "Cancelada"
}

export default function ReservasManager() {
  const [reservas, setReservas] = useState<Reserva[]>([
    {
      id: 1,
      locatario: "João Silva",
      locadora: "AutoRent Locadora",
      veiculo: "Honda Civic 2023",
      dataInicio: "2024-01-15",
      dataFim: "2024-01-20",
      valorBase: 150,
      seguros: ["Seguro Total", "Proteção Terceiros"],
      valorTotal: 950,
      status: "Ativa",
    },
    {
      id: 2,
      locatario: "Empresa XYZ Ltda",
      locadora: "VelocCar Aluguel",
      veiculo: "Toyota Corolla 2023",
      dataInicio: "2024-01-10",
      dataFim: "2024-01-25",
      valorBase: 120,
      seguros: ["Seguro Básico"],
      valorTotal: 1950,
      status: "Ativa",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null)
  const [searchPeriod, setSearchPeriod] = useState({ inicio: "", fim: "" })
  const [formData, setFormData] = useState({
    locatario: "",
    locadora: "",
    veiculo: "",
    dataInicio: "",
    dataFim: "",
    valorBase: 0,
    seguros: [] as string[],
    valorAdicional: 0,
  })

  const segurosDisponiveis = [
    "Seguro Básico",
    "Seguro Total",
    "Proteção Terceiros",
    "Cobertura Vidros",
    "Assistência 24h",
  ]

  const calcularValorTotal = () => {
    if (!formData.dataInicio || !formData.dataFim || !formData.valorBase) return 0

    const inicio = new Date(formData.dataInicio)
    const fim = new Date(formData.dataFim)
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24))

    const valorDiarias = dias * formData.valorBase
    const valorSeguros = formData.seguros.length * 25 * dias // R$ 25 por seguro por dia
    const total = valorDiarias + valorSeguros + formData.valorAdicional

    return total
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const valorTotal = calcularValorTotal()

    if (editingReserva) {
      // Atualizar reserva existente - US04
      setReservas((prev) =>
        prev.map((res) =>
          res.id === editingReserva.id ? { ...res, ...formData, valorTotal, status: "Ativa" as const } : res,
        ),
      )
    } else {
      // Criar nova reserva - US03
      const newReserva: Reserva = {
        id: Date.now(),
        ...formData,
        valorTotal,
        status: "Ativa",
      }
      setReservas((prev) => [...prev, newReserva])
    }

    setIsDialogOpen(false)
    setEditingReserva(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      locatario: "",
      locadora: "",
      veiculo: "",
      dataInicio: "",
      dataFim: "",
      valorBase: 0,
      seguros: [],
      valorAdicional: 0,
    })
  }

  const openEditDialog = (reserva: Reserva) => {
    setEditingReserva(reserva)
    setFormData({
      locatario: reserva.locatario,
      locadora: reserva.locadora,
      veiculo: reserva.veiculo,
      dataInicio: reserva.dataInicio,
      dataFim: reserva.dataFim,
      valorBase: reserva.valorBase,
      seguros: reserva.seguros,
      valorAdicional: 0,
    })
    setIsDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingReserva(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const handleSeguroChange = (seguro: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, seguros: [...formData.seguros, seguro] })
    } else {
      setFormData({ ...formData, seguros: formData.seguros.filter((s) => s !== seguro) })
    }
  }

  const filtrarReservasPorPeriodo = () => {
    if (!searchPeriod.inicio || !searchPeriod.fim) return reservas

    return reservas.filter((reserva) => {
      const inicioReserva = new Date(reserva.dataInicio)
      const fimReserva = new Date(reserva.dataFim)
      const inicioBusca = new Date(searchPeriod.inicio)
      const fimBusca = new Date(searchPeriod.fim)

      return (
        (inicioReserva >= inicioBusca && inicioReserva <= fimBusca) ||
        (fimReserva >= inicioBusca && fimReserva <= fimBusca) ||
        (inicioReserva <= inicioBusca && fimReserva >= fimBusca)
      )
    })
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reservas</h2>
          <p className="text-muted-foreground">Gerencie todas as reservas do sistema</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Reserva
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingReserva ? "Editar Reserva" : "Cadastrar Reserva"}</DialogTitle>
              <DialogDescription>
                {editingReserva ? "Atualize os dados da reserva" : "Preencha os dados para criar uma nova reserva"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="locatario">Locatário</Label>
                    <Select
                      value={formData.locatario}
                      onValueChange={(value) => setFormData({ ...formData, locatario: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o locatário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="João Silva">João Silva</SelectItem>
                        <SelectItem value="Empresa XYZ Ltda">Empresa XYZ Ltda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locadora">Locadora</Label>
                    <Select
                      value={formData.locadora}
                      onValueChange={(value) => setFormData({ ...formData, locadora: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a locadora" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AutoRent Locadora">AutoRent Locadora</SelectItem>
                        <SelectItem value="VelocCar Aluguel">VelocCar Aluguel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="veiculo">Veículo</Label>
                  <Input
                    id="veiculo"
                    value={formData.veiculo}
                    onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
                    placeholder="Ex: Honda Civic 2023"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataInicio">Data Início</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={formData.dataInicio}
                      onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataFim">Data Fim</Label>
                    <Input
                      id="dataFim"
                      type="date"
                      value={formData.dataFim}
                      onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valorBase">Valor Diária (R$)</Label>
                    <Input
                      id="valorBase"
                      type="number"
                      value={formData.valorBase}
                      onChange={(e) => setFormData({ ...formData, valorBase: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Seguros e Proteções - US12</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {segurosDisponiveis.map((seguro) => (
                      <div key={seguro} className="flex items-center space-x-2">
                        <Checkbox
                          id={seguro}
                          checked={formData.seguros.includes(seguro)}
                          onCheckedChange={(checked) => handleSeguroChange(seguro, checked as boolean)}
                        />
                        <Label htmlFor={seguro} className="text-sm">
                          {seguro}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorAdicional">Valores Adicionais (R$)</Label>
                  <Input
                    id="valorAdicional"
                    type="number"
                    value={formData.valorAdicional}
                    onChange={(e) => setFormData({ ...formData, valorAdicional: Number(e.target.value) })}
                    placeholder="Taxa de limpeza, combustível, etc."
                  />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Valor Total Calculado - US07:</span>
                    <span className="text-lg font-bold text-green-600">R$ {calcularValorTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingReserva ? "Atualizar" : "Cadastrar"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Busca por período - US11 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Buscar Reservas por Período</CardTitle>
          <CardDescription>Filtre as reservas por data de início e fim</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="periodoInicio">Data Início</Label>
              <Input
                id="periodoInicio"
                type="date"
                value={searchPeriod.inicio}
                onChange={(e) => setSearchPeriod({ ...searchPeriod, inicio: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodoFim">Data Fim</Label>
              <Input
                id="periodoFim"
                type="date"
                value={searchPeriod.fim}
                onChange={(e) => setSearchPeriod({ ...searchPeriod, fim: e.target.value })}
              />
            </div>
            <Button variant="outline" onClick={() => setSearchPeriod({ inicio: "", fim: "" })}>
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Reservas</CardTitle>
          <CardDescription>Visualize e gerencie todas as reservas cadastradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Locatário</TableHead>
                <TableHead>Locadora</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrarReservasPorPeriodo().map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell className="font-medium">{reserva.locatario}</TableCell>
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
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(reserva)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
