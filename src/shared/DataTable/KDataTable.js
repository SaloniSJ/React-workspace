import React, { Fragment } from 'react'
import DataTable from 'react-data-table-component';
import Pagination from '../Pagination/Pagination';
import './style.css';

const customStyles = {
    rows: {
        style: {
            minHeight: '70px', // override the row height
        }
    },
    headCells: {
        style: {
            minHeight: '65px',
            textAlign: 'center',
            backgroundColor: '#5773ff',
            fontSize: '14px',
            color: 'white'

        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            pointer: 'cursor'
        },
    },
};

const KDataTable = (props) => {
    const { total_elements } = props;
    return (
        <Fragment>
            <DataTable
               {...props}
            />
            <div className="row pagination-parent-div" >
                <Pagination {...props} />
            </div>
            <div className="pagination-record-div">Total Records : {total_elements}</div>
        </Fragment>
    )
}

export default KDataTable;

