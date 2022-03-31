import { useState, useEffect } from 'react';
import axios from 'axios';


const useRequest = (url) => {
  const [data, setData] = useState({});
  

  useEffect(() => {
    axios
      .get(url)
      .then((result) => {
        setData(result.data);
      })
      
  }, [url]);

  return { data };
};

export default useRequest;
