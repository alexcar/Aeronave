import { Aeronave } from './aeronave';

export interface Resultado {
    erro: boolean;
    mensagemErro: string;
    dados: Aeronave[];
}
