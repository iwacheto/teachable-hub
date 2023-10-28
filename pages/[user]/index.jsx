import React, { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import Style from '../scss/user.module.scss';
import Input from '../../components/form-elements/input/Input';
import Button from '../../components/form-elements/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachables } from '../../store/teachable/teachableSlice';
import Loader from '../../components/loader/Loader';
import TeachableItem from '../../components/teachable-item/TeachableItem';
import Pagination from '../../components/pagination/Pagination';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isBrowser = typeof window !== "undefined";
    const { data, loading, pages } = useSelector(state => state.teachable);
    const [page, setPage] = useState(1);
    console.log(pages);

    useEffect(() => {
        let defaultPage = 1
        if (isBrowser) {
            const params = new URLSearchParams(window.location.search);
            if (params && params.has("page")) defaultPage = params.get('page');
            paginateData(+defaultPage);
        }
    }, []);

    const onChangeHandler = () => {}

    const createTeachable = () => {}

    const paginateData = value => {
        setPage(value)
        dispatch(fetchTeachables(value));;
    }

    const changePageHandler = (value) => {
        router.replace({
            query: { ...router.query, page: value },
        });
        paginateData(value);
    }

    return <Layout>
        <section className={Style.container}>
            {!loading ?
                <>
                    <div className={Style.search}>
                        <Input
                            id="search"
                            type="text"
                            isDownLabel={true}
                            placeholder="search for a teachable by typing in a topic and pressing enter"
                            label="Topic must start with а-z."
                            onChange={onChangeHandler.bind(this, 'search')}
                        />
                    </div>

                    <div className={Style.header}>
                        <h1>Teachables</h1>
                        <div>
                            <Button
                                styleClass="primary-button"
                                onClick={createTeachable}
                            >
                                Create Teachable
                            </Button>
                        </div>
                    </div>

                    {data.map((item, index) => <TeachableItem key={index} data={item} />)}

                    <Pagination
                        pages={pages}
                        curentPage={page}
                        changePage={(val) => changePageHandler(val)}
                    />
                </>
                :
                <Loader />}
        </section>
    </Layout>
}

export default Index;