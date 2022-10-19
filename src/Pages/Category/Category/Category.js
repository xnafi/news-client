import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsCard from '../../Shared/NewsCard/NewsCard';

const Category = () => {
    const catagory = useLoaderData()
    return (
        <>
            <h2 className='mb-5'> This catagory has {catagory.length} News </h2>
            {
                catagory.map(news => <NewsCard key={news._id} news={news} />)
            }
        </>

    );
};

export default Category;