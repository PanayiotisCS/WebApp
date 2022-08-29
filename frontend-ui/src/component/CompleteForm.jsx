import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';

import axios from 'axios';

import DashboardHeader from './DashboardHeader'
import UrlService from '../services/UrlService';
import Checkbox from './Checkbox';
import Radio from './Radio';
import DropDown from './DropDown';

const CompleteForm = () => {

    const { formId } = useParams();
    const [title, setTitle] = useState('');

    const [inviteMembers, setInviteMembers] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const navigate = useNavigate();

    //handle email row change
    const handleMemberChange = (id, event) => {
        //find the index to be changed
        const index = inviteMembers.findIndex((m) => m.id === id)

        let _inviteMembers = [...inviteMembers]
        _inviteMembers[index][event.target.name] = event.target.value
        setInviteMembers(_inviteMembers)
    }

    useEffect(() => {
        const fetchData = async () => {
            //try {
            // Empty data before rendering

            setInviteMembers([]);
            setTeamMembers([]);
            const response = await axios.get(UrlService.getForm(formId));
            console.log(JSON.parse(response.data.structure));
            if (response.data) {

                setTitle(JSON.parse(response.data.structure)[0]['Title'])

                // Set single input data
                const input_size = JSON.parse(response.data.structure)[0]['Input'].length;
                const InputFields = JSON.parse(response.data.structure)[0]['Input'];

                for (let index = 0; index < input_size; index++) {
                    setInviteMembers(inviteMembers => [
                        ...inviteMembers,
                        {
                            question: InputFields[index]['question'],
                            answer: '',
                            id: InputFields[index]['id']
                        }
                    ])
                }

                // Set team data
                const data_size = JSON.parse(response.data.structure)[0]['Data'].length;
                const DataFields = JSON.parse(response.data.structure)[0]['Data'];

                for (let index = 0; index < data_size; index++) {
                    let _members = DataFields[index]['members'];
                    let array = [];
                    _members.forEach(element => {

                        array.push({
                            question: element.question,
                            answer: '',
                            id: element.id
                        })
                    });

                    setTeamMembers(inviteMembers => [
                        ...inviteMembers,
                        {
                            type: DataFields[index]['type'],
                            question: DataFields[index]['question'],
                            members: array
                        }
                    ])
                }
            }
            //} catch (error) {
            //navigate('/Not-found')
            // }
        }

        fetchData();

    }, [])


    function Components({team}){
        switch(team.type){
            case '':
                return null;
            case 'Checkbox':
                return <Checkbox team={team}/>
            case 'Radio':
                return <Radio team={team} />
            case 'Dropdown':
                return <DropDown team={team}/>
        }
    }

    const saveData = (e) => {
        e.preventDefault();


        const answer = [
            inviteMembers,
            teamMembers
        ]

        console.log(answer);
    }


    return (
        <div className="App">
            <DashboardHeader />
            <div className="container-fluid">
                <div className="row">
                    <main>
                        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                            <h1 className='h2'>Complete Form</h1>
                        </div>
                        <div className=" justify-content-between flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <Button type="button" className="btn btn-primary float-start" onClick={() => navigate(-1)}><BiArrowBack />Back</Button>
                        </div>
                        <Container>
                            <Form>
                                <h3>{title}</h3>
                                {inviteMembers.map((member) => (
                                    <Form.Group>
                                        <Form.Label>{member.question}</Form.Label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="question"
                                            placeholder={member.question}
                                            value={member.answer}
                                            onChange={(e) => handleMemberChange(member.id, e)}
                                        />
                                    </Form.Group>
                                ))}
                                <div className='border-top border-black mt-3'>
                                    {teamMembers.map((team) => (
                                        // add drop down or check box here
                                        <Form.Group>
                                            <Form.Label>{team.question}</Form.Label>
                                            <Components team={team} />
                                        </Form.Group>
                                    ))}
                                </div>
                            </Form>
                            <Button type='submit' className='btn-success' onClick={saveData}>Submit Form</Button>
                        </Container>
                    </main>
                </div>
            </div>
        </div>
    )
}


export default CompleteForm