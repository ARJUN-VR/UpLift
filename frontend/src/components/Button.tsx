type Button ={
    value:string,
    title:string,
    onClick?:()=>void,
    classname:string
}

export const Button = ({value,onClick,title,classname}:Button) => {
  return (
    <button value={value} onClick={onClick} className={classname}>
    {title}
    </button>
  )
}
