import { useEffect, useRef, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  function refetch({ params = {} } = {}) {
	console.log(params)
	params._limit = params._limit ? params._limit - 1 : 0
	setError(false);
	setIsLoading(true);
	setData(null);
	fetch(url)
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
		if (params._limit) refetch({
		  params: {
			_limit: params._limit
		  }
		});
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
