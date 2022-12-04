import React from 'react';
import { Input, CustomInput } from 'reactstrap';

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render('Filter')}
    </div>
  );
};

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search (${length}) ...`}
    />
  );
};

  // return (
  //   // <Input
  //   //   id='custom-select'
  //   //   type='select'
  //   //   value={filterValue}
  //   //   onChange={(e) => {
  //   //     setFilter(e.target.value || undefined);
  //   //   }}
  //   // >
  //   //   <option value=''>All</option>
  //   //   {options.map((option) => (
  //   //     <option key={option} value={option}>
  //   //       {option}
  //   //     </option>
  //   //   ))}
  //   // </Input>
  // );
};
