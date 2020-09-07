import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

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

  useEffect(() => {
    getBarbers();
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
      Geolocation.getCurrentPosition((info) => {
        setCoords(info.coords);
        getBarbers();
      });
    }
  };

  const getBarbers = async () => {
    setLoading(true);

    setBarbers([]);
    const response = await Api.getBarbers();
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

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>

          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#7159c1" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#ccc"
            value={locationText}
            onChangeText={(text) => setLocationText(text)}
          />

          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="26" height="26" fill="#ccc" />
          </LocationFinder>
        </LocationArea>

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
