
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleCampaignMutation } from '../../redux/slices/adminApiSlice'
import { BasicInterface, CampaignViewAdvancedInterface } from '../../utils';





export const CampaignView = () => {
  const [basics, setBasics] = useState<BasicInterface>({
    title: '',
    category: '',
    tagline: '',
    story: '',
    location: ''
  });
  const [advanced, setAdvanced] = useState<CampaignViewAdvancedInterface>({
    thumbnail: '',
    story: ''
  });
  const [video ] = useState<string>('https://res.cloudinary.com/dpuzhf0j2/video/upload/v1705247189/ocvbm2thcvqyiglr989l.mp4')

  const [getSingleCampaign] = useGetSingleCampaignMutation()

  const { id: rawId } = useParams();
  const id = rawId?.startsWith(':id=') ? rawId.slice(4) : rawId;
    console.log(id)

    useEffect(()=>{
      const list = async()=>{
        try{
      const data  = await getSingleCampaign(id).unwrap()
      console.log(data)
      
      const basicDetails = data.basicData[0]
      const advancedDetails = data.advancedData[0]

      console.log('basicss:',basicDetails)
     
      setBasics(basicDetails)
      setAdvanced(advancedDetails)
     
    

        }catch(error){
          console.log(error)
        }
      }
      list()
   
    },[])

    console.log(basics)

 console.log(video)
 

  return (
    <div className='w-full flex'>

    {/* Video Container */}
    <div className='w-[50%] h-96 min-h-[300px] mt-10 ml-20 flex-shrink-0' style={{ position: 'relative', overflow: 'hidden' }}>
      <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls poster={advanced.thumbnail}>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  
    {/* Campaign Details Container */}
    <div className='flex flex-col h-72'>
  
      {/* Campaign Title Section */}
      <div className='flex justify-center'>
        <span className='font-black text-3xl mt-10 ml-32'>{basics.title}</span>
      </div>
  
      <div className='ml-10'>
        {basics.category}
      </div>
  
      {/* Campaign Tagline Section */}
      <div className='ml-10'>
        {basics.tagline}
      </div>
  
      {/* Story Paragraph Section */}
      <div className='ml-10 mt-4 flex-grow'>
        <p>
          {advanced.story}
        </p>
      </div>
      <div className='ml-10 mt-10'>
        Location: {basics.location}
      </div>
  
    </div>
  
  </div>  
  )
}
