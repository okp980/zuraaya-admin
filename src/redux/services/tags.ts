import { API_ENPOINTS } from "@/utils/endpoints"
import { apiSlice } from "../apiSlice"
import {
  PaginatedTagResponse,
  PaginationParams,
  TagResponse,
  TagType,
} from "@/utils/types"
import { PRODUCT_TAG } from "@/utils/tagsTypes"

const tagApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<PaginatedTagResponse, PaginationParams | void>({
      query: (params) => ({
        url: API_ENPOINTS.tags,
        params,
      }),
      //   @ts-ignore
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: PRODUCT_TAG, id })),
              PRODUCT_TAG,
            ]
          : [PRODUCT_TAG],
    }),
    createTag: build.mutation<TagResponse, TagType>({
      query: ({ category, ...body }) => ({
        url: `${API_ENPOINTS.categories}/${category}/tags`,
        method: "POST",
        body,
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
    editTag: build.mutation<TagResponse, Partial<TagType>>({
      query: ({ category, ...body }) => ({
        url: `${API_ENPOINTS.tags}/${category}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: PRODUCT_TAG, id: arg.category },
      ],
    }),
    deleteTag: build.mutation<TagResponse, Partial<TagType>>({
      query: ({ category, ...body }) => ({
        url: `${API_ENPOINTS.tags}/${category}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
  }),
})

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useEditTagMutation,
  useDeleteTagMutation,
} = tagApi
