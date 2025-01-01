import { useEffect, useState } from "react"

const useFetch  = (url, initialData) => {
    const [data, setData] = useState(initialData)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        setIsPending(true);
        const fetchIt = async () => {
          try {
            const response = await fetch("/E-comDep/db.json");
            const resData = await response.json();
            console.log("Fetched data:", resData); // Log the response here
            setData(resData);
          } catch (err) {
            setError(err || "Something went wrong. Please try again later.");
          } finally {
            setIsPending(false);
          }
        };
        fetchIt();
      }, [url]);

    return {data, error, isPending}
}

export default useFetch;