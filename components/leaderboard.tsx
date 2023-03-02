import Link from "next/link";
import { LeaderboardData } from "../types";
import { FC, useEffect } from "react"

type Props = {
    leaderboard : LeaderboardData | []
    setSelectedId : (a:string)=>void
    selectedId : string
    likeNames : string[]
}

const LeaderboardView: FC <Props> = ( {leaderboard, setSelectedId, selectedId, likeNames } ) => {

    let clickHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setSelectedId(e.target.id)
    };

    let likeDisplayBool = (itemName:string) => {
        let search = likeNames.filter((name):string|void => {if(name === itemName){ return name}});
        if(search[0]){
            return true
        }else{
            return false
        }
    };

    const boardCreator = () => {
        let userTags = leaderboard.map((item:{})=>{
          return (
            <div id={item.username} className="flex justify-between p-5 border-purple-600 border overflow-hidden" onClick={(e)=>clickHandler(e)}>
              <img id={item.username} className="w-[15%]" src={item.profileImage}></img>
              <div className="flex-col px-12">
                <h1 className="text-2xl font-bold"> NAME: </h1>
                <h2 id={item.username} className="w-[40%]">{item.username}</h2>
              </div>
              <div className="flex-col px-12">
              <h1 className="text-2xl font-bold"> SCORE: </h1>
              <p id={item.username} className="w-[40%]">{item.score}</p>
              </div>
              
              <div className="text-2xl">{likeDisplayBool(item.username)?"❤️":""}</div>
            </div>
          )
        })
        return userTags
      };

    return (
      <>
      <div id="leaderboardContainer" className="w-[70%]">{boardCreator()}</div>
      </>
    )
}

export default LeaderboardView