import styles from '../Styles/TodoCreactor.module.less'
import {addDoc, collection} from "firebase/firestore";
import {db} from '../firebase';
import React, {useState} from "react";
import GetToday from "./Functions/GetToday";

type newTodo = {
    title: string,
    desc: string,
    endingTime: string,
    completed: boolean,
    files: string[]
}

interface userProp {
    user: string
}

/**
 * Функция-компонент TodoCreator, ответственная за создание Задачи.
 * @param {string} user - ID Пользователя.
 * @returns {form} Форма для создания Новой задачи.
 */
export default function TodoCreator({user}: userProp) {

    const [newTodo, setNewTodo] = useState<newTodo>({
        title: 'Новая Задача',
        desc: 'Я - новая задача!',
        endingTime: '',
        completed: false,
        files: []
    });

    /**
     * Функция handleChange, ответственная за обработку изменения полей формы.
     */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTodo({...newTodo, [event.target.name]: event.target.value});
    }

    /**
     * Функция addTodo, ответственная за обработку отправки формы.
     * Принимает отправку формы и отправляет данные задачи в базу данных.
     */
    async function addTodo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await addDoc(collection(db, "todos"), {
            ...newTodo, user
        });
    };

    return (
        <form onSubmit={addTodo} className={styles.TodoCreactor}>
            <input placeholder={'Title'} name={'title'} value={newTodo.title} onChange={handleChange}/>
            <input placeholder={'Description'} name={'desc'} value={newTodo.desc} onChange={handleChange}/>
            <input placeholder={'Ending time'} name={'endingTime'} type={'date'} min={GetToday()} required={true}
                   value={newTodo.endingTime} onChange={handleChange}/>
            <button type={'submit'}>Create</button>
        </form>
    )
}
