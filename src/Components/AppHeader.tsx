import styles from '../Styles/AppHeader.module.less'

/**
 * Функция-компонент AppHeader
 * Является заголовком приложения
 * @returns Текстовый заголовок
 */
export default function AppHeader() {
    return (
        <div className={styles.AppHeader}>
            Добавьте новую задачу
        </div>
    )
}