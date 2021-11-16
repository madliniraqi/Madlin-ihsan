import React, {useState, useEffect} from 'react';
import { View, StyleSheet,  Text, Button ,Image} from 'react-native';
import {Platform, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import BarberLogo from '../../assets/preloadlogo.svg';
 
 

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  BarbersArea,
  LogoArea,
} from './styles';

import Api from '../../Api';

import BarberItem from '../../components/BarberItem';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

const Home = () => {
  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [barbers, setBarbers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getBarbers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigation = useNavigation();

  const handleLocationFinder = async () => {
    setCoords(null);

    let permissionRequest =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    let permissionResult = await request(permissionRequest);

    if (permissionResult === 'granted') {
      setLoading(true);

      setLocationText('');
      setBarbers([]);
      Geolocation.getCurrentPosition(
        (info) => {
          setCoords(info.coords);
          getBarbers();
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 2000,
          maximumAge: 3600000,
        },
      );
    }
  };

  const getBarbers = async () => {
    setLoading(true);

    setBarbers([]);

    let lat = null;
    let lng = null;

    if (coords) {
      lat = coords.latitude;
      lng = coords.longitude;
    }

    const response = await Api.getBarbers(lat, lng, locationText);
    if (response.error === '') {
      if (response.loc) {
        setLocationText(response.loc);
      }

      setBarbers(response.data);
    } else {
      // eslint-disable-next-line no-alert
      alert(`Error: ${response.error}`);
    }

    setLoading(false);
  };

  const handleOnRefresh = () => {
    setRefreshing(false);
    getBarbers();
  };

  const handleLocationSearch = () => {
    setCoords({});
    getBarbers();
  };

  return (


    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }>
        
   
     
      <LogoArea>
      <View >
        <Image source={require('../../assets/nidallogo.jpeg')} style ={{width:300 ,height:300}} />
     </View> 
      </LogoArea>  
       

        

        {loading && <LoadingIcon size="large" color="#fff" />}

        <BarbersArea>
          {barbers.map((barber, index) => (
            <BarberItem key={index} barberData={barber} />
          ))}
        </BarbersArea>
      </Scroller>
    </Container>
  );
};

export default Home;