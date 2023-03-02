import { FC, ReactComponentElement, useEffect, useState } from "react"
import { LeaderboardData, UserDetails} from "../../types"
import Link from "next/link"
import User from "../profile/[username]"
import LeaderboardView from "../../components/leaderboard"

const Leaderboard: FC = () => {

  const [leaderboard, setLeaderboard] = useState< LeaderboardData | []>([])
  const [selectedId, setSelectedId] = useState<string>("")
  const [likeNames, setLikeNames] = useState<string[]>([])

  useEffect(()=>{
    const leaderboardFetch = async() => {
      try{
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data.leaderboard);
      return data
      } catch(error) {
        console.log(error);
      }
    };
  
    const update = setInterval(() => {
      leaderboardFetch();
    },20000)

    leaderboardFetch();
  },[])

  

  return (<>
    <div className="w-full h-80 flex flex-col items-center justify-between space-y-12">
      <h1 className="text-4xl font-bold">{selectedId?"User":"Leaderboard"}</h1>
      {selectedId? <User setSelectedId={setSelectedId} selectedId={selectedId} likeNames={likeNames} setLikeNames={setLikeNames}/>:
       <LeaderboardView leaderboard={leaderboard} setSelectedId={setSelectedId} selectedId={selectedId} likeNames={likeNames}/>}
    </div>
    
  </>)

}


export default Leaderboard