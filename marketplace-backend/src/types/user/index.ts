interface UserCreate {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  email: string;
  password: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
}

export type { User, UserCreate };
