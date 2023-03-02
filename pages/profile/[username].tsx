import { FC, useState, useEffect } from "react"
import { LeaderboardData, ProfileData } from "../../types"
import Link from "next/link";

type Props = {
  setSelectedId : (a:string)=>void
  selectedId : string
  likeNames : string[]
  setLikeNames: ([])=>void
}

const User: FC <Props> = ( {setSelectedId, selectedId , likeNames, setLikeNames} ) => {

  const [userInfo,setUserInfo] = useState<any> ({})

  useEffect(()=>{
    //fetch the leaderboard data from the api 
    const usernameFetch = async() => {
      try{
      const res = await fetch(`/api/profile/${selectedId}`)
      const data = await res.json()
      console.log(data)
      setUserInfo(data)
    
      } catch(error) {
        console.log(error)
      }
    };

    //onMount
    usernameFetch();
  },[selectedId])

  const likeHandler = ():void => {
    setLikeNames([...likeNames,selectedId])
    console.log(likeNames)
  }


  return (<>
    <div className="max-w-[40%] flex flex-col items-center justify-between space-y-12  border-purple-600 border">
      <h1 className="text-4xl font-bold">{selectedId}</h1>
      <img src={`/users/${selectedId}.png`} className="h-[40%]"></img>
      <p className="w-[40%]text-clip text-center p-4">{userInfo.bio}</p>
    </div>
    <div className="flex w-[40%] justify-between pb-5">
        <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded" onClick={()=>{setSelectedId("")}} >Back</button>
        <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded" onClick={()=>{likeHandler()}} >Like</button>
    </div>
  </>)

}


export default User