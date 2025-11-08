export interface Login {
  code: string;
  error: boolean;
  message: string;
  data: Array<{
    iduser: number;
    nama: string;
    nmlevel: string;
    token: string;
  }>;
}
