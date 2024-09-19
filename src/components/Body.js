import { useEffect } from "react";
export default Body = () => {

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
            const details = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants
            // console.log('line 22', json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants)
            console.log('line 23', details[0].info)

            console.log('line 24',details[0]?.info?.id, details[0]?.info?.name, details[0]?.info?.cloudinaryImageId, details[0]?.info?.locality, details[0]?.info?.areaName)


            const {id, name, cloudinaryImageId, locality, areaName} = details[0]?.info;
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
             
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Card title</h4>
                        
                        <p className="card-text">
                        
                        </p>
                        <a href="#" className="card-link">
                        Card link
                        </a>
                        <a href="#" className="card-link">
                        Another link
                        </a>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </>
  );
};
