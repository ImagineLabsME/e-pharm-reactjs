import { useEffect, useState } from "react";
import axios from "axios";

const useCities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchCities = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/public/cities.json"
      );

      isMounted && setCities(res.data);
    };

    fetchCities();

    return () => {
      isMounted = false;
    };
  }, []);

  return cities;
};

export default useCities;
