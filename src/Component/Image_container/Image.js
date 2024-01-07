import React, { useEffect, useState } from "react";
import "./Image.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";


const ImageConatiner = () => {
    let [Data, setData] = useState([]);
    let [search, setSearch] = useState("nature");
    let [fetch, setFetch] = useState(false);
    const [page, setPage] = useState(1);
  
    // fetch data from api
    useEffect(() => {
      let apiKey = "HDB63JpA40TXQ9VIgbItF-FY5QhyvPzATSfdelPhyIg";
      let fetchImageData = async () => {
        let response = await axios.get(
          `https://api.unsplash.com/search/photos/?page=${page}&&query=${search}&client_id=${apiKey}`
       
        );
        setData((prevData) => [...prevData, ...response.data.results]);
        console.log(response.data.results);
      };
      fetchImageData();
    }, [fetch, page]);
  
    // take user input from input field
    let onSearchInput = (e) => {
      setSearch(e.target.value);
    };
  
    // click on search button to get images
    let onClickSeachImage = () => {
      setFetch(!fetch);
      setData([]);
      setPage(1);
    };
  
    return (
      <div className="imagegallery-container">
        <nav>
          <h1>GeekGallery</h1>
          <div className="imagegallery-searchdata">
            <input type="text" placeholder="Search" onChange={onSearchInput} />
            <button onClick={onClickSeachImage}>Search</button>
          </div>
        </nav>
  
        {/* image gallery */}
        <InfiniteScroll
          dataLength={Data.length}
          next={() => setPage(page + 1)}
          hasMore={true} // Adjust this based on your logic for determining if there's more data
          loader={<h4>Loading...</h4>}
          scrollThreshold={"10px"}
        >
          <div className="imagegallery-images">
            {Data.map((item, idx) => (
              <div className="imagegallery-image" key={idx}>
                <img src={item.urls.small} alt={`image${idx}`} />
                <div className="imagegallery-conetnt">
                  <h3>{item.user.name}</h3>
                  <p>{item.user.bio}</p>
                  <p>{item.updated_at}</p>
                </div>
                <a href={item.urls.full} download className="download-link">
                  <i class="fa-solid fa-circle-down"></i>
                </a>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  };
  
  export default ImageConatiner;