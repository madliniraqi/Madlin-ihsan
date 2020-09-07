import React from 'react';
import styled from 'styled-components/native';

import Stars from '../components/Stars';

const Card = styled.TouchableOpacity`
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`;

const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
`;

const Infos = styled.View`
  margin-left: 20px;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #222;
`;

const SeeProfile = styled.View`
  width: 92px;
  height: 28px;
  border-radius: 10px;
  background-color: #7159c1;
  justify-content: center;
  align-items: center;
`;

const SeeProfileText = styled.Text`
  font-size: 15px;
  color: #fff;
`;

const BarberItem = ({barberData}) => {
  const {avatar, name, stars} = barberData;
  return (
    <Card>
      <Avatar source={{uri: avatar}} />
      <Infos>
        <UserName>{name}</UserName>

        <Stars stars={stars} showNumber />

        <SeeProfile>
          <SeeProfileText>Ver Perfil</SeeProfileText>
        </SeeProfile>
      </Infos>
    </Card>
  );
};

export default BarberItem;
