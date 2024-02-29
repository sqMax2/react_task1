import { useEffect, useRef, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  function refetch(options = {}) {
	console.log(params)
	params._limit = params._limit ? params._limit - 1 : 0
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
