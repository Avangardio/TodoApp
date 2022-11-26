import dayjs from "dayjs";

/**
 * Функция по получению сегодняшней даты в ГОД\МЕСЯЦ\ДЕНЬ с использованием dayjs.
 */
export default function GetToday(): string {
    return dayjs().format('YYYY-MM-DD');
}