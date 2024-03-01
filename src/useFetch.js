import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  function refetch(options = {}) {
	setError(false);
	setIsLoading(true);
	setData(null);
	fetch(url, options)
	  .then((response) => {
		return response.json();
	  })
	  .then((data) => {
		setIsLoading(false);
		setData(data);
	  })
	  .catch((error) => {
		setIsLoading(false);
		setError(true);
		setData(null);
	  });
  }

  useEffect(() => {
	refetch();
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
