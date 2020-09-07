import React from 'react';
import './Pagination.scss';

/* high number of records are not supported by API without key (free version), beyond which a payload size error will be thrown */
const MAX_SUPPORTED_INT = 100;

export const pageSizes = [25, 50, MAX_SUPPORTED_INT];

interface Props {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}
export default function Paginator({ pageSize, setPageSize }: Props) {
  return (
    <div className='page-size-options'>
      View
      {pageSizes.map(size => (
        <button
          className={`button-link ${
            pageSize === size ? 'button-link-active' : ''
          }`}
          key={size}
          onClick={() => setPageSize(size)}>
          {size !== MAX_SUPPORTED_INT ? size : 'All'}
        </button>
      ))}
    </div>
  );
}
