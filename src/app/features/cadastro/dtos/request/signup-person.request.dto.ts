export interface SignupPersonRequest {
  profile: {
    full_name: string;
    birth_date: string;
    gender: string;
    mother_name: string;
    father_name: string;
  };
  address: {
    street_type: string;
    street: string;
    number: number;
    neighborhood: string;
    city: {
      name: string;
      uf: string;
    };
  };
}