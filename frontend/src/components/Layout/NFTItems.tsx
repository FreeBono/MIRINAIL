import styled from 'styled-components'
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nftFilter, page, pagenation } from '../../store/atoms';
import { fetchDesigns } from '../../store/api';
import { nftItems } from '../../store/atoms';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Commons/Loading';
const Wrapper = styled.div`


  .clear {
    zoom : 1;
    min-height : 1000px;
    li {
      height :250px;
      float: left;
      width: 25%;
      text-align: center;
      cursor: pointer;
      margin-bottom: 120px;
      
      .ItemBox {
        width : 100%;
        display:block;
        
        .imx {
          margin : 0px 10px;
          
          img {
            width :100%;
            max-width:100%;
            height :254px;
            margin-bottom :12px;
          }
          .itemName {
            color: #3D3C3A;
            font-size: 20px;
            font-weight: 500;
            word-break: keep-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .itemTags {
            color :gray;
          }
          .itemPrice {
            color: #3D3C3A;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
          }
          .hashTag {
            color: #6E6E6E;
            font-size: 14px;
            margin-bottom: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  

  @media screen and (max-width: 1023px) {
    .clear{
      margin-top : 50px;
      li {
        width: 50%;
        text-align: center;
        cursor: pointer;
        margin-bottom: 100px;
     
      }
    }
  }

  
`

const NFTItems = (props:any) => {

  const [myFilter,setMyFilter] = useRecoilState(nftFilter)
  
  const [mypage,setMyPage] = useRecoilState(page)
  const {isLoading:nftLoading, data:nftData } = useQuery(["nfts",myFilter], fetchDesigns)
  const [totalCount,setTotalCount] = useRecoilState(pagenation)
  const navigate = useNavigate();
  useEffect(() => {
    setMyPage(1)
  },[])
  useEffect(() => {
    if(nftData && nftData[0]){
    setTotalCount(nftData[0].totalCount)
    }
  },[nftData])



  return (
    <>
  
      <Wrapper>
      {/* {items.map((item, idx) => {
          return (
            <div key={idx}>
              <Cards info={item}/>
            </div>
          );
        })} */}
      <ul className="clear">
        {nftLoading && mypage === 1 ? <Loading /> : (nftData?.length != 0 ? nftData?.map((e:any, idx:number) => {
          return (
            <div onClick={() => navigate(`/nft/${e.nailartSeq}`)}>
              
              {/* <img src="" alt="" /> */}
              <li className="ItemListType">
               <a href="" className="ItemBox">
                 <div className="imx">
                   <img src={e.nailartThumbnailUrl} alt="????" />
                   <div className="itemName">{e.nailartType} - {e.nailartDetailColor}</div>
                   <div className="itemTags">#{e.nailartWeather} #{e.nailartColor} #{e.designerShopName}</div>
                   <div className="itemPrice">{e.nailartPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ???</div>
               
                   {/* <div className="hashTag">#{e.nailartWeather} #{e.designerInfo.user.userNickname}</div> */}
                 </div>
               </a>
             </li>
            </div>
          )
        }) : <div style={{marginTop:"200px"}}>????????? ????????? ????????????.</div>
        )
        }
      </ul>
  
      </Wrapper>
      
    </>
  )
}

export default NFTItems