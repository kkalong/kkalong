import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SpaoIcon from "../../assets/icon/Brand/spao.png";
import HnMIcon from "../../assets/icon/Brand/h&m.png";
import EightSecondsIcon from "../../assets/icon/Brand/eight.png";
import ZaraIcon from "../../assets/icon/Brand/zara.png";
import Search from "../../components/ui/Search";

import SearchIcon from '../../assets/icon/Nav/search.png'

import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";

import axios from '../../api/axios'
import requests from '../../api/requests'
import { useAppDispatch, useAppSelector } from './../../hooks/reduxHook';
import { getBrand } from "../../redux/modules/Brand";

interface BrandType {
  img: string;
  name: string;
  // brand_id: number;
}

export default function VirtualBrandChoice() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { Brands } = useAppSelector(state => state.Brand)
  const [Brand, setBrand] = useState(Array<BrandType>);
  const [SearchBrandList, setSearchBrandList] = useState(Array<BrandType>)

  const [IsSearch, setIsSearch] = useState(false)
  const [IsModal, setIsModal] = useState(false)


  useEffect(() => {
    dispatch(getBrand())
    setBrand(Brands)
  }, [Brands]);

  // filter 로 구현할 예정임
  const SearchBrand = async(Text: string) => {
    setIsSearch(true)
    const list = Brand.filter(brand => {
      return brand.name.includes(Text)
    })
    setSearchBrandList(list)
    
  }

  return (
    <VirtualBrandChoiceDiv>
      <TopNav type={"menu"}>
        <VirtualBrandChoiceText>브랜드 선택</VirtualBrandChoiceText>
        <SearchImg src={SearchIcon} onClick={()=>setIsModal(!IsModal)}/>
      </TopNav>
      <Search Search={SearchBrand} Open={IsModal} StopSearch={()=>setIsSearch(false)}>브랜드 검색</Search>
      <VirtualBrandButtonDiv>
        {/* 검색중이 아닐때 나옴 */}
        {!IsSearch && Brand.length && Brand.map((logo, idx) => {
          return (
              <VirtualBrandButton
                src={logo.img}
                onClick={() => navigate(`${idx}`, { state: logo })}
              />
          );
        })}
        
        {/* 검색중 */}
        {IsSearch && SearchBrandList.length &&
          SearchBrandList.map((logo, idx) => {
            return (
                <VirtualBrandButton
                  src={logo.img}
                  onClick={() => navigate(`${idx}`, { state: logo })}
                />
            )
          })}

        {IsSearch && !SearchBrandList.length && <NoData>검색 결과가 없습니다</NoData>}


      </VirtualBrandButtonDiv>
      <FooterBar/>
    </VirtualBrandChoiceDiv>
  );
}

//가상피팅 브랜드 선택 div
const VirtualBrandChoiceDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;

const VirtualBrandChoiceText = styled.span`
  font-family: var(--base-font-600);
`;


const VirtualBrandButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const VirtualBrandButton = styled.img`
  width: 90px;
  height: 50px;
  margin: 9px;
  padding: 5px;
  border: 1px solid var(--primary-color-500);
  border-radius: 20px;
`;

export const NoData = styled.div`
  font-family: var(--base-font-300);
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 5px;
`

const SearchImg = styled.img`
  width: 20px;
  height: 20px;
  padding: 8px 18px;
`