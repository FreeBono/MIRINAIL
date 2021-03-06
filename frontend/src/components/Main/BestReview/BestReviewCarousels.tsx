import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import sc from "styled-components";

const Btn = sc.button`
color: white;
  :hover {
    background-color: #fff;
    color: #333;
  }
`;
const Container = styled("div")({
  marginLeft: "600px",
  width: "70%",
  position: "absolute",
});
interface BestReviewProps {
  nailart: NailArtProps;
  designerNickname: string;
}
interface NailArtProps {
  designerSeq: number;
  nailartAvailable: false;
  nailartColor: string;
  nailartDesc: string;
  nailartDetailColor: string;
  nailartName: string;
  nailartPrice: number;
  nailartRating: number;
  nailartRegedAt: null;
  nailartSeq: number;
  nailartThumbnailUrl: string;
  nailartType: string;
  nailartWeather: string;
}
export interface Props {
  items: BestReviewProps[];
}
const StyledSlider = styled(Slider)`
  bottom: 20vh;
  right: 150px;
  .slick-prev {
    display: none !important;
  }
  .slick-next {
    display: none !important;
  }
  img {
    filter: brightness(30%);
  }
  .slick-current {
    img {
      filter: brightness(100%);
    }
  }
`;
const StyledSlider2 = styled(Slider)`
  width: 300px;
  right: -100px;
  bottom: -120px;
  .slick-prev {
    display: none !important;
  }
  .slick-next {
    display: none !important;
  }
  .slick-dots {
    right: 10px;
    bottom: -5vh;
    li button:before {
      color: white;
    }
  }
  color: white;
`;

function BestReviewCarousels({ items }: Props) {
  const [mainSlick, setMainSlick] = useState(undefined || null);
  const [pagingSlick, setPagingSlick] = useState(undefined || null);
  const mainSlickRef = useRef(null);
  const pagingSlickRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMainSlick(mainSlickRef.current);
    setPagingSlick(pagingSlickRef.current);
  }, []);

  const mainSettings = {
    dots: true,
    // fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  const pagingSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <>
      {pagingSlick !== null && mainSlick !== null ? (
        <>
          <StyledSlider2
            ref={mainSlickRef}
            asNavFor={pagingSlick}
            {...mainSettings}
          >
            {items.map((item, idx) => {
              return (
                <div key={idx}>
                  <div
                    style={{
                      fontSize: "2.15rem",
                      fontWeight: "400",
                      marginBottom: "20px",
                      padding: "5px",
                    }}
                  >
                    {item.nailart.nailartType} -{" "}
                    {item.nailart.nailartDetailColor}
                  </div>

                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "400",
                      marginBottom: "10px",
                      padding: "10px",
                    }}
                  >
                    #{item.nailart.nailartWeather} #{item.nailart.nailartColor}{" "}
                    #{item.designerNickname}
                  </div>

                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.nailart.nailartPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    ???
                  </div>

                  <Btn
                    style={{
                      border: "1px solid white",
                      borderRadius: "12px",
                      padding: "10px 30px",
                      marginTop: "30px",
                    }}
                    onClick={() => {
                      navigate(`nft/${item.nailart.nailartSeq}`);
                    }}
                  >
                    ????????? ????????????
                  </Btn>
                </div>
              );
            })}
          </StyledSlider2>
          <Container>
            <StyledSlider
              ref={pagingSlickRef}
              asNavFor={mainSlick}
              {...pagingSettings}
            >
              {items.map((item, idx) => {
                return (
                  <div key={idx}>
                    <img
                      src={item.nailart.nailartThumbnailUrl}
                      style={{ width: "32vh", height: "32vh" }}
                      alt=""
                    />
                  </div>
                );
              })}
            </StyledSlider>
          </Container>
        </>
      ) : (
        <>
          <StyledSlider2 ref={mainSlickRef} {...mainSettings}>
            {items.map((item, idx) => {
              return (
                <div key={idx}>
                  <div
                    style={{
                      fontSize: "2.15rem",
                      fontWeight: "400",
                      marginBottom: "20px",
                      padding: "5px",
                    }}
                  >
                    {item.nailart.nailartType} -{" "}
                    {item.nailart.nailartDetailColor}
                  </div>

                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "400",
                      marginBottom: "10px",
                      padding: "10px",
                    }}
                  >
                    #{item.nailart.nailartWeather} #{item.nailart.nailartColor}{" "}
                    #{item.designerNickname}
                  </div>

                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.nailart.nailartPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    ???
                  </div>

                  <Btn
                    style={{
                      border: "1px solid white",
                      borderRadius: "12px",
                      padding: "10px 30px",
                      marginTop: "30px",
                    }}
                    onClick={() => {
                      navigate(`nft/${item.nailart.nailartSeq}`);
                    }}
                  >
                    ????????? ????????????
                  </Btn>
                </div>
              );
            })}
          </StyledSlider2>
          <Container>
            <StyledSlider ref={pagingSlickRef} {...pagingSettings}>
              {items.map((item, idx) => {
                return (
                  <div key={idx}>
                    <img
                      src={item.nailart.nailartThumbnailUrl}
                      style={{ width: "32vh", height: "32vh" }}
                      alt=""
                    />
                  </div>
                );
              })}
            </StyledSlider>
          </Container>
        </>
      )}
    </>
  );
}
export default BestReviewCarousels;
