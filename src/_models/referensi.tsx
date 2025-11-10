export interface Jns {
  code: string;
  error: boolean;
  message: string;
  data: Array<{
    kdjns: string;
    nmjns: string;
    uang: number;
  }>;
}
