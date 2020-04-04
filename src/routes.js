import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const LoginStack = createStackNavigator();
const TabDashboard = createBottomTabNavigator();
const newStack = createStackNavigator();

export default function Routes({ signedIn }) {
    function newStackScreen() {
        return (
            <newStack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    resetOnBur: true,
                    headerLeftContainerStyle: {
                        marginLeft: 20
                    }
                }}
            >
                <newStack.Screen
                    name="Selecione prestador"
                    component={SelectProvider}
                />
                <newStack.Screen
                    name="Selecione o horarário"
                    component={SelectDateTime}
                />
                <newStack.Screen
                    name="Confirmar agendamento"
                    component={Confirm}
                />
            </newStack.Navigator>
        );
    }
    return (
        <NavigationContainer>
            {!signedIn ? (
                <LoginStack.Navigator screenOptions={{ headerShown: false }}>
                    <LoginStack.Screen name="SignIn" component={SignIn} />
                    <LoginStack.Screen name="SignUp" component={SignUp} />
                </LoginStack.Navigator>
            ) : (
                <TabDashboard.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: () => {
                            let iconName;

                            if (route.name === 'Dahboard') {
                                iconName = 'event';
                            }

                            if (route.name === 'Meu Perfil') {
                                iconName = 'person';
                            }
                            if (route.name === 'Agendar') {
                                iconName = 'add-circle-outline';
                            }
                            return (
                                <Icon name={iconName} size={20} color="#fff" />
                            );
                        }
                    })}
                    tabBarOptions={{
                        keyboardHidesTabBar: true,
                        activeTintColor: '#fff',
                        inactiveTintColor: 'rgba(255,255,255, 0.6)',
                        style: {
                            backgroundColor: '#8d41a8'
                        }
                    }}
                >
                    <TabDashboard.Screen
                        name="Dahboard"
                        component={Dashboard}
                    />
                    <TabDashboard.Screen
                        name="Agendar"
                        component={newStackScreen}
                    />
                    <TabDashboard.Screen
                        name="Meu Perfil"
                        component={Profile}
                    />
                </TabDashboard.Navigator>
            )}
        </NavigationContainer>
    );
}
