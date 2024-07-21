import { CreateApiService } from './Service'
import { type PostYoutubeQueryResponse } from '@/types/common'
// import { type AnyObject } from '@/types/common'

export const YoutubeQueryService = CreateApiService({
  baseURL: '/api/youtubequery',
})

// todo: change type
export const postYoutubeQuery = async (youtubeQuery: string) => {
  // todo: check, improve
  if (!youtubeQuery){
    return {} as PostYoutubeQueryResponse
  }
  const response = await YoutubeQueryService.post<PostYoutubeQueryResponse>(``, {queryText: youtubeQuery})
  return response.data
}

   // YoutubeQueryService.post<PostYoutubeQueryResponse>(``, youtubeQuery).then(res => res.data)
      // return ProjectsService.post<CreateProjectResponse>(``, data).then(res => res.data)

// export const postQuery = (data: AnyObject) => QueryService.get<string>

export const youtubeQueryKeys = {
  POST: "PostQuery"
}

