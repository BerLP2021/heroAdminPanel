import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesAddForm from "../heroesAddForm/HeroesAddForm";
import HeroesFilters from "../heroesFilters/HeroesFilters";
import { filtersFetched, filtersFetching, filtersFetchingError } from '../../actions';

const HeroesSideBar = () => {
  const {request} = useHttp();
  const dispatch = useDispatch();
  
  useEffect(() => {
    getFilters();

    // eslint-disable-next-line
  }, []);

  console.log('HeroesSideBar');
  
  const getFilters = () => {
    console.log("load filters");
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
  };

  return (
    <div className="content__interactive">
      <HeroesAddForm />
      <HeroesFilters />
    </div>
  );
};

export default HeroesSideBar;
