import { NextComponentType } from 'next'
import Head from 'next/head'

//heading and about of company
const Meta: NextComponentType = ({ title, keywords, description }: any ) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'ShoppingApp',
  keywords: 'Order in a one click',
  description: 'Buy products within few minutes',
}

export default Meta