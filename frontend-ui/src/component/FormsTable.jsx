import axios from 'axios';
import React, { useState, useEffect, useRef, useMemo } from 'react';

import { Container, Button } from 'react-bootstrap';
import UrlService from '../services/UrlService';
import { AgGridReact } from 'ag-grid-react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { toast } from "react-toastify";
import swal from 'sweetalert';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const FormsTable = () => {

    
    const gridRef = useRef();

    const gridStyle = useMemo(() => ({ height: 520 }), []);
    const [data, setData] = useState(
        [
            // {
            //     id: '', 
            //     Title: '', 
            //     Input: [
            //         {
            //             question: '',
            //             id: ''
            //         }
            //     ],
            //     Data: [
            //         {
            //             id: '',
            //             type: '',
            //             question: '',
            //             members: [
            //                 {
            //                     question: '',
            //                     id: ''
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ]
    );

    const editForm = async (id, e) => {

        // Complete edit
    }

    const deleteForm = async (id, e) => {
        e.preventDefault();
        
        if (id === -1){
            toast.error('Something went wrong!');
        }

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this form!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then((willDelete) => {
            if(willDelete){
                return axios.delete(UrlService.deleteForm(id));
            }
        })
        .then((response) =>{
            window.location.reload();
            toast.success("Form deleted!");
        })
        .catch((err) => {
            toast.error(err);
        });
    }

    const [columnDefs] = useState([
        { headerName: 'DOCUMENT ID', field: 'i', filter: true },
        { headerName: 'TITLE', field: 'Title', filter: true },
        { headerName: 'TOTAL ANSWERS', field: 'Answers', filter: true },
        {
            headerName: 'ACTIONS',
            valueGetter: (params) => {
                return params.node.key;
            },
            cellRenderer: function (params) {
                return <div>
                    <Button className={"btn-info me-1"} onClick={(event) => editForm(params.data.id, event)}><BsFillPencilFill /></Button>
                    <Button className={"btn-danger"} onClick={(event) => deleteForm(params.data.id, event)}><BsFillTrashFill /></Button>
                </div>
            },
            sortable: false
        }
    ]);

    const defalutColDef = useMemo(() => ({
        sortable: true,
        flex: 1,
        resizable: true
    }));

    const getRowId = useMemo(() => {
        return (params) => params.data.id;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setData([]);
            const response = await axios.get(UrlService.getForms());
            const size = response.data.length;

            for (let index = 0; index < size; index++) {

                setData(data => [...data, {
                    i: index + 1,
                    id: response.data[index].id,
                    Title: JSON.parse(response.data[index].structure)[0]['Title'],
                    Answers: response.data[index].answers.length
                }]);
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <Container>
                <h2>Current forms</h2>

                <div className='ag-theme-alpine' style={gridStyle}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={data}
                        columnDefs={columnDefs}
                        defaultColDef={defalutColDef}
                        groupDisplayType="groupRows"
                        getRowId={getRowId}
                        pagination={true}
                        paginationPageSize={10}
                    />
                </div>
            </Container>
        </Container>
    )
}

export default FormsTable;