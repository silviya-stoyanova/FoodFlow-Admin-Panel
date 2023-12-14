import React, { useEffect, useState } from "react";
import { filtersDateElements, filtersSelectElements } from "../../utils/strings";
import { DATE_TYPES, FILTERS_LABELS } from "../../utils/constants";
import { reverseDate } from "../../utils/common";
import Calendar from "../common/Calendar";
import Select from "../common/Select";
import Checkbox from "../common/Checkbox";

const { CREATED_DATE, DELIVERED_DATE } = DATE_TYPES;
const { SHOW_FILTERS, HIDE_FILTERS } = FILTERS_LABELS;

const Filters = ({ data, setDisplayData }) => {
  const [filters, setFilters] = useState({});
  const [filtersLabel, setFiltersLabel] = useState(SHOW_FILTERS);

  useEffect(() => {
    filterData();
  }, [data, filters]);

  const filterData = () => {
    const filteredData = data.filter((item) => {
      let match = true;

      for (const key in filters) {
        const startDate = filters[key].start;
        const endDate = filters[key].end;
        const startDateFormatted =
          startDate && new Date(reverseDate(startDate));
        const endDateFormatted = endDate && new Date(reverseDate(endDate));

        // if column does not store Date
        if (key !== CREATED_DATE && key !== DELIVERED_DATE) {
          if (item[key].toString() !== filters[key].toString()) {
            match = false;
            break;
          }
        } else {
          if (startDate && endDate) {
            if (
              item[key] >= startDateFormatted &&
              item[key] <= endDateFormatted
            ) {
              match = true;
            } else {
              match = false;
              break;
            }
          } else if (startDate) {
            if (item[key] < new Date(reverseDate(startDate))) {
              match = false;
              break;
            }
          } else if (endDate) {
            if (item[key] > endDateFormatted || item[key] === "") {
              match = false;
              break;
            }
          }
        }
      }

      return match;
    });
    setDisplayData(filteredData);
  };

  const onFilterChange = (e, column = null, type = null) => {
    const { name, value } = e.target;

    setFilters((prevFilters) =>
      value === ""
        ? ((prevFilters) => {
            if (column === CREATED_DATE || DELIVERED_DATE) {
              const { [column]: oldFilter, ...rest } = prevFilters;
              const { [type]: oldFilterType, ...otherOldFilterTypes } =
                oldFilter;

              return { [column]: otherOldFilterTypes, ...rest };
            } else {
              const { [name]: oldFilter, ...rest } = prevFilters;
              return rest;
            }
          })(prevFilters)
        : Date.parse(value)
        ? {
            ...prevFilters,
            [column]: {
              ...prevFilters[column],
              [type]: value,
            },
          }
        : { ...prevFilters, [name]: value }
    );
  };

  const changeFiltersLabel = () => {
    return setFiltersLabel((prevToggleFiltersText) =>
      prevToggleFiltersText === SHOW_FILTERS ? HIDE_FILTERS : SHOW_FILTERS
    );
  };

  return (
    <>
      <Checkbox
        id="toggle-filters"
        label={filtersLabel}
        labelClassName="toggle-filters-button"
        onChange={changeFiltersLabel}
      />
      <article className="filters">
        {filtersDateElements.map(({ labelText, column, type }, index) => (
          <Calendar
            key={index}
            labelText={labelText}
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
            />
          )
        )}
      </article>
    </>
  );
};

export default Filters;
