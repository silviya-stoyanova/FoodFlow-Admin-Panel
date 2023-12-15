import React, { useContext, useEffect, useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  filtersDateElements,
  filtersSelectElements,
} from "../../utils/strings";
import { DATE_TYPES, FILTERS_LABELS } from "../../utils/constants";
import { checkIsInRange, reverseDate } from "../../utils/common";
import Checkbox from "../common/Checkbox";
import Calendar from "../common/Calendar";
import Select from "../common/Select";
import { DataContext } from "../orders-table/OrdersTable";

const { CREATED_DATE, DELIVERED_DATE } = DATE_TYPES;
const { SHOW_FILTERS, HIDE_FILTERS } = FILTERS_LABELS;

const Filters = ({ data, setDisplayData }) => {
  const [filters, setFilters] = useState({});
  const [filtersLabel, setFiltersLabel] = useState(SHOW_FILTERS);
  const { data } = useContext(DataContext);

  useEffect(() => {
    filterData();
  }, [data, filters]);

  const filterData = () => {
    const filteredData = data.filter((item) => {
      for (const key in filters) {
        const { start: startDate, end: endDate } = filters[key];
        const startDateFormatted =
          startDate && new Date(reverseDate(startDate));
        const endDateFormatted = endDate && new Date(reverseDate(endDate));
        const isInRange = checkIsInRange(
          item[key],
          startDateFormatted,
          endDateFormatted
        );
        const isBeforeStartDate =
          startDate && item[key] < new Date(reverseDate(startDate));
        const isAfterEndDate =
          item[key] > endDateFormatted || item[key].length === 0;
        const areDifferent = item[key].toString() !== filters[key].toString();

        // if column does not store Date
        if (key !== CREATED_DATE && key !== DELIVERED_DATE && areDifferent) {
          return false;
        }
        if (startDate && endDate && !isInRange) {
          return false;
        }
        if (startDate && isBeforeStartDate) {
          return false;
        }
        if (endDate && isAfterEndDate) {
          return false;
        }
      }

      return true;
    });
    setDisplayData(filteredData);
  };

  const onFilterChange = (e, column = null, type = null) => {
    const { name, value } = e.target;

    setFilters(
      (prevFilters) =>
        value === "" // When filters are removed.
          ? ((prevFilters) => {
              if (column === CREATED_DATE || column === DELIVERED_DATE) {
                const { [column]: oldFilter, ...rest } = prevFilters;
                const { [type]: oldFilterType, ...otherOldFilterTypes } =
                  oldFilter;
                return { [column]: otherOldFilterTypes, ...rest };
              } else {
                const { [name]: oldFilter, ...rest } = prevFilters;
                return rest;
              }
            })(prevFilters)
          : Date.parse(value) // When a filter by date is applied.
          ? {
              ...prevFilters,
              [column]: {
                ...prevFilters[column],
                [type]: value,
              },
            }
          : { ...prevFilters, [name]: value } // When filter by any of the other fields is applied.
    );
  };

  const changeFiltersLabel = () =>
    setFiltersLabel((prevToggleFiltersText) =>
      prevToggleFiltersText === SHOW_FILTERS ? HIDE_FILTERS : SHOW_FILTERS
    );

  return (
    <>
      <Checkbox
        id="toggle-filters"
        label={filtersLabel}
        labelClassName="toggle-filters-button"
        onChange={changeFiltersLabel}
        icon={faFilter}
      />
      <article className="filters">
        {filtersDateElements.map(({ labelText, column, type }, index) => (
          <Calendar
            key={index}
            labelText={labelText}
            className="filters-calendar"
            labelClassName="filters-label"
            onChange={(e) => onFilterChange(e, column, type)}
          />
        ))}
        {filtersSelectElements.map(
          ({ name, options, values, labelText }, index) => (
            <Select
              key={index}
              onChange={onFilterChange}
              name={name}
              options={options}
              values={values}
              labelText={labelText}
              className="filters-select"
              labelClassName="filters-label"
            />
          )
        )}
      </article>
    </>
  );
};

export default Filters;
