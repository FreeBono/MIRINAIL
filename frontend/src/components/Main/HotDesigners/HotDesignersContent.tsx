import { Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Cards from "../../Commons/Cards";

export interface hotDesignersProps {
  designer_seq: number;
  user_nickname: string;
  user_profile_img: string;
  designer_shop_name: string;
  follow_follower_length: number;
  designs: number;
}
export interface Props {
  items: hotDesignersProps[];
}

// export interface DesignersProps {
//   img: string;
//   id: number;
//   name: string;
//   followerCnt: number;
//   designsCnt: number;
// }
const HotDesignersContent = () => {
  const designers: hotDesignersProps[] = [
    {
      designer_seq: 1,
      user_nickname: "Designer1",
      user_profile_img:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg",
      designer_shop_name: "Nailshop1",
      follow_follower_length: 50,
      designs: 40,
    },
    {
      designer_seq: 2,
      user_nickname: "Designer1",
      user_profile_img:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg",
      designer_shop_name: "Nailshop1",
      follow_follower_length: 50,
      designs: 40,
    },
    {
      designer_seq: 3,
      user_nickname: "Designer1",
      user_profile_img:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg",
      designer_shop_name: "Nailshop1",
      follow_follower_length: 50,
      designs: 40,
    },
    {
      designer_seq: 4,
      user_nickname: "Designer1",
      user_profile_img:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg",
      designer_shop_name: "Nailshop1",
      follow_follower_length: 50,
      designs: 40,
    },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {designers.map((item, idx) => (
        <div key={idx} style={{ margin: "10px 20px" }}>
          <Cards info={item} />
        </div>
        // <Grid key={idx} style={{ margin: "20PX" }}>
        //   <img
        //     src={item.img}
        //     alt=""
        //     style={{ width: "250px", height: "250px", position: "absolute" }}
        //   />
        //   <Typography
        //     variant="h5"
        //     style={{ position: "relative", fontWeight: "bold" }}
        //   >
        //     {item.name}
        //   </Typography>
        //   <div
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-around",
        //       marginTop: "180px",
        //     }}
        //   >
        //     <Typography
        //       style={{
        //         position: "relative",
        //         margin: "10px",
        //         fontWeight: "bold",
        //       }}
        //     >
        //       followerCnt:
        //       {item.followerCnt}
        //     </Typography>
        //     <Typography
        //       style={{
        //         position: "relative",
        //         margin: "10px",
        //         fontWeight: "bold",
        //       }}
        //     >
        //       designCnt:{item.designsCnt}
        //     </Typography>
        //   </div>
        // </Grid>
      ))}
    </div>
  );
};
export default HotDesignersContent;