enum Role {
  admin,
  user,
  author,
}
type User = {
  id?: number
  email: string
  username: string
  password: string
  notelp: string
  role: Role
  created_at: Date
  updated_at: Date
}

export default User
