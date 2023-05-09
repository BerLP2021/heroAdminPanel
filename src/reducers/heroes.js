const initialState = {
    heroesList: [],
    heroesLoadingStatus: 'idle',
    heroRemovingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            console.log('hello from dispatch')
            return {
                ...state,
                heroesList: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_REMOVED':
            return {
                ...state,
                heroesList: state.heroesList.filter(item => item.id !== action.payload),
                // heroRemovingStatus: 'idle'
            }
        case 'ADD_NEWHERO':
            return {
                ...state,
                heroesList: [...state.heroesList, action.payload]
            }
        default: return state
    }
}

export default heroes;

