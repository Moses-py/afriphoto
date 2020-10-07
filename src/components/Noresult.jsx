import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
export default () => {
    return <div className="no-result-div">
        <p className="no-result-text">No Result found for Search</p> <SearchIcon color = "disabled" style= {{fontSize: 40}}/>
    </div>
}