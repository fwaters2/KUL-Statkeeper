import React, {useRef} from 'react'

export default function Timer(props) {
//const {clockState, timeStarted} = props
const [count, setCount] = React.useState(0)


useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);


    return (
        <div>
           {count} 
        </div>
    )
}
