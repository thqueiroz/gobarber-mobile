/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';

import Background from '~/components/Background';
import DateTimeInput from '~/components/DateTimeInput';

import api from '~/services/api';

import { Container, HoursList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation, route }) {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);

    const { provider } = route.params;

    console.tron.warn(provider);

    useEffect(() => {
        async function loadAvailable() {
            const response = await api.get(
                `providers/${provider.id}/available`,
                {
                    params: {
                        date: date.getTime()
                    }
                }
            );

            setHours(response.data);
        }

        loadAvailable();
    }, [date, provider.id]);

    function handleSelectHour(time) {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Confirmar agendamento',
                params: {
                    provider,
                    time
                }
            })
        );
    }

    return (
        <Background>
            <Container>
                <DateTimeInput date={date} onChange={setDate} />

                <HoursList
                    data={hours}
                    KeyExtractor={item => String(item.time)}
                    renderItem={({ item }) => (
                        <Hour
                            onPress={() => handleSelectHour(item.value)}
                            enabled={item.available}
                        >
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}
