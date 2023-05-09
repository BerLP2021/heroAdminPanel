export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroRemoved = (id) => {
    return {
        type: 'HERO_REMOVED',
        payload: id
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (activeFilter) => {
    return {
        type: 'CHANGE_ACTIVE_FILTER',
        payload: activeFilter
    }
}

export const addNewHero = (newHero) => {
    return {
        type: 'ADD_NEWHERO',
        payload: newHero
    }
}