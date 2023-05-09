import {memo, useEffect, useState} from 'react';
import Spinner from '../spinner/Spinner';

const HeroesListItem = ({id, name, avatar, description, element, onRemove}) => {
    const [heroRemovingStatus, setHeroRemovingStatus] = useState('idle');
    let elementClassName;
    
    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
        }
        
    console.log('HeroesListItem');
    
    const defaultImg = "http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg";
    
    useEffect(() => {
        console.log('rendering ONREMOVE')
    }, [onRemove]);
    
    if (heroRemovingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка удаления героя</h5>
    };
    
    return (
        <li 
            className="card mb-4">
            <div className={`card flex-row shadow-lg text-white ${elementClassName}`}>
                <img src={avatar || defaultImg} 
                    className="img-fluid w-25 d-inline" 
                    alt="unknown hero" 
                    style={{'objectFit': 'cover'}}/>
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text">{description}</p>
                </div>
                <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
                    onClick={() => onRemove(id, setHeroRemovingStatus)}>
                    <button type="button" className="btn-close btn-close" aria-label="Close"></button>
                </span>
            </div>
            <Spinner 
                style={
                    heroRemovingStatus === 'loading' ? 
                        {display:  'block', 
                        position: 'absolute',
                        left: 'calc(50% - 1rem)',
                        top: 'calc(50% - 1rem)',
                        color: 'yellow',
                    } : 
                        {display: 'none'} 
                    }
            />
        </li>
    )
}

export default memo(HeroesListItem);
// export default HeroesListItem;
