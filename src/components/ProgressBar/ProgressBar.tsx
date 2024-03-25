import styles from "@components/ProgressBar/ProgressBar.module.css";
import { ChangeEvent } from "react";
type Props = {
  max: number;
  value: number;

  onChange: (value: number) => void;
};
export default function ProgressBar({ max, value, onChange }: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(+newValue)
    }
  return (
    <input
      className={styles.styledProgressInput} // Применение стилей к ползунку
      type="range" // Тип элемента - ползунок
      min="0" // Минимальное значение ползунка
      max={max} // Максимальное значение, зависит от длительности аудио
      value={value} // Текущее значение ползунка
      step={0.01} // Шаг изменения значения
      onChange={handleChange} // Обработчик события изменения
    />
  );
}
