import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function UserId(props) {
    console.log('props', props)
    const { isFallback } = useRouter()

    if(isFallback){
        return (
            <h2>Carregando...</h2>
        )
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Teste {props.x} </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Bem vindo ao users {props.x}
                </h1>
            </main>
        </div>
    )
}


export const getStaticPaths = () => {
    return {
        paths: [
            { params: { id: '1' } }
        ],
        fallback: true // See the "fallback" section below
    };
}
export const getStaticProps = async ({ params }) => {

    console.log('####', params)
    return {
        props: {
            x: params.id
        },
    }
}