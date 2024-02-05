
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/userComponents/Loader';
import { usePledgeMutation } from '../../redux/slices/userApiSlice';

export const SuccessPage = () => {
  const id= localStorage.getItem('camapign')
  const amount = localStorage.getItem('amount')
  const [pledge,{isLoading}] = usePledgeMutation()

  const navigate = useNavigate()


  const updatePledge =async()=>{

    try {
      const res = await pledge({id,amount})
      console.log(res)
      navigate('/')

    } catch (error) {
      console.log(error)
    }



  }


  return (
    <div className="bg-gray-800 text-white pt-8 pl-8 rounded-md shadow-md h-screen">
      <h1 className="text-3xl font-semibold mb-4">Thank You!</h1>
      <p className="text-lg">Your pledge in crowdfunding was successful.</p>
      <button onClick={updatePledge}>ok</button>
      {
        isLoading ? (
          <Loader/>
        ):(
          <></>
        )
      }
      {/* You can add more content or customize the text as needed */}
    </div>
  );
}


