import { Usuario } from "../model/usuario";

export const usuariosCadastrados: Usuario[] = [
  {
    id: 1,
    nome: "Alice Silva",
    email: "alice.silva@example.com",
  },
  {
    id: 2,
    nome: "Bob Costa",
    email: "bob.costa@example.com",
  },
];

let usuarios: Usuario[] = [...usuariosCadastrados];

export function setUsuarios(newUsuarios: Usuario[]): void {
  usuarios = newUsuarios;
}

export function getUsuarios(): Usuario[] {
  return usuarios;
}

export function getUsuarioById(id: number): Usuario | undefined {
  return usuarios.find((usuario) => usuario.id === id);
}

export function resetUsuarios(): void {
  usuarios = [...usuariosCadastrados];
}

export function clearUsuarios(): void {
  usuarios = [];
}
