import React from 'react';
import { Input, CustomInput } from 'reactstrap';

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render('Filter')}
    </div>
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
