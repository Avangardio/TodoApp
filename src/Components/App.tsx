import React, {useEffect, useState} from 'react';
import AppHeader from "./AppHeader";
import TodoCreator from "./TodoCreator";
import {getAuth, signInAnonymously} from "firebase/auth";
import TodoList from "./TodoList";


/**
 * Функция-компонент App, отвечающая за сборку всего приложения, а так же за определения и последующую передачу данных пользователя другим компонентам.
 * @returns Только надпись "Загрузка..." в случае, когда пользователь еще не был авторизован и остальное, когда авторизация прошла успешно.
 */
function App() {
    const [user, setUser] = useState<string>('');

    useEffect(() => {
        const auth = getAuth();
        /**
         * Функция из набора firebase, signInAnonymously обеспечивая анонимную аутентификацию пользователя в firebase
         * В случае успеха задает ID пользователя в виде строки.
         * @param {object} auth - Специальный обьект от firebase.
         */
        signInAnonymously(auth)
            .then(() => {
                setUser(auth.currentUser!.uid)
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }, []);

    if (!user) return <div>Загрузка...</div>;

    return (
        <>
            <AppHeader/>
            <TodoCreator user={user}/>
            <TodoList user={user}/>
        </>
    );
}

export default App;
