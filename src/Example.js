import React, {useCallback, useState } from 'react'
import Children from './Children'




const Example = () => {

    const Somthing = useCallback(() => {
        // something
    },[]) 

    // const Memo = useMemo()s
    const [plus,setPlus] = useState(0)
  return (
    <div style={{margin:"200px"}}>
     <Children Somthing ={Somthing}/>
        <button onClick={() => setPlus(plus+1)}>plus</button>
        <span>{plus}</span><br/>


    </div>
  )
}

export default Example