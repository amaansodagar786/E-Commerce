import React, {memo } from 'react'

const Children = ({Somthing}) => {

    console.log("child")
  return (
    <div></div>
  )
}

export default memo(Children)