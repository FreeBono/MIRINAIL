import styled from 'styled-components'


const Wrapper = styled.div`
.description {
  display: flex;
  justify-content : space-between;
  margin :15px;
}


.clear {
  zoom : 1;
  li {

    float: left;
    width: 20%;
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
          height : 250px;
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
const Gallery = () => {

  return (
    <Wrapper>
      <div className='description'>
        <div>
          디자이너의 다른 작품을 만나보세요.
        </div>
        <div>
          전체보기
        </div>
      </div>
      <ul className="clear">
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
            </div>
          </a>
        </li>
      </ul>
    </Wrapper>
  )
}

export default Gallery