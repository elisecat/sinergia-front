import { Departamentos } from './departamentos';
import { Municipios } from './municipios';
import { TipoId } from './TipoId';
import { Genero } from './genero';



export interface Pacientes {
    id: number;
    tipo_documento: TipoId;
    numero_documento: number;
    nombre1: string;
    nombre2: any;
    apellido1: string;
    apellido2: any;
    genero: Genero;
    municipio: Municipios;
    departamento: Departamentos;
    message:string;
    success:any;

}
