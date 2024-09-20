import { useEffect, useState } from "react";
export default Body = () => {
    
    const [restaurantCard, setRestaurantCard] = useState([]);
    useEffect (()=>{
        console.log('use effect');
        fetchData();
    }, []);

    const fetchData = async() =>{
        const url = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.89640&lng=76.59090&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
        
        try{
            const response = await fetch(url);
            if(!response.ok){
                console.log(response.statusText)
            }
            const json = await response.json();
            console.log(json)
            const details = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants || []
            // console.log('line 22', json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants)
            console.log('line 23', details[0].info)

            console.log('line 24',details[0]?.info?.id, details[0]?.info?.name, details[0]?.info?.cloudinaryImageId, details[0]?.info?.locality, details[0]?.info?.areaName)

            setRestaurantCard(details);
            console.log('line 27', details)
            const {id, name, cloudinaryImageId, locality, areaName, avgRating} = details[0]?.info;
        }
        catch(error){
            console.log(error);
        }
    };
  return (
    <>
      <div className="container mt-3">
        <h2>Card titles, text, and links</h2>
        <div className="row">
            {restaurantCard.map((restaurantMenu, key) =>{
                return(
                    <div className="col-md-3" key={key}>
                        <div className="card-header">
                            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/`+restaurantMenu?.info?.cloudinaryImageId} className="img-fluid" alt="Cloudinary image" />
                        </div>
                        <div className="card-body">
                            <h5>{restaurantMenu?.info?.name}</h5>
                            <p>{restaurantMenu?.info?.locality}</p>
                            <h6>{restaurantMenu?.info?.areaName}</h6>
                            <p>Rating: <b>{restaurantMenu?.info?.avgRating}</b></p>
                        </div>
                        
                    </div>

                    
                ) 
            })}
        </div>
      </div>
    </>
  );
};
