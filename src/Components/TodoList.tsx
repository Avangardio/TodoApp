import styles from '../Styles/TodoList.module.less'
import {collection, onSnapshot} from "firebase/firestore";
import {db} from '../firebase';
import {useEffect, useState} from 'react';
import Todo from "./Todo";

interface userProps {
    user: string
}

/**
 * Функция-компонент TodoList, ответственная за создание списка Задач.
 * @param {string} user - ID пользователя, который используется для работы с индексацией в базе данных.
 * @returns {<Todo/>} Элемент отдельной задачи.
 */
export default function TodoList({user}: userProps) {

    const [todos, setTodos] = useState<any[]>([]);

    useEffect(() => {
        /**
         * Функция из набора firebase, позволяющая наблюдать за документами в базе данных и обновляется каждый раз при изменение базы данных.
         * @returns {snapshot} Снэпшот данных с актуальной информации, который в последствии пройдет проверку на соответсвию пользовтялю перейдет в хук todos.
         */
        onSnapshot(collection(db, 'todos'), (snapshot) => {
            setTodos(
                Array.from(
                    snapshot.docs
                        .map((doc) => Object.assign({...doc.data(), id: doc.id}))
                        .filter(item => item['user'] === user)
                )
            );
        });
    }, []);

    return (
        <ul className={styles.TodoList}>
            {
                todos.map(item => {
                    return (
                        <Todo desc={item.desc} title={item.title} endingTime={item.endingTime} id={item.id}
                              completed={item.completed} files={item.files}/>
                    )
                })}
        </ul>
    )
}