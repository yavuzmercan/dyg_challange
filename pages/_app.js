import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div>
        <Component {...pageProps} />
    </div>
  )
}

export default MyApp
