import React, { useEffect, useState } from 'react';
import { CommonActions } from '@react-navigation/native';

import Background from '~/components/Background';

import api from '~/services/api';

import { Container, ProviderList, Provider, Avatar, Name } from './styles';

export default function SelectProvider({ navigation }) {
    const [providers, setProviders] = useState();

    useEffect(() => {
        async function loadproviders() {
            const response = await api.get('providers');
            setProviders(response.data);
        }
        loadproviders();
    }, []);
    return (
        <Background>
            <Container>
                <ProviderList
                    data={providers}
                    KeyExtractor={item => String(item.id)}
                    renderItem={({ item: provider }) => (
                        <Provider
                            onPress={() =>
                                navigation.dispatch(
                                    CommonActions.navigate({
                                        name: 'Selecione o horarário',
                                        params: {
                                            provider
                                        }
                                    })
                                )
                            }
                        >
                            <Avatar
                                source={{
                                    uri: provider.avatar
                                        ? provider.avatar.url
                                        : `https://api.adorable.io/avatar/50/${provider.name}.png`
                                }}
                            />
                            <Name>{provider.name}</Name>
                        </Provider>
                    )}
                />
            </Container>
        </Background>
    );
}
