import z from 'zod'

const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required.'
  }),
  email: z.string().email({
    message: 'Invalid email format',
    required_error: 'Email is required.'
  }),
  password: z.string({
    required_error: 'Password is required.'
  }).min(4, {
    message: 'Password must be at least 4 characters long'
  }).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/, {
    message: 'Password must contain at least one uppercase letter and one special character (!@#$%^&*)'
  }),
  registeredAt: z.string({
    invalid_type_error: 'Registration date must be a string',
    required_error: 'Registration date is required.'
  }),
  role: z.enum(['user', 'admin']).default('user')
});


export function validateUser (input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}