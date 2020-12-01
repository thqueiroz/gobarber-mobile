import React from 'react';
import { Image } from 'react-native';
import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import { Container, TextStyled, Back } from './styles';

const About = ({ navigation }) => {
  return (
      <Background>
          <Container>
              <Image source={logo} />
              <TextStyled>
                  Projeto desenvolvido para a matéria de Contrução de dispositivos móveis, Universidade de Vila Velha, 2020.
              </TextStyled>
              <Back onPress={() => navigation.navigate('SignIn')}>
                  <TextStyled>
                      Voltar
                  </TextStyled>
              </Back>
          </Container>
      </Background>
  );
}

export default About;