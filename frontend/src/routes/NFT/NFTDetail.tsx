import UpperFrame from '../../components/NFTDetail/UpperFrame'
import styled from 'styled-components'
import LowerFrame from '../../components/NFTDetail/LowerFrame'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { countView } from '../../store/api'

const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }

  
  max-width:1300px;
  margin : 0 auto;
  margin-top:150px;
  @media screen and (max-width: 767px) {
    height:1300px;
    UpperFrame {
      // height :1300px;
    }
    LowerFrame {
      margin-top:50px;
    }

  
  }
`

const NFTDetail = () => {
  const param = useParams().id
  
  useEffect(() => {
    // countView(param)
  },[])
  return (
    <Wrapper>
      <UpperFrame />
      <LowerFrame />
    </Wrapper>
      
    
  )
}

export default NFTDetail