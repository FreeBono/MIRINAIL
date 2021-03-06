// import "./UnderLineInput.scss";
import styled from "styled-components";
import { CirclePicker } from "react-color";
import { useState, useEffect } from "react";
const Wrapper = styled.div`
  width: 100%;

  .inputBox {
    display: flex;
    // flex-flow : row wrap;
    width: 100%;
    margin-top: 40px;
    .inputBoxLeft {
      width: 45%;
      .inputs {
        div {
          margin: 10px;
          margin-left: 0px;
          width: 200px;
          display: inline-block;
          .underline {
            border-left-width: 0;
            border-right-width: 0;
            border-top-width: 0;
            border-bottom-width: 2px;
            width: 100%;
            margin-top: 48px;
          }

          input:focus {
            outline: none;
          }
        }
      }
      select {
        color: gray;
        margin: 10px;
        margin-left: 0px;
        width: 200px;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border-bottom-width: 2px;
        cursor:pointer;
        option {
          color: black;
        }
      }
      select:focus {
        outline: none;
      }
    }

    .inputBoxRight {
      margin-top: 10px;
      margin-left: 40px;
      width: 55%;
      display: flex;
      .colorBoxLeft {
      }
      .colorBoxRight {
        margin-left: 20px;
        .currentColor {
          background-color: #f3f3f3;
          height: 80px;
          width: 80px;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .inputBox .inputBoxLeft select {
      margin-left:20px;
    }
    .inputBox .inputBoxLeft .inputs {
      margin-left:20px;
      margin-top:40px;
      div {
        display:block;
        .underline {
          
          margin-left:0px !important;
          margin-top:5px;
        }
      }
    }

    .inputBox .inputBoxRight {
      margin-top:0px;
      display: block;
      .colorBoxRight {
        margin-left : 0px;
        margin-top : 20px;
      }
      .colorBoxLeft div{
        margin-bottom :10px !important;
      }
    }
  }
`;
//?????? ?????? ??????
// if (color === '#ff0000') {
//   color = 'red'
// } else if (color === '#ffa500') {
//   color = 'orange'
// } else if (color === '#ffff00') {
//   color = 'yellow'
// } else if (color === '#008000') {
//   color = 'green'
// } else if (color === '#0000ff') {
//   color = 'blue'
// } else if (color === '#000080') {
//   color = 'navy'
// } else if (color === '#800080') {
//   color = 'purple'
// } else if (color === '#87ceeb') {
//   color = 'skyblue'
// } else if (color === '#a52a2a') {
//   color = 'brown'
// } else if (color === '#ffc0cb') {
//   color = 'pink'
// } else if (color === 'ffd700') {
//   color = 'gold'
// } else if (color === 'c0c0c0') {
//   color = 'silver'
// }

// interface propsType {
//   setInfoProcess() : any;
// }

const Input = (props: any) => {

  
  // ?????? ??????
  const [revData,setRevData] = useState('')
  const [color,setColor] = useState('')
  const handleChangeComplete = (col:any,event:any) => {
    
  let colorName = ''
  if (col.hex === '#ff0000') {
    colorName = 'red'
  } else if (col.hex === '#ffa500') {
    colorName = 'orange'
  } else if (col.hex === '#ffff00') {
    colorName = 'yellow'
  } else if (col.hex === '#008000') {
    colorName = 'green'
  } else if (col.hex === '#0000ff') {
    colorName = 'blue'
  } else if (col.hex === '#000080') {
    colorName = 'navy'
  } else if (col.hex === '#800080') {
    colorName = 'purple'
  } else if (col.hex === '#87ceeb') {
    colorName = 'skyblue'
  } else if (col.hex === '#a52a2a') {
    colorName = 'brown'
  } else if (col.hex === '#ffc0cb') {
    colorName = 'pink'
  } else if (col.hex === '#ffd700') {
    colorName = 'gold'
  } else if (col.hex === '#c0c0c0') {
    colorName = 'silver'
  }
    setColor(colorName)
    setInputStatus({
      ...inputStatus, nailartColor : colorName
    })
  }
  useEffect(() => {
  }, [color])
  
  
  

  let colorName = "";
  if (color === "#ff0000") {
    colorName = "red";
  } else if (color === "#ffa500") {
    colorName = "orange";
  } else if (color === "#ffff00") {
    colorName = "yellow";
  } else if (color === "#008000") {
    colorName = "green";
  } else if (color === "#0000ff") {
    colorName = "blue";
  } else if (color === "#000080") {
    colorName = "navy";
  } else if (color === "#800080") {
    colorName = "purple";
  } else if (color === "#87ceeb") {
    colorName = "skyblue";
  } else if (color === "#a52a2a") {
    colorName = "brown";
  } else if (color === "#ffc0cb") {
    colorName = "pink";
  } else if (color === "#ffd700") {
    colorName = "gold";
  } else if (color === "#c0c0c0") {
    colorName = "silver";
  }

  // ?????? ?????? ??????
  const [inputStatus, setInputStatus] = useState({
    nailartType : '',
    nailartWeather : '',
    nailartPrice : '',
    nailartColor : '',
    nailartDetailColor : '',
  })

  const onChangeInput = (e: any) => {
    setInputStatus({
      ...inputStatus,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // let test = 0
    // if (inputStatus.type != '') {
    //   test += 1
    // }
    // if (inputStatus.season != '') {
    //   test += 1
    // }
    // if (inputStatus.price != '') {
    //   test += 1
    // }
    // if (inputStatus.detailColor != '') {
    //   test += 1
    // } 
    props.setInfoProcess(inputStatus)
  }, [inputStatus])

  useEffect(() => {
  }, [inputStatus]);

  useEffect(() => {
    if (props.infoProcess) {
      setInputStatus({
        nailartType : props.infoProcess.nailartType,
        nailartWeather : props.infoProcess.nailartWeather,
        nailartPrice : props.infoProcess.nailartPrice,
        nailartColor : props.infoProcess.nailartColor,
        nailartDetailColor : props.infoProcess.nailartDetailColor,
      })
      setColor(props.infoProcess.nailartColor)
    }
  },[])

  return (
    <>
      <Wrapper>
        <div className="inputBox">
          <div className="inputBoxLeft">
            <select name="nailartType" id="lang" onChange={onChangeInput}>
              <option value="" >?????? ??????</option>
              <option value="???" selected={inputStatus.nailartType ==='???' ? true : false }>GEL NAIL</option>
              <option value="?????????" selected={inputStatus.nailartType ==='?????????' ? true : false }>FRENCH NAIL</option>
              <option value="????????????" selected={inputStatus.nailartType ==='????????????' ? true : false }>LINESTONE NANIL</option>
            </select>
            <select
              name="nailartWeather"
              id="lang"
              style={{ marginLeft: "20px" }}
              onChange={onChangeInput}
            >
              <option value="" >?????? ??????</option>
              <option value="???" selected={inputStatus.nailartWeather ==='???' ? true : false }>???</option>
              <option value="??????" selected={inputStatus.nailartWeather ==='??????' ? true : false }>??????</option>
              <option value="??????" selected={inputStatus.nailartWeather ==='??????' ? true : false }>??????</option>
              <option value="??????" selected={inputStatus.nailartWeather ==='??????' ? true : false }>??????</option>
            </select>
            <div className="inputs">
              <div>
                <input
                  name="nailartPrice"
                  className="underline"
                  type="text"
                  placeholder="??????"
                  onChange={onChangeInput}
                  value={inputStatus.nailartPrice}
                />
              </div>
              <div>
                <input
                  name="nailartDetailColor"
                  className="underline"
                  type="text"
                  placeholder="?????? ??????"
                  style={{ marginLeft: "20px" }}
                  onChange={onChangeInput}
                  value={inputStatus.nailartDetailColor}
                />
              </div>
            </div>
          </div>
          <div className="inputBoxRight">
            <div className="colorBoxLeft">
              <div style={{ marginBottom: "30px" }}>?????? ?????? ??????</div>
              <CirclePicker
                colors={[
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "navy",
                  "purple",
                  "skyblue",
                  "brown",
                  "pink",
                  "gold",
                  "silver",
                ]}
                circleSpacing={10}
                onChangeComplete={handleChangeComplete}
              />
            </div>
            <div className="colorBoxRight">
              <div style={{marginBottom:"20px"}}>?????? ??????({color?.toUpperCase()})</div>
              <div className="currentColor" style={{backgroundColor:`${color}`}}></div>

            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Input;