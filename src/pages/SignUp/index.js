import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Background from '~/components/Background';
import logo from '~/assets/logo.png';
import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText
} from './styles';

import { signUpRequest } from '~/store/modules/auth/actions';

export default function SignUp({ navigation }) {
    const dispath = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loading = useSelector(state => state.auth.loading);

    function handleSubmit() {
        dispath(signUpRequest(name, email, password));
    }
    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoorrect={false}
                        autoCapilalize="none"
                        placeholder="Nome completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />
                    <FormInput
                        icon="mail-outline"
                        KeyboardType="email-address"
                        autoorrect={false}
                        autoCapilalize="none"
                        placeholder="Digite seu email"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha secreta"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Criar conta
                    </SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Já tenho conta</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}