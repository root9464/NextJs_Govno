import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usePosts = (id: string) =>
  useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, status, statusText } = await axios.get(`http://localhost:3000/api/user?${id}`);
      if (status !== 200) throw new Error(statusText);

      return data;
    },

    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 1000 * 60,
  });
