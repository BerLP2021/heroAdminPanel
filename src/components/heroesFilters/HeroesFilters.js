import { useDispatch, useSelector } from "react-redux";

import Spinner from '../spinner/Spinner';
import { activeFilterChanged } from "../../actions";

const HeroesFilters = () => {
    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);
    const filters = useSelector(state => state.filters.filtersList);
    const activeFilter = useSelector(state => state.filters.activeFilter);

    console.log('HeroesFilters ', activeFilter);

    const dispatch = useDispatch();
    
    const clazz = (element) => {
        switch (element) {
            case 'fire':
                return 'btn btn-danger';
            case 'water':
                return 'btn btn-primary';
            case 'wind':
                return 'btn btn-success';
            case 'earth':
                return 'btn btn-secondary';
            default:
                return 'btn btn-outline-dark';
        }
    }

    const handleFilterChange = (value) => {
        dispatch(activeFilterChanged(value));
    };

    const renderButtons = (filters, filtersLoadingStatus) => {

        if (filtersLoadingStatus === "loading") {
            return <Spinner/>;
        } else if (filtersLoadingStatus === "error") {
            return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
        } else if (!filters || !filters.length > 0) return;
         
        return <div className="btn-group">
            {filters.map(item => {
                const className = item.value === activeFilter ? clazz(item.value) + ' active' : clazz(item.value);
                return <button 
                            key={item.value} 
                            className={className}
                            onClick={() => handleFilterChange(item.value)}
                            >{item.descr}</button>
            })}
        </div>
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body d-flex flex-column ">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                    {
                        renderButtons(filters, filtersLoadingStatus)
                    }
            </div>
        </div>
    )
}

export default HeroesFilters;