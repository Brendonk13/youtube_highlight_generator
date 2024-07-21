// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { postYoutubeQuery, youtubeQueryKeys } from '@/api/YoutubeQueryService'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

export default function usePostYoutubeQuery(){
  const { openSnackbar } = useSnackbarContext()
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postYoutubeQuery,

    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({queryKey: [youtubeQueryKeys.POST]})
    //   openSnackbar({
    //     message: 'YouTube Query successfully ran',
    //     type: 'success',
    //   })
    // },

    onError: () => {
      openSnackbar({
        message: 'Error: Could not make YouTube query',
        type: 'error',
      })
    },
  })

}

