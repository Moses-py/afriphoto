import React from "react"
export default (props) => {
    const isOpen = props.setIsOpen
    return(
        <div>
        {isOpen ? 
            <div className="wrapper" onClick={props.setIsClosed}>
                    <div class="card mx-3 my-5 border-none">
                        <div className="box">
                            <img src={props.imageURL} alt="no-pic" className="img-fluid w-100"/>
                                <div class="card-body">
                                    <p className="authorName">{props.authorName}</p>
                                    <p className="imageLocation text-muted">{props.location}</p>
                                </div>
                            </div>

                        </div>

            </div> : null}
        </div>


    )
}