import bcrypt from 'bcrypt';
import { Query } from 'mongoose';
import { IError } from '../shared/IError';
const saltRounds = 10;
import { IUsuario, Usuario } from "./usuario.schema";

export const getUsuarios = (): Query<IUsuario[], IUsuario, {}> => {
    return Usuario.find().select(['-contrasenia'])
  };
  
export const createUsuario = async (email: string, password: string, rol: string, isActive: boolean): Promise<IUsuario | null> => {
    try {
      const newUsuario = new Usuario({ 
        email,
        rol,
        isActive,
      });
      newUsuario.password = await bcrypt.hash(password, saltRounds);
      return newUsuario.save();
    } catch (error) {
      return null;
    }
  };

export const updateUsuario = async (idUsuario: string, {password, rol, isActive}: { password: string, rol: string, isActive: boolean }): Promise<IUsuario | null> => {
    try {
        const usuario = await Usuario.findById(idUsuario);
        if (usuario) {
          if(password && password !== '') 
            usuario.password = await bcrypt.hash(password, saltRounds);
          if(rol)
              usuario.rol = rol;
          if(isActive !== undefined){
              usuario.isActive = isActive;
              }
          delete usuario.__v;
          usuario.save();
        }
        return usuario;
    } catch (error) {
        return null;
    }
  };

export const changePassword = async (idUsuario: string, lastPass: string, newPass: string): Promise<IUsuario | IError | null> => {
  try {
    let result = null;
    const usuario = await Usuario.findById(idUsuario);
    if (usuario) {
      const lastPasswordOk = await bcrypt.compare(lastPass, usuario.password);
      if (lastPasswordOk) {
        usuario.password = await bcrypt.hash(newPass, saltRounds);
        delete usuario.__v;
        await usuario.save();
        result = usuario;
      } else {
        result = { title: 'Error', message: 'La última contraseña es incorrecta.' }
      }
    } else {
      result = { title: 'Error', message: 'Usuario no encontrado.' }
    }
    return result;
  } catch (error) {
      return null;
  }
}

export const deleteUsuario = (idUsuario: string): Query<IUsuario | null, IUsuario, {}> => {
    return Usuario.findByIdAndDelete(idUsuario);
  };