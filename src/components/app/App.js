import HeroesList from '../heroesList/HeroesList';
import HeroesSideBar from '../heroesSideBar/HeroesSideBar';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <HeroesSideBar />
            </div>
        </main>
    )
}

export default App;