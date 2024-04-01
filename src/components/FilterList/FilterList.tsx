import styles from "@components/FilterList/FilterList.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setFilter } from "../../store/features/tracks/tracksSlice";
import classNames from "classnames";

type Props = {
  list: string[];
  filterName: string;
};
export const FilterList = ({ list, filterName }: Props) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.tracks);
  const onClick = ({ filterValue }: { filterValue: string }) => {
    dispatch(setFilter({ filterName, filterValue }));
  };
  return (
    <div className={styles.filterWrapper}>
      <ul className={styles.filterList}>
        {list?.map((item, index) => (
          <li
            onClick={() => onClick({ filterValue: item })}
            className={classNames(styles.li, {
              [styles.active]:
                filterName === "order"
                  ? filters.order === item
                  : filters[filterName].includes(item.toLowerCase()),
            })}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
