export interface User{
  id_usuario: number;
  usuario: string;
  id_rol: number;
  log: string;
  contrasena:string;
  nombre_publico:string;
  email: string;
  token_sesion: string | null;
}
