import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Container, Form } from 'react-bootstrap';
import DashboardHeader from './DashboardHeader';
import { BiArrowBack } from 'react-icons/bi';
import { BsFillPlusSquareFill, BsFillDashSquareFill } from 'react-icons/bs';

import axios from 'axios';
import UrlService from '../services/UrlService';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';

const EditForm = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [inviteMembers, setInviteMembers] = useState([
        {
            question: '',
            id: uuid()
        },
    ])

    const [teamsMembers, setTeamMembers] = useState([
        {
            type: '',
            question: '',
            id: uuid(),
            members: [
                {
                    question: '',
                    id: uuid(),
                },
            ],
        },
    ])

    const { location } = useLocation();
    const { formId } = useParams();




    //add new form field for adding member
    const addMemberRow = () => {
        //Todo generate random id

        let _inviteMembers = [...inviteMembers]
        _inviteMembers.push({
            question: '',
            id: uuid(),
        })
        setInviteMembers(_inviteMembers)
    }

    //remove form field for adding member
    const removeMemberRow = (id) => {
        //Todo generate random id

        let _inviteMembers = [...inviteMembers]
        _inviteMembers = _inviteMembers.filter((member) => member.id !== id)
        setInviteMembers(_inviteMembers)
    }

    //handle email row change
    const handleMemberChange = (id, event) => {
        //find the index to be changed
        const index = inviteMembers.findIndex((m) => m.id === id)

        let _inviteMembers = [...inviteMembers]
        _inviteMembers[index][event.target.name] = event.target.value
        setInviteMembers(_inviteMembers)
    }

    //handle add team
    const handleAddTeam = () => {
        let _teamsMembers = [...teamsMembers]
        _teamsMembers.push({
            type: '',
            question: '',
            id: uuid(),
            members: [
                {
                    question: '',
                    id: uuid(),
                },
            ],
        })
        setTeamMembers(_teamsMembers)
    }

    const addNewMemberInTeam = (id) => {
        const index = teamsMembers.findIndex((team) => team.id === id)
        let _teamsMembers = [...teamsMembers]
        _teamsMembers[index].members.push({
            question: '',
            id: uuid(),
        })
        setTeamMembers(_teamsMembers)
    }

    const removeMemberFromTeam = (teamId, id) => {
        const teamIndex = teamsMembers.findIndex((team) => team.id === teamId)
        console.log("here")
        let _teamsMembers = [...teamsMembers]
        _teamsMembers[teamIndex].members.splice(_teamsMembers[teamIndex].members.findIndex((m) => m.id === id), 1)
        setTeamMembers(_teamsMembers)
    }

    //handle team data
    const handleTeamData = (id, event,) => {
        const index = teamsMembers.findIndex((team) => team.id === id)

        let _teamsMembers = [...teamsMembers]

        _teamsMembers[index][event.target.name] = event.target.value
        setTeamMembers(_teamsMembers)
    }

    const handleMemberInTeamData = (teamId, memberId, event) => {
        const teamIndex = teamsMembers.findIndex((team) => team.id === teamId)
        let _teamsMembers = [...teamsMembers]
        const memberIndex = teamsMembers[teamIndex].members.findIndex(
            (m) => m.id === memberId,
        )
        _teamsMembers[teamIndex].members[memberIndex][event.target.name] =
            event.target.value
        setTeamMembers(_teamsMembers)
    }

    const removeTeam = (id) => {
        let values = [...teamsMembers]
        values = values.filter((team) => team.id !== id)
        setTeamMembers(values)
    }

    const handleChangeElementType = (id, e) => {
        const teamIndex = teamsMembers.findIndex((team) => team.id === id)
        let _teamsMembers = [...teamsMembers]
        _teamsMembers[teamIndex].type = e.target.value

        setTeamMembers(_teamsMembers)
    }

    const saveEditedForm = async (e) => {
        e.preventDefault();
        const data = [
            {
            
                "Id": formId,
                "Title": title,
				"Input" : inviteMembers,
				"Data" : teamsMembers
            }
        ];
        
        console.log(JSON.stringify(data));
        const structure = JSON.stringify(data);
        try {
            const response = await axios.put(UrlService.updateForm(formId, structure), {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            const res = await response.data;
            navigate(-1);
            console.log(res);
            toast.success('Form updated successfuly');
        } catch (error) {

            toast.error('Something went wrong');
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchForm = async () => {

            //try {
            // Empty data before rendering
            setData([]);
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

        fetchForm();
    }, []);

    return (
        <div className='App'>
            <DashboardHeader />
            <div className='container-fluid'>
                <main>
                    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                        <h1 className='h2'>Edit Form</h1>
                    </div>
                    <div className=" justify-content-between flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                        <div className='d-flex'>
                            <Button className='btn btn-primary float-start' onClick={() => navigate(-1)} ><BiArrowBack />Back</Button>
                        </div>
                    </div>
                    <Container>
                        <Container>
                            <Row>
                                <Col>
                                    <Button className="mb-2 float start" onClick={addMemberRow}>Add input field</Button>
                                </Col>
                                <Col>
                                    <Button className="mb-2 float-end" onClick={handleAddTeam}>Add new group field</Button>
                                </Col>
                            </Row>
                            <form className="form" onSubmit={saveEditedForm}>
                                <div className='border border-success rounded p-2 mb-2 formBackground'>
                                    <Form.Group className='my-2'>
                                        <Form.Label>{title ? title : 'Add Title'}</Form.Label>
                                        <hr />
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            placeholder="Add Title"
                                            onChange={e => setTitle(e.target.value)}
                                            value={title}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="invite-member">
                                    {inviteMembers.map((member) => (
                                        <div className="border border-success rounded p-2 mt-4 formBackground" key={member.id}>
                                            <Form.Group>
                                                <h5>Input field</h5>
                                                <hr />
                                                <Form.Label>{member.question ? member.question : 'Question'}</Form.Label>
                                                <Row>
                                                    <Col xs="8" md="9" lg="10">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="question"
                                                            placeholder={member.question ? member.question : 'Question'}
                                                            value={member.question}
                                                            onChange={(e) => handleMemberChange(member.id, e)}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        {inviteMembers.length > 1 && (
                                                            <Button className="btn-danger" onClick={() => removeMemberRow(member.id)}><BsFillDashSquareFill /></Button>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </div>
                                    ))}
                                </div>
                                <div className="row-section">
                                    {teamsMembers.map((team) => (
                                        <div className="border border-success rounded p-2 mt-4 formBackground" key={team.id}>
                                            <Form.Group>
                                                <Row>
                                                    <Col>
                                                        <h5>Choice field</h5>
                                                    </Col>
                                                    <Col>
                                                        <select className="form-select color-info" onChange={(event) => handleChangeElementType(team.id, event)}>
                                                            <option disabled>
                                                                Choose type
                                                            </option>
                                                            <option value="Checkbox">Check Box</option>
                                                            <option value="Dropdown">Drop Down</option>
                                                            <option value="Radio">Radio</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Form.Group>
                                                <hr />
                                                <Form.Label>{team.question ? team.question : 'Question'}</Form.Label>
                                                <Row>
                                                    <Col xs="8" md="9" lg="10">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="question"
                                                            placeholder='Question'
                                                            value={team.question}
                                                            onChange={(e) => handleTeamData(team.id, e)}
                                                        />
                                                    </Col>
                                                    <Col xs="4" md="3" lg="2">
                                                        {teamsMembers.length > 1 && (
                                                            <Button className="btn-danger float-end" onClick={() => removeTeam(team.id)}>Remove field</Button>
                                                        )}
                                                    </Col>
                                                </Row>


                                            </Form.Group>
                                            <Form.Group>
                                                {team.members.map((member) => (
                                                    <div key={member.id}>
                                                        <Row className="mt-4">
                                                            <Col xs="2" md="2" lg="2">
                                                                <Form.Label className='float-start'>Option</Form.Label>
                                                            </Col>
                                                            <Col xs="6" md="7" lg="8">
                                                                <input
                                                                    className="form-control"
                                                                    name="question"
                                                                    type="text"
                                                                    placeholder="Option"
                                                                    value={member.question}
                                                                    onChange={(e) =>
                                                                        handleMemberInTeamData(team.id, member.id, e)
                                                                    }
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Button onClick={() => addNewMemberInTeam(team.id)}><BsFillPlusSquareFill /></Button>
                                                                {team.members.length > 1 && (
                                                                    <Button className="btn-danger float-end" onClick={() => removeMemberFromTeam(team.id, member.id)}><BsFillDashSquareFill /></Button>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}
                                            </Form.Group>
                                        </div>
                                    ))}
                                    <Button className="mt-2 btn-success" type="submit">
                                        Submit form
                                    </Button>
                                </div>
                            </form>
                        </Container>
                    </Container>
                </main>
            </div>
        </div>
    )
}


export default EditForm