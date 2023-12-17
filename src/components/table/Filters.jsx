import React, { useContext, useEffect, useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  filtersDateElements,
  filtersSelectElements,
} from "../../utils/strings";
import { DATE_TYPES, FILTERS_LABELS } from "../../utils/constants";
import filterData from "../../utils/filter";
import Checkbox from "../common/Checkbox";
import Calendar from "../common/Calendar";
import Select from "../common/Select";
import { DataContext } from "../orders-table/OrdersTable";
import { FiltersContext } from "./Table";

const { CREATED_DATE, DELIVERED_DATE } = DATE_TYPES;
const { SHOW_FILTERS, HIDE_FILTERS } = FILTERS_LABELS;

const Filters = ({ setDisplayData, setPage }) => {
  const [filtersLabel, setFiltersLabel] = useState(SHOW_FILTERS);
  const { data } = useContext(DataContext);
  const { filters, setFilters } = useContext(FiltersContext);

  useEffect(() => {
    filterData(data, filters, setDisplayData, setPage);
  }, [data, filters]);

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
