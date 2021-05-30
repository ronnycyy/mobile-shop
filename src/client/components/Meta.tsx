import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }: { title: string, description: string, keywords: string }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: '欢迎来到手机商城 ｜ 主页',
  description: '购好物，上手机商城!',
  keywords: '电商、手机、便宜手机'
}

export default Meta
