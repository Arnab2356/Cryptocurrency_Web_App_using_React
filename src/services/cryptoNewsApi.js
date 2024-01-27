import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '75c075bfcamsh9d1918aedb21dcfp1c5396jsn30b4af52d44a',
    // 'X-RapidAPI-Key': '1b3a617935msh96dc627f268f94fp14bdebjsn5053de2df0bd',
    'X-RapidAPI-Host': 'google-news-api1.p.rapidapi.com'
}

const baseUrl = 'https://google-news-api1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders})
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: ({newsCategory,count}) => createRequest(`/search?language=EN&q=${newsCategory}&limit=${count}`),
        })
    })
});

export const{
    useGetCryptosNewsQuery,
} = cryptoNewsApi;