import { useState } from "react";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios, { AxiosError, Method } from "axios";
interface ApiResponse<T> {
    results: T[];
    info?: {
      page: number;
      results: number;
      seed: string;
      version: string;
    };
}
interface UseRequestParams<T> {
  url: string;
  method: Method;
  body?: T;
  onSuccess?: (value: ApiResponse<T>) => void;
}

interface RequestError {
  message: string;
}

interface UseRequestReturnType<T> {
  requestErrors: RequestError[] | null;
  sendRequest: (params: UseRequestParams<T>) => Promise<ApiResponse<T>>;
  isLoading: boolean;
}

interface AxiosErrorResponse {
  errors: RequestError[];
}

export default function useRequest<T>(): UseRequestReturnType<T> {
  const [requestErrors, setRequestErrors] = useState<RequestError[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<T>,
    AxiosError<AxiosErrorResponse>,
    UseRequestParams<T>
  >({
    mutationFn: async ({ url, method, body }: UseRequestParams<T>) => {
      const response = await axios<ApiResponse<T>>({
        url,
        method,
        data: body,
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      if (variables?.onSuccess) {
        variables.onSuccess(data);
      }
      queryClient.invalidateQueries();
    },
    onError: (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response?.data.errors) {
        setRequestErrors(error.response.data.errors);
      } else {
        setRequestErrors([{ message: "Some Error Occurred" }]);
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const sendRequest = async (
    params: UseRequestParams<T>
  ): Promise<ApiResponse<T>> => {
    setRequestErrors(null);
    setIsLoading(true);
    const result = await mutation.mutateAsync(params);
    setIsLoading(false);
    return result;
  };

  return { requestErrors, sendRequest, isLoading };
}