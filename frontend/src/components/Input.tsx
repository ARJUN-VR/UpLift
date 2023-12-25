type Input ={
    type:string,
    placeHolder:string,
    setInput?:React.Dispatch<React.SetStateAction<string>>
    
}


export const Input = ({placeHolder,setInput,type}:Input) => {
  return (
    <input type={type} placeholder={placeHolder} onChange={(event)=>setInput?(event.target.value):null}/>
  )
}
