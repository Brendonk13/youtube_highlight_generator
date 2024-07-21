import usePostYoutubeQuery from '@/hooks/api/usePostYoutubeQuery'
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { defaultYoutubeAnswer, defaultYoutubeQuery, PostYoutubeQueryRequestSchema, PostYoutubeQueryResponse } from '@/types/common'
// import { useState } from 'react'
import React from 'react'


interface YoutubeQueryFormProps {
  // youtubeQuery: string
  setQueryAnswer: React.Dispatch<React.SetStateAction<PostYoutubeQueryResponse[]>>
  currentAnswers: PostYoutubeQueryResponse[]
  // setVideoStates
}

export default function YoutubeQueryForm({setQueryAnswer, currentAnswers} : YoutubeQueryFormProps){
  // const [queryAnswer, setQueryAnswer] = useState(defaultYoutubeAnswer)
  const { mutateAsync: youtubeQueryAnswer } = usePostYoutubeQuery()

  // now need to setup a form to hit the api
  const methods = useForm({
    defaultValues: defaultYoutubeQuery,
    resolver: zodResolver(PostYoutubeQueryRequestSchema),
  })

  const {
    // control,
    handleSubmit,
    formState: { errors, },
    // setValue,
  } = methods

  if (Object.keys(errors).length > 0){
    console.log("YOUTUBEQUERY FORM ERRORS", {errors})
  }

  const onSubmit = async (data: typeof defaultYoutubeQuery) => {
    try {
      console.log("========================= SUBMIT ============================= ", {data})

      const answer = await youtubeQueryAnswer(data.queryText)
      setQueryAnswer([...currentAnswers, answer])
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="queryText" className="block text-sm font-medium text-gray-700">YouTube Query</label>
        <input
          id="queryText"
          name="queryText"
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${errors.queryText ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          {...methods.register("queryText")}
        />
        {errors.queryText && <p className="mt-2 text-sm text-red-600">{errors.queryText.message}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

