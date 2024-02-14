
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/userComponents/Loader';
import { usePledgeMutation } from '../../redux/slices/userApiSlice';

export const SuccessPage = () => {
  const id= localStorage.getItem('camapign')
  const amount = localStorage.getItem('amount')
  const [pledge,{isLoading}] = usePledgeMutation()

  const navigate = useNavigate()
  const userData = localStorage.getItem('userInfo')
  const parsedData = JSON.parse(userData)
  const userEmail = parsedData.result.user.email



  const updatePledge =async()=>{

    try {
      const res = await pledge({id,amount,userEmail})
      console.log(res)
      navigate('/')

    } catch (error) {
      console.log(error)
    }



  }


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <div className="max-w-lg bg-gray-900 p-8 rounded-md shadow-md text-center">
        <h1 className="text-3xl font-semibold mb-4">Thank You!</h1>
        <p className="text-lg mb-6">Your pledge in crowdfunding was successful.</p>
        <button onClick={updatePledge} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
          OK
        </button>
        {isLoading && <Loader />}
        {/* You can add more content or customize the text as needed */}
      </div>
    </div>
  );
  
}


