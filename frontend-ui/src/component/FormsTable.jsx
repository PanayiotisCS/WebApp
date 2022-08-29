import axios from 'axios';
import React, { useState, useEffect, useRef, useMemo } from 'react';

import { Container, Button } from 'react-bootstrap';
import UrlService from '../services/UrlService';
import { AgGridReact } from 'ag-grid-react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';


const FormsTable = ({ admin }) => {


    const gridRef = useRef();
    const navigate = useNavigate();

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

    const completeForm = (formId, e) => {
        e.preventDefault();
        navigate(`/Forms/${formId}`);
    }
    const editForm = (formId, e) => {
        e.preventDefault();
        navigate(`Forms/${formId}/edit`);
    }

    const deleteForm = async (id, e) => {
        e.preventDefault();

        if (id === -1) {
            toast.error('Something went wrong!');
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this form!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(UrlService.deleteForm(id))
                    .then(() => {
                        window.location.reload();
                        toast.success("Form deleted!");
                    });
            }
        })
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
                    <Button className={"btn-info me-1 mb-1"} onClick={(event) => editForm(params.data.id, event)}><BsFillPencilFill /></Button>
                    <Button className={"btn-danger mb-1"} onClick={(event) => deleteForm(params.data.id, event)}><BsFillTrashFill /></Button>
                </div>
            },
            sortable: false
        }
    ]);

    const [sColumnDefs] = useState([
        { headerName: 'DOCUMENT ID', field: 'i', filter: true },
        { headerName: 'TITLE', field: 'Title', filter: true },
        {
            headerName: 'ACTION',
            valueGetter: (params) => {
                return params.node.key;
            },
            cellRenderer: function (params) {
                return <div>
                    <Button className={"btn-success mb-1"} onClick={(event) => completeForm(params.data.id, event)}>VIEW</Button>
                </div>
            },
            sortable: false
        }
    ]);
    const defaultColDef = useMemo(() => ({
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
                <h2 className='border-bottom border-dark mt-2 pb-3'>Available forms</h2>

                <div className='ag-theme-alpine pt-2' style={gridStyle}>
                    
                    {admin === true
                        ?
                        <AgGridReact
                            ref={gridRef}
                            rowData={data}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            groupDisplayType="groupRows"
                            getRowId={getRowId}
                            pagination={true}
                            paginationPageSize={10}
                        />
                        :
                        <AgGridReact
                            ref={gridRef}
                            rowData={data}
                            columnDefs={sColumnDefs}
                            defaultColDef={defaultColDef}
                            groupDisplayType="groupRows"
                            getRowId={getRowId}
                            pagination={true}
                            paginationPageSize={10}
                        />
                    }

                </div>
            </Container>
        </Container>
    )
}

export default FormsTable;