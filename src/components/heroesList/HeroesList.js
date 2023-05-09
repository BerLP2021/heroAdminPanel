import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, heroRemoved } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';

const HeroesList = () => {
    // const heroes = useSelector(state => state.heroes.heroesList);
    const filtersHeroesSelector = createSelector(
        state => state.filters.activeFilter,
        state => state.heroes.heroesList,
        (filter, heroesList) => filter === 'all' ? heroesList : heroesList.filter(item => item.element === filter)
        );
    const filteredHeroes = useSelector(filtersHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus); 
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        updateList();
        // eslint-disable-next-line
    }, []);

    const updateList = () => {
        console.log('load data');
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    console.log('HeroesList');

    const onRemove = useCallback((id, setHeroRemovingStatus) => {
        // dispatch(heroRemoved(id));

        console.log(`remove ${id}`);
        setHeroRemovingStatus('loading');
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(() => {
                dispatch(heroRemoved(id));
                setHeroRemovingStatus('idle');
            })
            .catch(() => setHeroRemovingStatus('error'))
        // updateList();
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (filteredHeroes) => {
        

        if (filteredHeroes.length === 0) { 
            return <CSSTransition
                timeout={300}
                classNames="item"
            >
                <h5 className="text-center mt-5">Героев пока нет</h5>
            </CSSTransition>
        }
        
        return filteredHeroes.map(({id, ...props}) => {
            return <CSSTransition
                key={id}
                timeout={300}
                classNames="item"
            >
                <HeroesListItem id={id} {...props} onRemove={onRemove}/>
            </CSSTransition>
        })
        
    }

    const elements = renderHeroesList(filteredHeroes, activeFilter);
    
    return (
        <TransitionGroup component='ul'>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;