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
import { Plus, Edit, Link } from "lucide-react"

interface Pessoa {
  id: number
  nome: string
  tipo: "PF" | "PJ"
  documento: string
  email: string
  telefone: string
  endereco: string
  vinculadoA?: string
  status: "Ativo" | "Inativo"
}

export default function PessoasManager() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([
    {
      id: 1,
      nome: "Maria Santos",
      tipo: "PF",
      documento: "987.654.321-00",
      email: "maria@email.com",
      telefone: "(11) 99999-8888",
      endereco: "Rua C, 789 - São Paulo/SP",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Tech Solutions Ltda",
      tipo: "PJ",
      documento: "11.222.333/0001-44",
      email: "contato@techsolutions.com",
      telefone: "(11) 77777-7777",
      endereco: "Av. D, 321 - São Paulo/SP",
      vinculadoA: "João Silva",
      status: "Ativo",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVinculoDialogOpen, setIsVinculoDialogOpen] = useState(false)
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null)
  const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "PF" as "PF" | "PJ",
    documento: "",
    email: "",
    telefone: "",
    endereco: "",
  })
  const [vinculoData, setVinculoData] = useState({
    locatario: "",
    pessoa: "",
  })

  const locatarios = ["João Silva", "Empresa XYZ Ltda"] // Simulação dos locatários cadastrados

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPessoa) {
      // Atualizar pessoa existente - US05
      setPessoas((prev) =>
        prev.map((pessoa) =>
          pessoa.id === editingPessoa.id ? { ...pessoa, ...formData, status: "Ativo" as const } : pessoa,
        ),
      )
    } else {
      // Criar nova pessoa
      const newPessoa: Pessoa = {
        id: Date.now(),
        ...formData,
        status: "Ativo",
      }
      setPessoas((prev) => [...prev, newPessoa])
    }

    setIsDialogOpen(false)
    setEditingPessoa(null)
    resetForm()
  }

  const handleVinculoSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Vincular pessoa a locatário - US08
    if (selectedPessoa && vinculoData.locatario) {
      setPessoas((prev) =>
        prev.map((pessoa) =>
          pessoa.id === selectedPessoa.id ? { ...pessoa, vinculadoA: vinculoData.locatario } : pessoa,
        ),
      )
    }

    setIsVinculoDialogOpen(false)
    setSelectedPessoa(null)
    setVinculoData({ locatario: "", pessoa: "" })
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      tipo: "PF",
      documento: "",
      email: "",
      telefone: "",
      endereco: "",
    })
  }

  const openEditDialog = (pessoa: Pessoa) => {
    setEditingPessoa(pessoa)
    setFormData({
      nome: pessoa.nome,
      tipo: pessoa.tipo,
      documento: pessoa.documento,
      email: pessoa.email,
      telefone: pessoa.telefone,
      endereco: pessoa.endereco,
    })
    setIsDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingPessoa(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const openVinculoDialog = (pessoa: Pessoa) => {
    setSelectedPessoa(pessoa)
    setVinculoData({ locatario: pessoa.vinculadoA || "", pessoa: pessoa.nome })
    setIsVinculoDialogOpen(true)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Pessoas</h2>
          <p className="text-muted-foreground">Gerencie pessoas físicas e jurídicas do sistema</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Pessoa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingPessoa ? "Editar Pessoa" : "Cadastrar Pessoa"}</DialogTitle>
              <DialogDescription>
                {editingPessoa ? "Atualize os dados da pessoa" : "Preencha os dados para cadastrar uma nova pessoa"}
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
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingPessoa ? "Atualizar" : "Cadastrar"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dialog para vincular pessoa a locatário */}
      <Dialog open={isVinculoDialogOpen} onOpenChange={setIsVinculoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vincular Pessoa a Locatário</DialogTitle>
            <DialogDescription>Vincule {selectedPessoa?.nome} a um locatário cadastrado - US08</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVinculoSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="locatario">Locatário</Label>
                <Select
                  value={vinculoData.locatario}
                  onValueChange={(value) => setVinculoData({ ...vinculoData, locatario: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um locatário" />
                  </SelectTrigger>
                  <SelectContent>
                    {locatarios.map((locatario) => (
                      <SelectItem key={locatario} value={locatario}>
                        {locatario}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsVinculoDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Vincular</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pessoas</CardTitle>
          <CardDescription>Visualize e gerencie todas as pessoas cadastradas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Vinculado a</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pessoas.map((pessoa) => (
                <TableRow key={pessoa.id}>
                  <TableCell className="font-medium">{pessoa.nome}</TableCell>
                  <TableCell>
                    <Badge variant={pessoa.tipo === "PF" ? "default" : "secondary"}>{pessoa.tipo}</Badge>
                  </TableCell>
                  <TableCell>{pessoa.documento}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{pessoa.email}</div>
                      <div className="text-muted-foreground">{pessoa.telefone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {pessoa.vinculadoA ? (
                      <Badge variant="outline">{pessoa.vinculadoA}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Não vinculado</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={pessoa.status === "Ativo" ? "default" : "secondary"}>{pessoa.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(pessoa)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openVinculoDialog(pessoa)}>
                        <Link className="h-4 w-4" />
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
