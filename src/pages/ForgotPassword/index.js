import React, { useRef, useState } from 'react';
import { Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText
} from './styles';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');

    const loading = useSelector(state => state.auth.loading);

    function handleSubmit() {
        Alert.alert('Enviamos um email com as informações necessárias para resetar senha.');
        navigation.goBack();
    }
    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="mail-outline"
                        KeyboardType="email-address"
                        autoorrect={false}
                        autoCapilalize="none"
                        placeholder="Digite seu email"
                        returnKeyType="next"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Enviar
                    </SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Voltar</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
