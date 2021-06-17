import React from 'react'
import { useGetStaticProps, useGetStaticPaths } from 'next-slicezone/hooks'
import { Client } from '../../prismic'
import { Document } from 'prismic-javascript/types/documents'
import { RichText } from 'prismic-reactjs'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

const Movie = ({ data }: Document) => {
    const router = useRouter();
    if (router.isFallback) {
        return <h2>
            Cargando pelicula...
        </h2>
    }
    return (
        <div>
            <Head>
                <title>{data.meta_title}</title>
            </Head>
            <RichText render={data.title} />
            <RichText render={data.synopsis} />
            <strong>{data.year}</strong>
        </div>
    )
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getStaticPaths = useGetStaticPaths({
    client: Client(),
    type: 'movie',
    formatPath: ({ uid }: Document) => ({ params: { uid } }),
    fallback: true
})

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getStaticProps = useGetStaticProps({
    client: Client(),
    type: 'movie',
    uid: ({ params }: any) => params.uid,
    apiParams({ params }: any) {
        return {
            uid: params.uid,
        }
    },
    getStaticPropsParams: {
        revalidate: 5,
    }
});

export default Movie;