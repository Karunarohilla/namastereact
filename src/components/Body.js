import { useEffect, useState } from "react";
export default Body = () => {
  const [restaurantCard, setRestaurantCard] = useState([]);
  const [originalRestaurantCard, setOriginalRestaurantCard] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    console.log("use effect");
    fetchData();
  }, []);

  const fetchData = async () => {
    const url =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.89640&lng=76.59090&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(response.statusText);
      }
      const json = await response.json();
      console.log(json);
      const details =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          .restaurants || [];
      // console.log('line 22', json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants)
      setRestaurantCard(details);
      setOriginalRestaurantCard(details);
      console.log("line 27", details);
      const { id, name, cloudinaryImageId, locality, areaName, avgRating } =
        details[0]?.info;
    } catch (error) {
      console.log(error);
    }
  };

  const showTopRestaurants = () =>{
    const topRestaurants = restaurantCard.filter((item) =>
        item?.info?.avgRating > 4
    )

    console.log('line 45', topRestaurants)
    setRestaurantCard(topRestaurants);
    console.log('line 46', topRestaurants);
  };

  const showAllRestaurants = () =>{
    setRestaurantCard(originalRestaurantCard);
    console.log('line 47 show all rest.' )
  }

  const handleSearchText = () =>{
    
  }

  return (
    <>
      <div className="container mt-3">
        <h3 className="mb-4">Restaurants with online food delivery in Rohtak</h3>
        <button className= "btn btn-danger" onClick={showTopRestaurants}>Show Top Restaurants</button>
        <button className="btn btn-success" onClick={showAllRestaurants}>Show All Restaurants</button>
        <input type="text" placeholder="Search here" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} /> <button onClick={handleSearchText}>Search</button>
        <div className="row">
          {restaurantCard.map((restaurantMenu, key) => {
            return (
              <div className="col-md-3" key={key}>
                <div className="card-header">
                  <img
                    src={
                      `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/` +
                      restaurantMenu?.info?.cloudinaryImageId
                    }
                    className="img-fluid"
                    alt="Cloudinary image"
                  />
                </div>
                <div className="card-body">
                  <h5>{restaurantMenu?.info?.name}</h5>
                  <p>{restaurantMenu?.info?.locality}</p>
                  <h6>{restaurantMenu?.info?.areaName}</h6>
                  <p>
                    Rating: <b>{restaurantMenu?.info?.avgRating}</b>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
