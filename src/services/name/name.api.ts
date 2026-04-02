import { productsNameService } from "./name.service"
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ParamId, ResponseError } from "src/services/shared"

const useGetProductsNameQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productsNameService.get(params),
		queryKey: ["products name", ...Object.values(params)],
		placeholderData: keepPreviousData,
		throwOnError: (error: ResponseError) => {
			message.error({
				message: error?.message,
				description: error?.response?.data?.message
			})
			throw error
		}
	})
}

const useGetProductsNameByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productsNameService.getById(id),
		queryKey: ["products name", id],
		placeholderData: keepPreviousData,
		enabled: !!id,
		throwOnError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
			throw error
		}
	})
}

const useCreateProductsNameMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: productsNameService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products name"]
			})
			message.success({
				message: "Success",
				description: "Product name created successfully"
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
		}
	})
}

const useEditProductsNameMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: productsNameService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products name"]
			})
			message.success({
				message: "Success",
				description: "Product name updated successfully"
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
		}
	})
}

const useDeleteProductsNameMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: productsNameService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products name"]
			})
			message.success({
				message: "Success",
				description: "Product name deleted successfully"
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
		}
	})
}

export {
	useGetProductsNameQuery,
	useGetProductsNameByIdQuery,
	useCreateProductsNameMutation,
	useEditProductsNameMutation,
	useDeleteProductsNameMutation
}
