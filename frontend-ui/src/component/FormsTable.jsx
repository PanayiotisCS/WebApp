import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import UrlService from '../services/UrlService'
import { Pagination } from 'react-bootstrap';


const FormsTable = () => {


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

    const showPagination = () => {
        
    }
    useEffect(() => {
        const fetchData = async () => {
            setData([]);
            const response = await axios.get(UrlService.getForms());
            const size = response.data.length;

            for (let index = 0; index < size; index++) {

                setData(data => [...data, {
                    id: response.data[index].id,
                    Title: JSON.parse(response.data[index].structure)[0]['Title']
                }]);
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <Container>
                <h2>Current forms</h2>
                <Table className='mt-4 table-striped'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{item.Title}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className='float-end'>
                    {showPagination()}
                </div>
            </Container>
        </Container>
    )
}

export default FormsTable;