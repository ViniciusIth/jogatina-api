import { Role } from "src/enums/role.enum";

export interface UserDetails {
  id: string,
  username: string,
  fullname: string,
  birthdate: Date,
  email: string,
  roles: Role[]
}
