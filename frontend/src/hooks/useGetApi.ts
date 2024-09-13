import axios from "axios";
import { useEffect, useState } from "react";
import { UserType } from "../Types/types";


// const useGetApi = (url: string,dependenciesArray:[],user:UserType | null) => {
  
  const useGetApi = (url: string, dependenciesArray: []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, dependenciesArray);

  // if (user) {
  //   getCustomers();
  //   setLoading(false);
  //   }
  
  return { data, loading, error };
};

export default useGetApi;
