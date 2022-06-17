import { QueryClient } from 'react-query';
export * from './userStore';
export * from './customersStore';
export * from './globaStore';
export * from './memberStore';
export * from './alertStore';
export * from './versionStore';

export const queryClient = new QueryClient();
