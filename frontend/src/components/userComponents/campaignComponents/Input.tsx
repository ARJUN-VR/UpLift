type InputProps ={
    type:string,
    placeHolder:string,
    value?:string,
    setInput?:React.Dispatch<React.SetStateAction<string>>
    
}


export const Input = ({placeHolder,setInput,type,value}:InputProps) => {
  return (
    <input className="w-80 h-7 rounded-md mt-5 text-black" type={type} placeholder={placeHolder} value={value||''} onChange={(event)=>setInput? setInput(event.target.value):null}/>
  )
}
