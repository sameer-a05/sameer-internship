import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import AOS from 'aos';
import 'aos/dist/aos.css'

export default function PopularCollections() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remote-internship-api-production.up.railway.app/popularCollections"
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
    AOS.init({
      duration: 800,
      once:false
    })
  },[])
  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title" data-aos="fade-up">Popular Collections</h2>
          <div className="popular-collections__body" data-aos="fade-up">
            <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            loop={true}
            >

            
            {loading
              ? new Array(9).fill(0).map((_, index) => (
                  <SwiperSlide key={`skeleton-${index}`}>
                  <div className="collection-column">
                    <figure className="collection__img">
                      <Skeleton height="100%" width="100%" />
                    </figure>
                    <div className="collection__info">
                      <h3 className="collection__name">
                        <Skeleton width="100px" height="16px" />
                      </h3>
                      <div className="collection__stats">
                        <div className="collection__stat">
                          <span className="collection__stat__label">
                            <Skeleton width="60px" height="14px" />
                          </span>
                          <span className="collection__stat__data">
                            <Skeleton width="80px" height="14px" />
                          </span>
                        </div>
                        <div className="collection__stat">
                          <span className="collection__stat__label">
                            <Skeleton width="60px" height="14px" />
                          </span>
                          <span className="collection__stat__data">
                            <Skeleton width="80px" height="14px" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </SwiperSlide>
              ))
              : data.map((nft, index) => (
                <SwiperSlide key={index}>
                  <div className="collection-column">
                    <Link
                      to={`/collection/${nft.collectionId}`}
                      key={index}
                      className="collection"
                    >
                      <img
                        src={nft.imageLink}
                        alt=""
                        className="collection__img"
                      />
                      <div className="collection__info">
                        <h3 className="collection__name">{nft.title}</h3>
                        <div className="collection__stats">
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              Floor
                            </span>
                            <span className="collection__stat__data">
                              {Number(nft.floor).toFixed(2)} ETH
                            </span>
                          </div>
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              Total Volume
                            </span>
                            <span className="collection__stat__data">
                              {nft.totalVolume} ETH
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div> 
                  </SwiperSlide>
                ))}
                </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
