type InputProps ={
    type:string ,
    placeHolder:string,
    value?:string | number,
    setInput?:React.Dispatch<React.SetStateAction<string>>
    
}


export const Input = ({placeHolder,setInput,type,value}:InputProps) => {
  return (
    <input className="w-80 h-7 rounded-md mt-5 text-black pl-2" type={type} placeholder={placeHolder} value={value||''} onChange={(event)=>setInput? setInput(event.target.value):null}/>
  )
}
