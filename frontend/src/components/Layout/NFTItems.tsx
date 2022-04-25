import styled from 'styled-components'
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { page } from '../../store/atoms';
import { fetchDesigns } from '../../store/api';
import { nftItems } from '../../store/atoms';
import { useQuery, useQueryClient } from 'react-query';
const Wrapper = styled.div`


  .clear {
    zoom : 1;
    li {

      float: left;
      width: 25%;
      text-align: center;
      cursor: pointer;
      margin-bottom: 80px;
      .ItemBox {
        width : 100%;
        display:block;
        .imx {
          margin : 0px 10px;
          img {
            width :100%;
            max-width:100%;
          }
          .itemName {
            color: #3D3C3A;
            font-size: 16px;
            font-weight: 500;
            word-break: keep-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .itemPrice {
            color: #3D3C3A;
            font-size: 16px;
            font-weight: 600;
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
`

const NFTItems = () => {
  const currentPage = useRecoilValue(page)
  
  const [mypage,setMyPage] = useRecoilState(page)
  const {isLoading:nftLoading, data:nftData } = useQuery(["nfts",mypage], fetchDesigns)

  useEffect(() => {
    setMyPage(1)
  },[])

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
        {nftLoading ? null : nftData.map((e:any, idx:any) => {
          return (
            <div>
              <li className="ItemListType">
               <a href="" className="ItemBox">
                 <div className="imx">
                   <img src={e.nailartThumbnailUrl} alt="" />
                   <div className="itemName">{e.nailartType} - {e.nailartDetailColor}</div>
                   <div className="itemPrice">{e.nailartPrice}</div>
                   {/* <div className="hashTag">#{e.nailartWeather} #{e.designerInfo.user.userNickname}</div> */}
                 </div>
               </a>
             </li>
            </div>
          )
        })}
      </ul>
  
      </Wrapper>
      
    </>
  )
}

export default NFTItems