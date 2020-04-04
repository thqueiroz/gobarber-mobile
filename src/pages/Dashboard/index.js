import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

import api from '~/services/api';

export default function Dashboard() {
    const [appoitments, setAppointments] = useState([]);
    const isFocused = useIsFocused();

    async function loadAppointments() {
        const response = await api.get('appointments');

        setAppointments(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadAppointments();
        }
    }, [isFocused]);

    async function handleCncel(id) {
        const response = api.delete(`appoitment/${id}`);

        setAppointments(
            appoitments.map(appointment =>
                appointment.id === id
                    ? {
                          ...appointment,
                          canceled_at: response.data.canceled_at
                      }
                    : appointment
            )
        );
    }

    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>

                <List
                    data={appoitments}
                    KeyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Appointment
                            onCancel={() => handleCncel(item.id)}
                            data={item}
                        />
                    )}
                />
            </Container>
        </Background>
    );
}
