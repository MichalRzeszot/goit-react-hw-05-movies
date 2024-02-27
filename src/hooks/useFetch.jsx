import axios from 'axios';
import { useEffect, useState } from 'react';
const useFetch = url => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (url) fetchData();
  }, [url]);
  return { data, isLoading, error };
};
export default useFetch;
