import axios from 'axios';
import React, { useState, useEffect, useRef, useMemo } from 'react';

import { Container, Button } from 'react-bootstrap';
import UrlService from '../services/UrlService';
import { AgGridReact } from 'ag-grid-react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineDownload } from 'react-icons/ai';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';

const FormsTable = ({ admin, userId }) => {

    const gridRef = useRef();
    const navigate = useNavigate();

    const gridStyle = useMemo(() => ({ height: 520 }), []);
    const [data, setData] = useState([]);



    const completeForm = (formId, e) => {
        e.preventDefault();
        navigate(`/Forms/${formId}`, { state: { userId: userId } });
    }
    const editForm = (formId, e) => {
        e.preventDefault();
        navigate(`Forms/${formId}/edit`);
    }

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })

        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const downloadAnswers = async (id, e) => {

        let dData = [];
        try {
            const response = await axios.get(UrlService.getFromForm(id))
            if (response.data.length) {
                console.log(data)
                for (let index = 0; index < response.data.length; index++) {
                    let tempArray = JSON.parse(response.data[index].structure);
                    dData.push(tempArray)
                }

                let str = JSON.stringify(dData)
                const rgx = /,|\{|\}/g;
                let jsonStr = str.replace(rgx, "\n");
                const rows = []
                const regex = /"question"\s*:\s*"(.*)"/g
                const rx = /"answer"\s*:(.*)/g
                let m;
                let y;
                let rowValues = []
                while ((m = regex.exec(jsonStr)) !== null && (y = rx.exec(jsonStr)) !== null) {
                    if ((m[1] !== "") && (y[1] !== "" && y[1] !== "[]")) {
                        rows.push(m[1], y[1])
                        rowValues.push(rows.join(','))
                    }
                }

                let headers = ['Questions, Answers']
                downloadFile({
                    data: [...headers, ...rowValues].join('\n'),
                    fileName: `forms_answers_${id}.csv`,
                    fileType: 'text/csv'
                })
            }else{
                toast.error("Cannot download an empty file.")
            }

        } catch (error) {
            toast.error("Cannot download an empty file.")
        }


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
                    <Button className={"btn-info me-1 mb-1"} data-toggle="tooltip" title="Edit form" onClick={(event) => editForm(params.data.id, event)}><BsFillPencilFill /></Button>
                    <Button className={"btn-danger me-1 mb-1"} data-toggle="tooltip" title="Delete form" onClick={(event) => deleteForm(params.data.id, event)}><BsFillTrashFill /></Button>
                    <Button className={"btn btn-light mb-1"} data-toggle="tooltip" title="Download form's answers" onClick={(event) => downloadAnswers(params.data.id, event)}><AiOutlineDownload /></Button>
                </div>
            },
            sortable: false
        },
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
                try {

                    const ans = await axios.get(UrlService.getFromForm(response.data[index].id));

                    setData(data => [...data, {
                        i: index + 1,
                        id: response.data[index].id,
                        Title: JSON.parse(response.data[index].structure)[0]['Title'],
                        Answers: ans.data.length
                    }]);
                } catch (error) {
                    console.log(error);
                }
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