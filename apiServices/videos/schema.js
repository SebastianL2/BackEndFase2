import z from 'zod'

const videoSchema = z.object({
  title: z.string({
    invalid_type_error: 'Video title must be a string',
    required_error: 'Video title is required.'
  }),
  description: z.string({
    invalid_type_error: 'Video description must be a string',
    required_error: 'Video description is required.'
  }),
  credits: z.string({
    invalid_type_error: 'Video credits must be a string',
    required_error: 'Video credits are required.'
  }),
  publicationDate: z.string({
    invalid_type_error: 'Publication date must be a string',
    required_error: 'Publication date is required.'
  }),
  isPublic: z.boolean().default(false),
  uploader: z.string(), // ID del usuario que subió el vídeo
  comments: z.array(z.string()), // Array de IDs de comentarios
  likes: z.array(z.string()), // Array de IDs de usuarios que dieron like
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Video genre is required.',
      invalid_type_error: 'Video genre must be an array of enum Genre'
    }
  )
})

export function validateVideo (input) {
  return videoSchema.safeParse(input)
}

export function validatePartialVideo (input) {
  return videoSchema.partial().safeParse(input)
}