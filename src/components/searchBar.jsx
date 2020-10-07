import React, { useState } from "react"
import SearchIcon from '@material-ui/icons/Search';
export default (props) => { 
    const [search, setSearch] = useState("")
    const [resultScreen, setResultScreen] = useState(false)


    function handleChange(event) {
        const searchValue =event.target.value
        setSearch(searchValue)
        
    }

    function handleClick(e) {
        setResultScreen(true)
        setTimeout(() => {
            setResultScreen("renderSearch")
        },1500)
        clearTimeout()
        props.change(search)
    }

    function screen() {
        if(resultScreen === true) {
            return <h4 className="searching">Searching for <span className="searchName">"{search}"</span> </h4>
        } else if(resultScreen === "renderSearch") {
            return <h4 className="searching">{props.val} <span className="searchName">"{search}"</span> </h4>
        } else {
           return <div>
           <form>
                <input type="text" id="input" onChange={handleChange} placeholder="Search a photo" value={search} className="search-bar mr-1" /> 
                <SearchIcon type="submit" id="btn" className="search-icon" onClick={handleClick} color = "disabled" style= {{fontSize: 30, border: ".5px solid rgb(238, 238, 238)",background: "rgb(238, 238, 238)", borderRadius: "3px"}}/>
           </form>
            </div>
        }
    }
    return <div> 
            <div className="input-div">
                {screen()}
            </div>
    </div>
}