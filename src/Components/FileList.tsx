import styles from '../Styles/FileList.module.less'

interface filesProp {
    files: string[]
}

/**
 * Функция-компонент FileList, ответсвенная за вывод списка прикрепленных к задаче файлов.
 * @param {string[]} files - Массив с ссылками на файлы в базе данных.
 * Возвращает список элементов с ссылками на файлы.
 */
export default function FileList({files}: filesProp) {
    const fileNameRegexp = new RegExp('.*files%2F(.*\\..*)\\?.*', '')
    const fileList = files.map(file => {
        const link = file.match(fileNameRegexp)
        return <a href={link![0]} download={true}><p>{link![1]}</p></a>;
    })
    return (
        <div className={styles.FileList}>{fileList}</div>
    )
}