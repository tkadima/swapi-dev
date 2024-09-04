import Document, { Html, Head, Main, NextScript } from 'next/document'

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/fonts/Starjedi.ttf" />
          <link
            href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
