import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {addNewHero} from '../../actions';

const HeroesAddForm = () => {
    const filters = useSelector(state => state.filters.filtersList);
    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);
    const {request} = useHttp();
    const dispatch = useDispatch();

    console.log('HeroesAddForm');
    
    const postNewHero = async (hero) => {
        await request("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
            .then(() => dispatch(addNewHero(hero)))
            .catch();
    }

    const renderFilters = (filters, filtersLoadingStatus) => {
        if (filtersLoadingStatus === "error") {
            return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
        } else if (filtersLoadingStatus === "loading") {
            return <option>Загрузка...</option>;
        } else if (!filters || !filters.length > 0) return;
        return (
            <>
                <option >Я владею элементом...</option>
                {filters.map((item, i) => {
                    if(item.value === 'all') return;
                    return <option key={i} value={item.value}>{item.descr}</option>
                })}
            </>
        )
    }

    const handleSubmit = async (values, {resetForm}) => {
        const newHero = {
            ...values,
            id: Math.random().toString(36).substring(2, 9)
        };
        await postNewHero(newHero);
        // alert(`Congratulation!${'\n'}New Hero ${values.name} was created!`);
        resetForm();
    }

    return (
        <Formik
            initialValues={{ name: '', description: '', avatar: '', element: '' }}
            validationSchema={Yup.object({
                name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
                description: Yup.string()
                .max(150, 'Must be 150 characters or less')
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
                avatar: Yup.string(),
                element: Yup.string().oneOf(['water', 'earth', 'fire', 'wind'], 'Required').required('Required'),
            })}
            onSubmit={handleSubmit}
        >
            { ({isSubmitting}) => 
                (<Form className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <Field className="form-control"
                            autoComplete='off'
                            placeholder="Как меня зовут?"
                            name="name"/>
                        <ErrorMessage component="div" className="text-danger mt-2" name="name" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fs-4">Описание</label>
                        <Field as='textarea' className="form-control" 
                            placeholder="Что я умею?"
                            name="description"
                            style={{"height": '130px'}}
                        />
                        <ErrorMessage component="div" className="text-danger mt-2" name="description" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Ссылка на аватарку нового героя</label>
                        <Field className="form-control" 
                            placeholder="Выбери для меня аватарку"
                            name="avatar"
                        />
                        <ErrorMessage component="div" className="text-danger mt-2" name="avatar" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <Field 
                            as='select'
                            className="form-select" 
                            name="element"
                        >
                            {renderFilters(filters, filtersLoadingStatus)}
                        </Field>
                        <ErrorMessage component="div" className="text-danger mt-2" name="element" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${isSubmitting ? 'disabled' : null}`}>Создать</button>
                </Form>
            )}

        </Formik>
    )
}

export default HeroesAddForm;