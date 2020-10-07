import React, {useState, useEffect} from "react"
import Searchbar from "./searchBar"
import Masonry from 'react-masonry-css'
import MediaCard from "./imageModal"
import Unsplash, {toJson} from "unsplash-js"
import Axios from "axios";
import Loader from "./Loader"
import NoResult  from "./Noresult"

import fetch from 'node-fetch';
global.fetch = fetch;

export default () => {
    const unsplash = new Unsplash({ accessKey: "Onj81LiDMWosTAvMBRophkZMTj5BS-FkbR5ZfaV9OCk" });

    const [image, setImage] = useState([])
    const [responseTotal, setResponseTotal] = useState("")
    const [openModal, setModal] = useState(false)
    const [modalImage, setImageModal] = useState({})
    const [isLoading, setIsLoading] = useState(true)



    function handleClick(searchName) {
        setIsLoading(!isLoading)
        const rand = Math.floor(Math.random() * 20 + 1)
        Axios.get("https://api.unsplash.com/search/photos?page=" + rand + "&query=" +searchName+ "&client_id=Onj81LiDMWosTAvMBRophkZMTj5BS-FkbR5ZfaV9OCk")
        .then((response) => {
            const responseData = response.data; 
                       
            setImage(responseData.results)
            setResponseTotal(responseData.total)
            setTimeout(() => {
                setIsLoading(false)                         
            }, 1000)
        })
        clearTimeout()
    }

    useEffect(() => {

        const rand = Math.floor(Math.random() * 20 + 1)
        Axios.get("https://api.unsplash.com/search/photos?page=" + rand + "&query=African&client_id=Onj81LiDMWosTAvMBRophkZMTj5BS-FkbR5ZfaV9OCk")
        .then((response) => {
            const responseData = response.data;            
            setImage(responseData.results)              
            setIsLoading(false)
                                  
        })
    }, [])
    
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };

      function setModalImage(event) {
          const image_id = event.target.alt;
          unsplash.photos.getPhoto(image_id)
            .then(toJson)
            .then(json => {
            const {urls, user, location} = json
            setImageModal(prev => {
                return {
                    ...prev,
                    imageURL: [urls.small],
                    author: [user.name],
                    imageLocation: [location.name]
                }
            })
            setModal(true)   
            console.log(json);
                 
        });  
      }
      function closeModal() {
        setModal(false)
    }

      const items = image.map((img) => {
          return <div className="grid" key={img.id}>
                <div className="image-div">
                    <img src={img.urls.small} onClick={setModalImage} className="grid-item item3" alt={img.id}/>
                    <p className="image-text">{img.user.name}</p>
                    <p className="location-text font-weight-bold">{img.user.location}</p>
                </div>
          </div>
      })

      function renderPages() {
        return isLoading ? <Loader /> : 
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >

            {(responseTotal === 0) ? <NoResult />:items}
            </Masonry>
        
      }



    return (
        <div>
            <Searchbar change={handleClick} val="Search Results for"/>
            
            {responseTotal === 0? <NoResult /> : renderPages()}
            <MediaCard 
                setIsOpen = {openModal} 
                setIsClosed={closeModal} 
                imageURL={modalImage.imageURL}
                authorName = {modalImage.author}
                location = {modalImage.imageLocation}    
            />
        </div>
    )
}

 
 
