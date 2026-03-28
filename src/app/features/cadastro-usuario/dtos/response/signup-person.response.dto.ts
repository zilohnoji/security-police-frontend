export interface SignupPersonResponse {
  id: string;
  profile: {
    name: string;
    birthDate: Date;
    gender: string;
    motherName: string;
    daddyName: string;
  };
  address: {
    patioType: string;
    street: string;
    number: number;
    neighborhood: string;
    city: {
      name: string;
      uf: string;
    };
  };
  scales: [];
}