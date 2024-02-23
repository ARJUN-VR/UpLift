



export const SearchResultPage = ({Result}) => {

  return (
    
    <div className="bg-[#0c0c0c] min-h-screen">
   
    <div className="flex">
     
      <div className='text-3xl text-gray-200'>
          search Result

          {
            Result.map((data)=>(
              <div>
                {data.title}
              </div>
            ))
          }
   

    
      </div>
    </div>
 </div>
  )
}
