
import styled from 'styled-components'
import {useState} from 'react'
import { Paginations2 } from '../Paginations'

const Wrapper = styled.div`
  margin-top : 100px;
  

  .table {
    margin-top : 60px;
    clear: both;
    width: 100%;
    text-align: center;
    background: #fff;
    border: 2px solid #ddd;
    border-collapse: collapse;
    .tableElement {
      display : table-column-group;
    }
    tbody {
      height :50px;
    }
    td {
      border-bottom: 1px solid #ddd;
    }

    th {
      height :60px;

      border-bottom: 2px solid #ddd;
      background-color :#dbd9d9;
    }
  }
  .box {
    display: flex;
    justify-content : space-between;
    margin : 0px 5px;
    .boxLeft .btn {
      background-color :rgb(61, 60, 58);
      color:white;
      
    }
  }

  .test {
    color:red;
    cursor: pointer;

  }

  .content {
    padding: 0 18px;
    display: none;
    overflow: hidden;
    background-color: #f1f1f1;
  }

  .reply {

    text-align:left;
  }

  .questionName {
    padding : 10px 0px;
    margin-left:15px;
    font-size:16px;
    font-weight:bold;
  }

  .questionContent {
    padding : 7px 0px;
    margin-left:15px;
    margin-right:15px;
    
  }

  .replyInfo {
    border-top: 1px solid #e1e1e1;
    background-color: #f3f3f3;
    display:flex;
    padding-left:15px;
    padding-right:15px;
    min-height:160px;
    

    .replyCharger {
      width:8%;
      line-height:160px;
      font-weight: bold;
    }
    .replyContent {
      width:72%;
      margin-top:15px;
      margin-bottom:15px;
      // border-left: 1px solid red;
    }
    .replyDate {
      width:20%;
      line-height:160px;
      text-align:right;
      padding-right:2%;
    }
  }

  hr {
    width:100%;
  }

  
`
export interface DummyData {
  id : number
  isAnswer : string
  content : string
  writer : string
  date : string
  reply : any
}

const InquiryTable = () => {


 
  const [dummy, setDummy] = useState<DummyData[]>(
    [
      {
        id : 1,
        isAnswer : '답변완료',
        content : 'content1 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-01',
        reply : {
          id : 1,
          title : 'asdfas',
          content : 'dsaf',  
        },
      },
      {id : 2,
        isAnswer : '답변완료',
        content : 'content2 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-02',
        reply : {
          id : 2,
          title : 'asdfas',
          content : 'dsaf',  
        },  },
      {id : 3,
      isAnswer : '답변완료',
      content : 'content3 입니다. 알아두세요',
      writer : '곽동현',
      date : '2020-02-03',
      reply : {
        id : 3,
        title : 'asdfas',
        content : 'dsaf',  
      }, },
      {id : 4,
        isAnswer : '답변완료',
        content : 'content4 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-04',
        reply : {
          id : 4,
          title : 'asdfas',
          content : 'dsaf',  
        },  
      },
      {id : 5,
        isAnswer : '답변완료',
        content : 'content5 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-05',
        reply : {
          id : 5,
          title : 'asdfas',
          content : 'dsaf',  
        },  
      },
      {id : 6,
        isAnswer : '답변완료',
        content : 'content6 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-06',
        reply : {
          id : 6,
          title : 'asdfas',
          content : 'dsaf',  
        },  
      },
      {id : 7,
        isAnswer : '답변완료',
        content : 'content7 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-07',
        reply : {
          id : 7,
          title : 'asdfas',
          content : 'dsaf',  
        },  
      },
      {id : 8,
        isAnswer : '답변완료',
        content : 'content8 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-08',
        reply : {
          id : 8,
          title : 'asdfas',
          content : 'dsaf',  
        },  
      },
      {id : 9,
        isAnswer : '답변완료',
        content : 'content9 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-09',
        reply : {
          id : 9,
          title : 'asdfas',
          content : 'dsaf',  
        },  
      },
      {id : 10,
        isAnswer : '답변완료',
        content : 'content10 입니다. 알아두세요',
        writer : '곽동현',
        date : '2020-02-010',
        reply : {
          id : 10,
          title : 'asdfas',
          content : 'dsaf',  
        },  
      },
    ]  
  )
  const testFunc = (id:any) => {
    const mytest:any = document.getElementById(id)
    mytest?.classList.toggle('active')
    console.log(mytest.classList.contains('active'))
    // console.log(mytest.style.display)
    if (mytest?.style.display === "none") {
      mytest.style.display = ''
      console.log('none이엇음')
    } else {
      console.log('none아님')
      mytest.style.display = 'none'
    }
  }



  return (
    <Wrapper>
      <div style={{fontSize:"40px",marginTop:"60px"}}>1대1 문의</div>
      <table className="table">
        <colgroup className="tableElement">
          <col style={{width:"7%"}} />
          <col style={{width:"8%"}} />
          <col style={{width:"auto"}} />
          <col style={{width:"12%"}} />
          <col style={{width:"13%"}} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">답변여부</th>
            <th scope="col">내용</th>
            <th scope="col">작성자</th>
            <th scope="col">등록일자</th>
          </tr>
        </thead>
        {/* <tbody>
          <tr>
            <td>1</td><td>답변완료</td><td id='test' onClick={testFunc}>아 진짜 왤케 하기싫지?</td><td>곽동현</td><td>2022-04-15</td>
          </tr>
          <tr>
            <td colSpan={6}>ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</td>
          </tr>
        </tbody> */}
        {dummy.map(e =>
        <tbody key={e.id}>
            <tr>
              <td>{e.id}</td>
              <td>{e.isAnswer}</td>
              <td style={{cursor:"pointer"}} onClick={() => { testFunc(e.id.toString())}}>{e.content}</td>
              <td>{e.writer}</td>
              <td>{e.date}</td>
            </tr>
            <tr>
              <td id={e.id.toString()} colSpan={6} style={{display:'none', }} className="reply">
                <div className="questionName">프렌치 - 딥 다크(해당 상품 이름)</div>
                <hr />
                <div className='questionContent'>{e.reply.content}</div>
                <div className='replyInfo'>
                  <div className='replyCharger'>담당자</div>
                  <div className='replyContent'>안녕하세요. 아니 사실 안녕하지 않아</div>
                  <div className='replyDate'>2022.04.14</div>
                </div>
            
              </td>
            </tr>
        </tbody>
        )}
        
      </table>
      <div className="box">
        <div className="boxLeft">
          <div className="btn">
            글작성
          </div>
        </div>
        <div className="boxRight">
          <div >
            <Paginations2 />
          </div>
        </div>
      </div>
  

    </Wrapper>
  )
}

export default InquiryTable