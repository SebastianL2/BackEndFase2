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
  isPublic: z.string(),
  uploader: z.string(), // ID del usuario que subió el vídeo
  year: z.string(),
  links: z.number(),
  director: z.string(),
  duration: z.string(),
  rate: z.string().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.string(),
  url: z.string().optional(),
  videoFile: z.unknown() 
});

export function validateVideo (input) {
  return videoSchema.safeParse(input)
}

export function validatePartialVideo (input) {
  return videoSchema.partial().safeParse(input)
}
