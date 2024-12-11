export type Login = {
  email: string;
  password: string;
};

export type RegisterInv = {
  email: string;
  password: string;
<<<<<<< HEAD
  bank_name: any;
  account_number: any;
=======
  bank_name: string | null;
  account_number: string | null;
>>>>>>> e50e5e5b40025e073bd15ddc131e74d85f69fc14
  username: string;
  description: string;
  location: string;
  type: string;
};

export type RegisterUmkm = {
  email: string;
  password: string;
  bank_name: any;
  account_number: any;
  umkm_name: string;
  owner_name: string;
  description: string;
  business_scale: string;
  business_type: string;
  employees_number: number;
  founded_year: number;
  location: string;
};
