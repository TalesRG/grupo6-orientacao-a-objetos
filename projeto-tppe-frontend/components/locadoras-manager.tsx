"use client"

import React, {useEffect} from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {Plus, Edit, MapPin, DeleteIcon, Trash} from "lucide-react"
import api from "@/lib/api";

export interface Locadora {
  id: number
  nome: string
  cnpj: string
  email: string
  telefone: string
  endereco: string
  status: "Ativa" | "Inativa"
}

export default function LocadorasManager() {
  const [locadoras, setLocadoras] = useState<Locadora[]>([])

  useEffect(() => {
    const fetchLocatarios = async () => {
      try {
        const response = await api.get("/locadora/listar") // ajuste conforme sua rota real
        setLocadoras(response.data)
      } catch (error) {
        console.error("Erro ao buscar locatários:", error)
      }
    }

    fetchLocatarios()
  }, [])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLocadora, setEditingLocadora] = useState<Locadora | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingLocadora) {
      // Atualizar locadora existente - US10
      setLocadoras((prev) =>
        prev.map((loc) => (loc.id === editingLocadora.id ? { ...loc, ...formData, status: "Ativa" as const } : loc)),
      )
    } else {
      const response = await api.post("/locadora/cadastrar", {...formData, status: "Ativo"})
      const novoLocatario: Locadora = response.data

      setLocadoras((prev) => [...prev, novoLocatario])
    }

    setIsDialogOpen(false)
    setEditingLocadora(null)
    setFormData({
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
      endereco: "",
    })
  }

  const  deleteLocadora = async (id: number) => {
    try {
      await api.delete(`/locadora/delete/${id}`)
      setLocadoras((prev) => prev.filter((loc) => loc.id !== id))
    } catch (error) {
      console.error("Erro ao excluir locadora:", error)
    }
  }

  const openEditDialog = (locadora: Locadora) => {
    setEditingLocadora(locadora)
    setFormData({
      nome: locadora.nome,
      cnpj: locadora.cnpj,
      email: locadora.email,
      telefone: locadora.telefone,
      endereco: locadora.endereco,
    })
    setIsDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingLocadora(null)
    setFormData({
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
      endereco: "",
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Locadoras</h2>
          <p className="text-muted-foreground">Gerencie as locadoras parceiras</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Locadora
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingLocadora ? "Editar Locadora" : "Cadastrar Locadora"}</DialogTitle>
              <DialogDescription>
                {editingLocadora
                  ? "Atualize os dados da locadora"
                  : "Preencha os dados para cadastrar uma nova locadora"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Locadora</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                      placeholder="00.000.000/0000-00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(00) 0000-0000"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    placeholder="Rua, número - Cidade/Estado - CEP"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingLocadora ? "Atualizar" : "Cadastrar"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Locadoras</CardTitle>
          <CardDescription>Visualize e gerencie todas as locadoras cadastradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locadoras.map((locadora) => (
                <TableRow key={locadora.id}>
                  <TableCell className="font-medium">{locadora.nome}</TableCell>
                  <TableCell>{locadora.cnpj}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{locadora.email}</div>
                      <div className="text-muted-foreground">{locadora.telefone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{locadora.endereco}</TableCell>
                  <TableCell>
                    <Badge variant={locadora.status === "Ativa" ? "default" : "secondary"}>{locadora.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(locadora)}>
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => deleteLocadora(locadora.id)}>
                        <Trash className="h-4 w-4" />
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
