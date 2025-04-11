import React from 'react'

const CoverLetter = async({params}) => {
    const id = await params.id;
    console.log(id);
    
  return (
    <div>
      <h1>Cover Letter: {id}</h1>
    </div>
  )
}

export default CoverLetter
