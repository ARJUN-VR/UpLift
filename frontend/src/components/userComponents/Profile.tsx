import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import {
  useEditProfileMutation,
  useGetProfileMutation,
  useLogoutMutation,
} from "../../redux/slices/userApiSlice";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { logout } from "../../redux/reducers/userReducers";

export const Profile = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState("");
  const [image,setImage] = useState<string>('https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg')
  const [editMode, setEditMode] = useState<boolean>(false);


  const [editName,setEditName] = useState<string>('')
  const [editEmail,setEditEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')



  const fileInputRef = useRef<HTMLInputElement>(null)

  const [getProfile] = useGetProfileMutation();
  const [updateProfile] = useEditProfileMutation()
  const [logoutCall] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const getData = async () => {
      try {
        const userData = await getProfile("");
        console.log(userData,'userdatattta')

        if (userData.error?.data?.message == "Access denied." || userData.error?.data?.message == 'token expired' || userData.error?.data?.message == 'Not authorized,no Token' ||userData.data?.message == 'no refresh token') {
          await logoutCall("").unwrap();
          dispatch(logout());
          navigate("/login");
          toast.error(userData.error?.data.message);
        } else {
          setName(userData.data.userdata.name);
          setEmail(userData.data.userdata.email);
          setImage(userData.data.userdata.image)
          const date = userData.data.userdata.createdAt;
          const modifiedDate = new Date(date).toDateString();

          setDate(modifiedDate);
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    };
    getData();
  }, [editMode]);

  const editHandler = async () => {
    setEditMode(true);

  };

  useEffect(()=>{
setEditName(name)
setEditEmail(email)
  },[name,email])

  const triggerRef = ()=>{
    fileInputRef.current?.click()
  }

 
  const imageHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const imgFile =e.target?.files?.[0];


    const setFileToBase64 = (file: File | undefined) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    setFileToBase64(imgFile);
 
    
  }

  const updateHandler = async()=>{
    try{
      await updateProfile({editName,editEmail,image,password})
      setEditMode(false)
      toast.success('updated')
    }catch(error){
      console.log(error)
    }


  }
  return (
    <div className="bg-gray-700 h-full p-1 rounded-2xl flex">
      <div className="m-10 w-[45vh]">
        <div className="rounded-lg border bg-[#526D82] px-4 pt-8 pb-10 shadow-lg mt-[60px]">
          <div className="relative mx-auto w-36 rounded-full">
            {editMode?(
     <span className="absolute h-3 w-3  ">
     <span onClick={triggerRef}>
       <FontAwesomeIcon icon={faPenToSquare} />
     </span>
   </span>
            ):(
              <></>
            )}
       

            <img
              className="mx-auto h-36 w-full rounded-full"
              src={image}
              alt="profile pic"
            />
            <input type="file" ref={fileInputRef} style={{display:'none'}} accept="image/*" onChange={imageHandler} />
          </div>

          {editMode ? (
            <></>
          ) : (
            <span onClick={editHandler}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          )}
          {editMode ? (
            <input
              type="text"
              value={editName}
              className="ml-16 bg-gray-300 rounded-sm mt-2"
              onChange={(e)=>setEditName(e.target.value)}
            />
          ) : (
            <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
              {name}
            </h1>
          )}

          <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li className="flex items-center py-3 text-sm">
              <span>Email</span>
             
                <span className="ml-auto">{email}</span>
          
            </li>
            {editMode ? (
            <li className="flex items-center py-3 text-sm">
              <span>New password</span>
            
                <span className="ml-auto ">
                  <input
                    className="bg-gray-300 rounded-sm"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </span>
            </li>

              ) : (
                <></>
              )}

            <li className="flex items-center py-3 text-sm">
              <span>Joined On</span>
              <span className="ml-auto">{date}</span>
            </li>
          </ul>
          {editMode ? (
            <div className="flex justify-between mt-3">
              <button
                className="bg-red-400 p-2 px-5"
                onClick={() => setEditMode(false)}
              >
                cancel
              </button>
              <button className="bg-blue-400 p-2 px-5" onClick={updateHandler}>save</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="w-[700px] h-[500px] bg-violet-200 flex gap-x-3 mt-8 ml-10 rounded-2xl">
        <div className="bg-gray-800 w-full rounded-2xl flex gap-x-48 pt-4">
          <Link to={""} className="pl-44 text-white font-bold">
            Intersted
          </Link>
          <Link to={""} className="text-white font-bold">
            Backed
          </Link>
        </div>
      </div>
    </div>
  );
};
