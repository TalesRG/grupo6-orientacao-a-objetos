"use client"

import React, {useEffect} from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
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
import { Plus, Edit, Eye, MapPin } from "lucide-react"
import api from "@/lib/api";

interface Locatario {
  id: number
  nome: string
  email?: string
  telefone?: string
  tipo?: "PF" | "PJ"
  documento?: string
  endereco?: string
  status?: "Ativo" | "Inativo"
}

export default function LocatariosManager() {
  const [locatarios, setLocatarios] = useState<Locatario[]>([])

  useEffect(() => {
    const fetchLocatarios = async () => {
      try {
        const response = await api.get("/locatario/listar") // ajuste conforme sua rota real
        setLocatarios(response.data)
      } catch (error) {
        console.error("Erro ao buscar locatários:", error)
      }
    }

    fetchLocatarios()
  }, [])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLocatario, setEditingLocatario] = useState<Locatario | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipo: "PF" as "PF" | "PJ",
    documento: "",
    endereco: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingLocatario) {
      // Atualizar locatário existente
      setLocatarios((prev) =>
        prev.map((loc) => (loc.id === editingLocatario.id ? { ...loc, ...formData, status: "Ativo" as const } : loc)),
      )
    } else {
      // Criar novo locatário - US01
      const response = await api.post("/locatario/cadastrar", {...formData, status: "Ativo"})
      const novoLocatario: Locatario = response.data

      setLocatarios((prev) => [...prev, novoLocatario])
    }

    setIsDialogOpen(false)
    setEditingLocatario(null)
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      tipo: "PF",
      documento: "",
      endereco: "",
    })
  }

  const openEditDialog = (locatario: Locatario) => {
    setEditingLocatario(locatario)
    setFormData({
      nome: locatario.nome,
      email: locatario.email || "",
      telefone: locatario.telefone || "",
      tipo: locatario.tipo || "PF",
      documento: locatario.documento || "",
      endereco: locatario.endereco || "",
    })
    setIsDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingLocatario(null)
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      tipo: "PF",
      documento: "",
      endereco: "",
    })
    setIsDialogOpen(true)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <h2 className="text-xl font-semibold">Locatários</h2>
        <Button onClick={openNewDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Locatário
        </Button>
      </CardHeader>
      <CardContent>
        {locatarios.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhum locatário cadastrado.</p>
        ) : (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locatarios.map((locatario) => (
                <TableRow key={locatario.id}>
                  <TableCell className="font-medium">{locatario.nome}</TableCell>
                  <TableCell>
                    <Badge variant={locatario.tipo === "PF" ? "default" : "secondary"}>{locatario.tipo}</Badge>
                  </TableCell>
                  <TableCell>{locatario.documento}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{locatario.email}</div>
                      <div className="text-muted-foreground">{locatario.telefone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={locatario.status === "Ativo" ? "default" : "secondary"}>{locatario.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(locatario)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {locatario.endereco && (
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>{/* Trigger button is handled above */}</DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingLocatario ? "Editar Locatário" : "Cadastrar Locatário"}</DialogTitle>
              <DialogDescription>
                {editingLocatario
                  ? "Atualize os dados do locatário"
                  : "Preencha os dados para cadastrar um novo locatário"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome/Razão Social</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value: "PF" | "PJ") => setFormData({ ...formData, tipo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PF">Pessoa Física</SelectItem>
                        <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="documento">{formData.tipo === "PF" ? "CPF" : "CNPJ"}</Label>
                    <Input
                      id="documento"
                      value={formData.documento}
                      onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                      placeholder={formData.tipo === "PF" ? "000.000.000-00" : "00.000.000/0000-00"}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(00) 00000-0000"
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
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    placeholder="Rua, número - Cidade/Estado"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingLocatario ? "Atualizar" : "Cadastrar"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
