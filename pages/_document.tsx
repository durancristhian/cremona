import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>
        <body className="debug">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
