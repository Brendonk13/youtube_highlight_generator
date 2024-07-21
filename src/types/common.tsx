import z from 'zod'

export type AnyObject = { [key: string]: any };


export const postYoutubeQueryResponseObject = {
  videoId: z.string(),
  startTime: z.number(),
  endTime: z.number(),
}

export const postYoutubeQueryRequestObject = {
  queryText: z.string()
}

export const PostYoutubeQueryRequestSchema = z.object(postYoutubeQueryRequestObject)
export const PostYoutubeQueryResponseSchema = z.object(postYoutubeQueryResponseObject)
export type PostYoutubeQueryResponse = z.infer<typeof PostYoutubeQueryResponseSchema>
export type PostYoutubeQueryRequest = z.infer<typeof PostYoutubeQueryRequestSchema>

export const defaultYoutubeQuery = {
  queryText: ""
}

export const defaultYoutubeAnswer = {
  videoId: "",
  startTime: 0,
  endTime: 0,
}
