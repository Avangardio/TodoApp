import styles from '../Styles/Todo.module.less';

import React, {useState} from "react";
import GetToday from "./Functions/GetToday";
import {deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {db, storage} from "../firebase";
import dayjs from "dayjs";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import FileList from "./FileList";


interface todoProps {
    desc: string
    title: string
    endingTime: string
    id?: string
    completed: boolean
    files: string[]
}

/**
 * Функция-компонент Todo, ответственная за создание и взаимодествие элемента задачи.
 * @param {string} title - Имя задачи.
 * @param {string} desc - Описание задач.
 * @param {string} endingTime - Дата окончания задачи.
 * @param {string} id - ID - значение задачи.
 * @param {boolean} completed - Статус задачи.
 * @param {string[]} files - Прикрепленные к задаче файлы.
 * @returns Элемент с задачей и возможностью взаимодействия с ней.
 */
export default function Todo({title, desc, endingTime, id, completed, files}: todoProps) {
    const [todo, setTodo] = useState<todoProps>({title, desc, endingTime, completed, files});

    const timeLeft = `${dayjs(todo.endingTime).diff(dayjs(), 'days')} дней.` === '0 дней.' ? 'Сегодня' : `${dayjs(todo.endingTime).diff(dayjs(), 'days')} дней.`

    /**
     *  Функция handleBlur, отвечающая за потерю фокуса компонентом.
     *  После потери фокуса определенных элементов смотрит на внутреннее значение элемента и записывает его в базу данных.
     */
    async function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
        const targetId = event.target.id;
        const changedTodo = Object.assign({...todo, [targetId]: event.target.textContent});
        await setDoc(doc(db, "todos", `${id}`), changedTodo, {merge: true})
            .catch(error => console.log(error))
    };


    /**
     * Функция deleteTodo, отвечающая за удаление Задачи из базы данных.
     * @param {string} id - ID выбранной для удаления задачи.
     */
    async function deleteTodo(id: string) {
        await deleteDoc(doc(db, 'todos', id));
    };

    /**
     * Функция completeTodo, отвечающая за выполнение Задачи и записи этого в базу данных.
     * @param {string} id - ID выбранной для удаления задачи.
     */
    async function completeTodo(id: string) {
        await updateDoc(doc(db, 'todos', id), {
            completed: true
        });
    };

    /**
     * Функция handleFilesUpdate, отвечающая за прикрепление файлов к определенной задачи и обновлении в бащу данных.
     * @param {string} id - ID выбранной для удаления задачи.
     */
    async function handleFilesUpdate(file: string) {
        await updateDoc(doc(db, 'todos', `${id}`), {
            files: [...todo.files, file]
        });
    };

    /**
     * Функция handleSubmit, отвечающая за загрузку конкретно файлов в базу данных с последующим вызовом handleFilesUpdate.
     */
    function handleSubmit(event: any) {
        event.preventDefault()
        const file = event.target[0].files[0]

        if (!file) return null;

        const storageRef = ref(storage, `files/${file.name}`);

        uploadBytes(storageRef, file)
            .then((snapshot) => {
                event.target[0].value = ''
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    handleFilesUpdate(downloadURL);
                });
            });
    };

    return (
        <li id={id}
            className={`${completed ? `${styles.Completed} ` : dayjs(endingTime).isBefore(dayjs(), "days") ? styles.Expired : styles.Pending}`}>

            <div id={'title'} className={styles.Title} contentEditable={true} onBlur={handleBlur}><b>{todo.title}</b>
            </div>
            <div id={'desc'} className={styles.Desc} contentEditable={true} onBlur={handleBlur}>{todo.desc}</div>
            <div
                id={'endingTime'}> {todo.endingTime < GetToday() ? 'Задача просрочена' : `Закончится через: ${timeLeft}`}</div>

            <div className={styles.FileCount}><b>{`Файлы: ${files.length}`}</b></div>
            <form onSubmit={handleSubmit}>
                <input type='file'/>
                <button type='submit'>Загрузить</button>
            </form>
            <FileList files={files}/>

            <button onClick={() => deleteTodo(id!)}>Удалить</button>
            {!completed ? <button onClick={() => completeTodo(id!)}>Выполнить</button> : null}
        </li>
    )
}