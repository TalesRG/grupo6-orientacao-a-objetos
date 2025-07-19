"use client"

import React, {useEffect} from "react"
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
import {Plus, Edit, Eye, Calculator, DeleteIcon, XCircle, CheckCircle} from "lucide-react"
import api from "@/lib/api";
import {Locatario} from "@/components/locatarios-manager";
import {Locadora} from "@/components/locadoras-manager";

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
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [locatarios, setLocatarios] = useState<Locatario[]>([])
  const [locadoras, setLocadoras] = useState<Locadora[]>([])

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [reservaParaCancelar, setReservaParaCancelar] = useState<Reserva | null>(null);
  const [reservaParaFinalizar, setReservaParaFinalizar] = useState<Reserva | null>(null);
  const [confimDialogFinishOpen, setConfimDialogFinishOpen] = useState(false);

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

  useEffect(() => {
    const fetchLocatarios = async () => {
      try {
        const response = await api.get("/reserva/listar")

        const locatrarios = await api.get("/locatario/listar")

        const locadoras = await api.get("/locadora/listar")

        setLocadoras(locadoras.data)
        setLocatarios(locatrarios.data)
        setReservas(response.data)
      } catch (error) {
        console.error("Erro ao buscar locatários:", error)
      }
    }

    fetchLocatarios()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const valorTotal = calcularValorTotal()

    if (editingReserva) {
      try {
        const response = await api.put(`/reserva/editar/${editingReserva.id}`, {
          ...formData,
          status: editingReserva.status,
          valorTotal,
        });

        const reservaAtualizada: Reserva = response.data;

        setReservas((prev) =>
            prev.map((r) => (r.id === reservaAtualizada.id ? reservaAtualizada : r))
        );
      } catch (error) {
        console.error("Erro ao editar reserva:", error);
      }
    } else {
      const response = await api.post("/reserva/cadastrar", {...formData, status: "Ativa",valorTotal : valorTotal})
      const novoLocatario: Reserva = response.data

      setReservas((prev) => [...prev, novoLocatario])
    }

    setIsDialogOpen(false)
    setEditingReserva(null)
    resetForm()
  }

  const confirmarCancelamento = (reserva: Reserva) => {
    setReservaParaCancelar(reserva);
    setConfirmDialogOpen(true);
  };

  const confirmarFinalizacao = (reserva: Reserva) => {
    setReservaParaFinalizar(reserva);
    setConfimDialogFinishOpen(true);
  };


  const handleCancel = async () => {
    if (!reservaParaCancelar) return;

    try {
      await api.put(`/reserva/cancelar/${reservaParaCancelar.id}`);
      setReservas((prev) =>
          prev.map((r) =>
              r.id === reservaParaCancelar.id ? { ...r, status: "Cancelada" } : r
          )
      );
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
    } finally {
      setConfirmDialogOpen(false);
      setReservaParaCancelar(null);
    }
  };

  const handleFinish = async () => {
    if (!reservaParaFinalizar) return;

    try {
      await api.put(`/reserva/finalizar/${reservaParaFinalizar.id}`);
      setReservas((prev) =>
          prev.map((r) =>
              r.id === reservaParaFinalizar.id ? { ...r, status: "Finalizada" } : r
          )
      );
    } catch (error) {
      console.error("Erro ao Finalizar reserva:", error);
    } finally {
      setConfimDialogFinishOpen(false);
      setReservaParaFinalizar(null);
    }
  };



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
                        {locatarios.map((locatario) => (
                            <SelectItem key={locatario.id} value={locatario.nome}>
                              {locatario.nome}
                            </SelectItem>
                        ))}
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
                        {locadoras.map((locadora) => (
                            <SelectItem key={locadora.id} value={locadora.nome}>
                              {locadora.nome}
                            </SelectItem>
                        ))}
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

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Reserva</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar a reserva de <strong>{reservaParaCancelar?.locatario}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Não
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Sim, Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={confimDialogFinishOpen} onOpenChange={setConfimDialogFinishOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar Reserva</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja finalizar a reserva de <strong>{reservaParaCancelar?.locatario}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfimDialogFinishOpen(false)}>
              Não
            </Button>
            <Button variant="destructive" onClick={handleFinish}>
              Sim, Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


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
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => confirmarCancelamento(reserva)}
                          disabled={reserva.status !== "Ativa"}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>

                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => confirmarFinalizacao(reserva)}
                          disabled={reserva.status !== "Ativa"}
                      >
                        <CheckCircle  className="h-4 w-4" />
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
