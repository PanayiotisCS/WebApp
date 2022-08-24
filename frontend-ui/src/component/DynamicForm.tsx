import React from "react"
import uuid from 'react-uuid/uuid';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container} from 'react-bootstrap'
import { BsFillPlusSquareFill, BsFillDashCircleFill } from "react-icons/bs";

import UrlService from "../services/UrlService";
import axios from "axios";

import '../Admin/Style/FormStyle.css';


const DynamicForm = () => {

	const navigate = useNavigate();

	const [title, setTitle] = React.useState('');

	const [inviteMembers, setInviteMembers] = React.useState([
		{
			question: '',
			id: uuid(),
		},
	])

	const [teamsMembers, setTeamMembers] = React.useState([
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
	const removeMemberRow = (id: string) => {
		//Todo generate random id

		let _inviteMembers = [...inviteMembers]
		_inviteMembers = _inviteMembers.filter((member) => member.id !== id)
		setInviteMembers(_inviteMembers)
	}

	//handle email row change
	const handleMemberChange = (
		id: string,
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		//find the index to be changed
		const index = inviteMembers.findIndex((m) => m.id === id)

		let _inviteMembers = [...inviteMembers] as any
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

	//handle new memeber inside selected team
	const addNewMemberInTeam = (id: string) => {
		const index = teamsMembers.findIndex((team) => team.id === id)
		let _teamsMembers = [...teamsMembers]
		_teamsMembers[index].members.push({
			question: '',
			id: uuid(),
		})
		setTeamMembers(_teamsMembers)
	}

	const removeMemberFromTeam = (
		teamId: string,
		id: string
	) => {
		const teamIndex = teamsMembers.findIndex((team) => team.id === teamId)
		console.log("here")
		let _teamsMembers = [...teamsMembers]
		_teamsMembers[teamIndex].members.splice(_teamsMembers[teamIndex].members.findIndex((m) => m.id === id), 1)
		setTeamMembers(_teamsMembers)
	}

	//handle team data
	const handleTeamData = (
		id: string,
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const index = teamsMembers.findIndex((team) => team.id === id)

		let _teamsMembers = [...teamsMembers] as any

		_teamsMembers[index][event.target.name] = event.target.value
		setTeamMembers(_teamsMembers)
	}

	//handle inner member data in team
	const handleMemberInTeamData = (
		teamId: string,
		memberId: string,
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const teamIndex = teamsMembers.findIndex((team) => team.id === teamId)
		let _teamsMembers = [...teamsMembers] as any
		const memberIndex = teamsMembers[teamIndex].members.findIndex(
			(m) => m.id === memberId,
		)
		_teamsMembers[teamIndex].members[memberIndex][event.target.name] =
			event.target.value
		setTeamMembers(_teamsMembers)
	}

	const removeTeam = (id: string) => {
		let values = [...teamsMembers]
		values = values.filter((team) => team.id !== id)
		setTeamMembers(values)
	}


	const handleChangeElementType = (
		id: string,
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const teamIndex = teamsMembers.findIndex((team) => team.id === id)
		let _teamsMembers = [...teamsMembers]
		_teamsMembers[teamIndex].type = e.target.value

		setTeamMembers(_teamsMembers)
	}
	//save teams data
	const saveTeamData = async (e: React.FormEvent) => {
		e.preventDefault()
		const data = [
			{
				"Title": title,
				"Input" : inviteMembers,
				"Data" : teamsMembers
			}
		];
		const structure = JSON.stringify(data);

		const response = await axios.post(UrlService.createForm(), {structure: structure});

		if(response){
			// await response.data;
			navigate('/admin/Dashboard', {state: {toForm: 'forms'}});			
			toast.success("Form submited!");
		}else{
			toast.error("Something went wrong.");
		}
	}

	return (
		<Container>
			<Container>
				<h2>Create a new form</h2>
				<Row>
					<Col>
						<Button className="mb-2 float start" onClick={addMemberRow}>Add input field</Button>
					</Col>
					<Col>
						<Button className="mb-2 float-end" onClick={handleAddTeam}>Add new group field</Button>
					</Col>
				</Row>
				<form className="form" onSubmit={saveTeamData}>
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
												placeholder='Question'
												value={member.question}
												onChange={(e) => handleMemberChange(member.id, e)}
											/>
										</Col>
										<Col>
											{inviteMembers.length > 1 && (
												<Button className="btn-danger" onClick={() => removeMemberRow(member.id)}><BsFillDashCircleFill /></Button>
											)}
										</Col>
									</Row>
								</Form.Group>
							</div>
						))}
					</div>

					{/** 2nd level dynamic example */}

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
												<option value="Inputfields">Input Fields</option>
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
														<Button className="btn-danger float-end" onClick={() => removeMemberFromTeam(team.id, member.id)}><BsFillDashCircleFill /></Button>
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
	)
}

export default DynamicForm
