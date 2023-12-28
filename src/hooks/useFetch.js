import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDate() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (error) {
        setData([]);
        //! toast.error(err?.message) =>>install react-hot-toast
      } finally {
        setIsLoading(false);
      }
    }
    fetchDate();
  }, [query, url]);

  return { isLoading, setIsLoading, data, setData };
}

export default useFetch;
