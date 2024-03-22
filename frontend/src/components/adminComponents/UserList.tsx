import { useEffect, useState } from "react";
import { useAdmingetusersMutation, useBlockuserMutation } from "../../redux/slices/adminApiSlice";
import { toast } from "react-toastify";
import { ErrorResult, SuccessResult } from "../../utils";

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  isBlocked:boolean;
}



type Result = SuccessResult | ErrorResult;

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [state, setState] = useState<boolean>(false);
  console.log(users);

  const [getUsers] = useAdmingetusersMutation();
  const [block] = useBlockuserMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUsers("").unwrap();
        setUsers(userData.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [state, getUsers]);

  const blockUser = async (email: string) => {
    try {
      const result: Result = await block(email);
      console.log('result:', result);

      if ('data' in result) {
        const user: User = result.data.user;
        setState(!state);

        if (user.isBlocked) {
          toast.success('User blocked.');
        } else {
          toast.success('User unblocked.');
        }
      } else {
        // Handle error
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


 

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[500px]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400 sticky top-0 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Joined on
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key} className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {new Date(user.createdAt).toDateString()}
              </td>

              <td className="px-6 py-4">
                <button className={`${user.isBlocked===false ? 'bg-red-500 hover:bg-red-700':'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={()=>blockUser(user.email)}>{user.isBlocked==false ? 'Block':'unblock'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
