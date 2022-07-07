import { useQueryClient } from 'react-query';
import { QueryFunction } from 'react-query/types/core/types';
import { AxiosError } from 'axios';

type KeyType = 'companies-table' | string | readonly unknown[];

export function useFetchQuery<T, D>(type: KeyType) {
  const queryClient = useQueryClient();

  return {
    data: queryClient.getQueryData<T>(type),
    fetch(handler: QueryFunction<D>) {
      return queryClient.fetchQuery<D, AxiosError, T>(type, handler);
    },
    isSuccess: queryClient.getQueryState(type)?.status === 'success',
    setNewValue(updateData: T) {
      return queryClient.setQueryData<T>(type, updateData);
    },
    update() {
      return queryClient.fetchQuery(type);
    },
    refetch() {
      return queryClient.prefetchQuery(type);
    },
  };
}

export function useQC() {
  const queryClient = useQueryClient();

  return {
    queryClient,
    data<T>(key: KeyType): T | undefined {
      return queryClient.getQueryData<T>(key);
    },
    fetch<D, T>(key: KeyType, handler: QueryFunction<D>) {
      return queryClient.fetchQuery<D, AxiosError, T>(key, handler);
    },
    isSuccess(key: KeyType): boolean {
      return queryClient.getQueryState(key)?.status === 'success';
    },
    setNewValue<T>(key: KeyType, updateData: T) {
      return queryClient.setQueryData<T>(key, updateData);
    },
  };
}
