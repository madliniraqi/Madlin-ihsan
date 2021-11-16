import React, {useContext} from 'react';
import styled from 'styled-components/native';
import { Linking } from 'react-native';
import {UserContext} from '../contexts/UserContext';

import HomeIcon from '../assets/homeicon.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';
import Instalogo from '../assets/insta.svg';
import Navilogo from '../assets/loca.svg';
import Infologo from '../assets/info.svg';

const TabArea = styled.View`
  height: 60px;
  background-color: #333;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CenterTabItem = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #B8E2D6;
  border-radius: 35px;
  border: 3px solid green;
  margin-top: -20px;
`;

const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 24px;
`;

const CustomTabBar = ({state, navigation}) => {
  const {state: user} = useContext(UserContext);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon
          width="34"
          height="34"
          fill={state.index === 0 ? '#fff' : '#777'}
        />
      </TabItem>


         <TabItem onPress={() => Linking.openURL('https://www.instagram.com/nidalrifaat/?hl=en')}>
           <Instalogo
          width="34"
          height="34"
          fill={state.index === 0 ? '#fff' : '#777'}
        />
      </TabItem>

     

      <CenterTabItem onPress={() => goTo('Appointments')}>
        <TodayIcon width="32" height="32" fill="white" />
      </CenterTabItem>

      

           <TabItem onPress={() =>
            Linking.openURL('https://www.google.com/maps/dir/32.2353993,34.9633041/Derech+E-Sultani,+Tira/@32.2354481,34.9634275,21z/data=!4m8!4m7!1m0!1m5!1m1!1s0x151d3c3d1e8aa0e5:0xc8c24510a701c5d7!2m2!1d34.9633053!2d32.2353936')}>
      <Navilogo
          width="35"
          height="35"
          fill={state.index === 0 ? '#fff' : '#777'}
        />
      </TabItem>


     

       <TabItem onPress={() => goTo('Info')}>
        <Infologo
          width="35"
          height="35"
                fill={state.index === 0 ? '#fff' : '#777'}
        />
      </TabItem>






    </TabArea>
  );
};

export default CustomTabBar;