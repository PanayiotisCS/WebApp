import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';

import axios from 'axios';

import DashboardHeader from './DashboardHeader'
import UrlService from '../services/UrlService';
import { toast } from 'react-toastify';


const CompleteForm = () => {

    const { formId } = useParams();
    const [title, setTitle] = useState('');
    const [uid, setUid] = useState();

    const [inviteMembers, setInviteMembers] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();


    //handle email row change
    const handleMemberChange = (id, event) => {
        //find the index to be changed
        const index = inviteMembers.findIndex((m) => m.id === id)

        let _inviteMembers = [...inviteMembers]
        _inviteMembers[index][event.target.name] = event.target.value
        // console.log(event.target);
        setInviteMembers(_inviteMembers)
    }

    const handleTeamMemberChange = (id, teamId, event) => {
        const index = teamMembers.findIndex((m) => m.id === teamId)

        let _teamMembers = [...teamMembers]

        if (_teamMembers[index]['answer'].indexOf(event.target.value) <= -1) {

            if (event.target.type === 'radio') {
                _teamMembers[index]['answer'] = []
            }
            _teamMembers[index]['answer'].push(event.target.value)
            _teamMembers[index]['members'][id].checked = true;
        }

        setTeamMembers(_teamMembers)
    }

    useEffect(() => {
        const fetchData = async () => {
            //try {
            // Empty data before rendering

            setInviteMembers([]);
            setTeamMembers([]);

            const response = await axios.get(UrlService.getForm(formId));

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
                    _members.forEach((element, i) => {

                        array.push({
                            question: element.question,
                            index: i,
                            checked: false,
                            id: element.id
                        })
                    });

                    setTeamMembers(inviteMembers => [
                        ...inviteMembers,
                        {
                            type: DataFields[index]['type'],
                            question: DataFields[index]['question'],
                            members: array,
                            answer: [],
                        }
                    ])
                }
            }
            //} catch (error) {
            //navigate('/Not-found')
            // }
        }

        fetchData();
        setUid(location.state.userId);
    }, [])




    function Components({ team }) {
        switch (team.type) {
            case '':
                return null;
            case 'Checkbox':
                return <Checkbox team={team} />
            case 'Radio':
                return <Radio team={team} />
            case 'Dropdown':
                return <DropDown team={team} />
        }
    }

    function Checkbox({ team }) {
        return (
            <>
                {team.members.map((element) => (

                    <Form.Check
                        key={element.id}
                        type='Checkbox'
                        label={element.question}
                        id={element.id}
                        value={element.question}
                        onChange={(e) => handleTeamMemberChange(element.index, team.id, e)}
                    />
                ))}
            </>
        )
    }

    function Radio({ team }) {
        return (
            <>
                {team.members.map((element) => (
                    <div key={element.id}>
                        <Form.Check
                            type='Radio'
                            label={element.question}
                            id={element.id}
                            name='answer'
                            value={element.question}
                            checked={element.checked}
                            isValid={true}
                            onChange={(e) => handleTeamMemberChange(element.index, team.id, e)}
                        />
                    </div>
                ))}


            </>
        )
    }

    function DropDown({ team }) {
        return (
            <>
                {team.members.map((element) => (
                    <div key={element.id}>
                        <Form.Check
                            type='Radio'
                            label={element.question}
                            id={element.id}
                            value={element.question}
                            checked={element.question}
                            isValid={true}
                            onChange={(e) => handleTeamMemberChange(element.index, team.id, e)}
                        />
                    </div>
                ))}


            </>
        )
    }
    const saveData = async (e) => {
        e.preventDefault();


        const Structure = [
            title,
            inviteMembers,
            teamMembers,
        ]

        const date = new Date();
        var DateInserted = date.toJSON();
        // var DateInserted = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

        const Answer = 
            {

                'Structure': JSON.stringify(Structure),
                'FormId': parseInt(formId),
                'UserId': uid,
                'DateInserted': DateInserted
            };
        console.log(Answer);
        try {

            const response = await axios.post('https://localhost:7169/api/Answers', Answer)

            if (response) {
                navigate(-1);
                toast.success("Form submited successful!");

            }
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
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
                        <Container className='mt-5'>
                            <Form onSubmit={saveData}>
                                <h3 className='mb-5'>{title}</h3>
                                <hr />
                                {inviteMembers.map((member) => (
                                    <>
                                        <Form.Group key={member.id}>
                                            <Form.Label>{member.question}</Form.Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name='answer'
                                                placeholder={member.question}
                                                // value={member.answer}
                                                onChange={(e) => handleMemberChange(member.id, e)}
                                                required={true}
                                            />
                                        </Form.Group>
                                        <hr />
                                    </>
                                ))}

                                {teamMembers.map((team) => (
                                    // add drop down or check box here
                                    <Form.Group key={team.id}>
                                        <Form.Label>{team.question}</Form.Label>
                                        <Components team={team} />
                                    </Form.Group>
                                ))}
                                <hr />
                                <Button type='submit' className='btn-success mt-5'>Submit Form</Button>
                            </Form>
                        </Container>
                    </main>
                </div>
            </div>
        </div>
    )
}


export default CompleteForm