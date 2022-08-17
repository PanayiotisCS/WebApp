import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import uuid from 'react-uuid/uuid';
import { FormStyle } from "../Admin/Style/FormStyle.css";

import { BsFillPlusSquareFill, BsFillDashCircleFill } from "react-icons/bs";
import {GrClear} from "react-icons/gr";

const DynamicForm = () => {

    let [optionCounter, setOptionCounter] = useState(1);
    let [itemCounter, setItemCounter] = useState(1);

    const [title, setTitle] = useState('');
    const [inputField, setInputField] = useState([
        {
            question: '',
            id: uuid()
        }
    ]);

    const [optionField, setOptionField] = useState([
        {
            option: '',
            id: uuid()
        }
    ]);

    const [checkboxField, setCheckBoxField] = useState([
        {
            question: '',
            id: uuid(),
            "Options": optionField
        }
    ]);

    const [listElement, setListElement] = useState([
        {
            item: '',
            id: uuid()
        }
    ]);

    const [dropDownField, setDropDownField] = useState([
        {
            question: '',
            id: uuid(),
            "List": listElement
        }
    ]);

    const handleSumbit = (e) => {
        e.preventDefault();
        const data = {
            "Title": title,
            "Input": inputField,
            "CheckBox": checkboxField,
            "DropDown": dropDownField
        };
        console.log(JSON.stringify(data));
    };

    const handleChangeElement = (id, e, stateType) => {
        switch (stateType) {
            case 'inputField':
                const newField = inputField.map(i => {
                    if (id === i.id) {
                        i[e.target.name] = e.target.value;
                    }
                    return i;
                })
                setInputField(newField);
                break;
            case 'checkboxField':
                const checkField = checkboxField.map(i => {
                    if (id === i.id) {
                        i[e.target.name] = e.target.value;
                    }
                    return i;
                })
                setCheckBoxField(checkField);
                break;
            case "optionField":
                const newOptionField = optionField.map(i => {
                    if (id === i.id) {
                        i[e.target.name] = e.target.value;
                    }
                    return i;
                })
                setOptionField(newOptionField);
                break;
            case "dropDownField":
                const newDropDownField = dropDownField.map(i => {
                    if (id === i.id){
                        i[e.target.name] = e.target.value;
                    }
                    return i;
                })
                setDropDownField(newDropDownField);
                break;
            case "listElement":
                const newListElement = listElement.map(i => {
                    if (id === i.id){
                        i[e.target.name] = e.target.value;
                    }
                    return i;
                })
                setListElement(newListElement);
            default:
                break;
        }

    }

    const handleAddFields = () => {
        let _inputField = [...inputField];
        _inputField.push({
            question: 'Question',
            id: uuid()
        })
        setInputField(_inputField);
    }

    const handleAddCheckBox = () => {
        let _checkField = [...checkboxField];
        _checkField.push({
            question: 'Question',
            id: uuid(),
            "Options": optionField
        })
        setCheckBoxField(_checkField);
    }

    
    const AddChoice = () => {
        setOptionCounter((optionCounter += 1));
        let _optionField = [...optionField];
        _optionField.push({
            option: '',
            id: uuid()
        });
        
        setOptionField(_optionField);
    }
    
    const handleAddDropDown = () => {
        let _dropField = [...dropDownField];
        _dropField.push({
            question: 'Question',
            id: uuid(),
            "List" : listElement

        })
    }

    const AddItem = () => {
        setItemCounter((itemCounter += 1));
        let _listElement = [...listElement];
        _listElement.push({
            question: '',
            id: uuid()
        })
        setListElement(_listElement);
    }

    const RemoveChoice = id => {
        const values = [...optionField];
        values.splice(values.findIndex(v => v.id == id), 1);
        setOptionField(values);
        setOptionCounter((optionCounter -= 1));
    }
    const handleRemoveFields = id => {
        const values = [...inputField];
        values.splice(values.findIndex(v => v.id == id), 1);
        setInputField(values);
    }

    const handleRemoveCheckBox = id => {
        const values = [...checkboxField];
        values.splice(values.findIndex(v => v.id == id), 1);
        setCheckBoxField(values);
    }

    const handleRemoveDropDown = id => {
        const values = [...dropDownField];
        values.splice(values.findIndex(v => v.id == id), 1);
        setDropDownField(values);
    }

    const RemoveItem = id => {
        const values = [...listElement];
        values.splice(values.findIndex(v => v.id === id), 1);
        setListElement(values);
        setItemCounter((itemCounter -= 1));
    }

    return (
        <>
            <Container>
                <Row className="mt-4">
                    <Col xs="3" md="3" lg="2" xl="2">
                        <Button className="btn-secondary float-start" onClick={handleAddFields}>Add Input</Button>
                    </Col>
                    <Col xs="4" md="3" lg="3" xl="2">
                        <Button className="btn-secondary float-start ms-2" onClick={handleAddCheckBox}>Add Check Box</Button>
                    </Col>
                    <Col xs="5" md="4" lg="3" xl="2">
                        <Button className="btn-secondary float-start ms-2" onClick={handleAddDropDown}>Add Drop down list</Button>
                    </Col>
                    {/* <Col xs="6" md="2" lg="4" xl="6">
                        <Button type='clear' className="btn-warning float-end ms-2" onClick={handleClearAll}><GrClear />Clear</Button>
                    </Col> */}
                </Row>
                
                <div className='mt-4'>
                    <Form onSubmit={handleSumbit}>
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
                                />
                            </Form.Group>
                        </div>
                        {inputField.map(inputField => {
                            return (
                                <div className='border border-success rounded p-2 mt-4 formBackground' key={inputField.id}>
                                    <Form.Group>
                                        <h5>Input field</h5>
                                        <hr />
                                        <Form.Label>{inputField.question ? inputField.question : 'Question'}</Form.Label>
                                        <Row>
                                            <Col xs="8" md="9" lg="10">
                                                <Form.Control
                                                    type="text"
                                                    name="question"
                                                    placeholder='Question'
                                                    value={inputField.question}
                                                    onChange={event => handleChangeElement(inputField.id, event, "inputField")}
                                                />
                                            </Col>
                                            <Col>
                                                <Button className="btn-danger float-end" onClick={handleRemoveFields}>Remove field</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </div>
                            )
                        })}

                        {checkboxField.map(checkboxField => {
                            return (
                                <div className='border border-success rounded p-2 mt-4 formBackground' key={checkboxField.id}>
                                    <Form.Group>
                                        <h5>Choice field</h5>
                                        <hr />
                                        <Form.Label>{checkboxField.question ? checkboxField.question : 'Question'}</Form.Label>
                                        <Row>
                                            <Col xs="8" md="9" lg="10">
                                                <Form.Control
                                                    type="text"
                                                    name="question"
                                                    placeholder='Question'
                                                    value={checkboxField.question}
                                                    onChange={event => handleChangeElement(checkboxField.id, event, "checkboxField")}
                                                />
                                            </Col>
                                            <Col xs="4" md="3" lg="2">
                                                <Button className="btn-danger float-end" onClick={handleRemoveCheckBox}>Remove field</Button>
                                            </Col>
                                        </Row>
                                        {optionField.map(optionField => {
                                            return (
                                                <div key={optionField.id}>
                                                    <Row className='mt-4'>
                                                        <Col xs="2" md="2" lg="2">
                                                            <Form.Label className='float-start'>Option</Form.Label>
                                                        </Col>
                                                        <Col xs="6" md="7" lg="8" >
                                                            <Form.Control
                                                                type="text"
                                                                name="option"
                                                                placeholder='Option'
                                                                value={optionField.option}
                                                                onChange={event => handleChangeElement(optionField.id, event, "optionField")}
                                                            />
                                                        </Col>
                                                        <Col xs="4" md="3" lg="2" xxl="2">
                                                            {optionCounter > 1 ? <Button className='float-end ms-2 btn-danger' onClick={RemoveChoice}><BsFillDashCircleFill /></Button> : null}
                                                            <Button className="float-end" onClick={AddChoice}><BsFillPlusSquareFill /></Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        })}
                                    </Form.Group>
                                </div>
                            )
                        })}

                        {dropDownField.map(dropDownField => {
                            return (
                                <div className='border border-success rounded p-2 mt-4 formBackground' key={dropDownField.id}>
                                    <Form.Group>
                                        <h5>Drop Down Field</h5>
                                        <hr />
                                        <Form.Label>{dropDownField.question ? dropDownField.question : 'Question'}</Form.Label>
                                        <Row>
                                            <Col xs="8" md="9" lg="10">
                                                <Form.Control 
                                                    type="text"
                                                    name="question"
                                                    placeholder='Question'
                                                    value={dropDownField.question}
                                                    onChange={event => handleChangeElement(dropDownField.id, event, "dropDownField")}
                                                />
                                            </Col>
                                            <Col xs="4" md="3" lg="2">
                                                <Button className='btn-danger float-end' onClick={handleRemoveDropDown}>Remove field</Button>
                                            </Col>
                                        </Row>
                                        {listElement.map(listElement => {
                                            return (
                                                <div key={listElement.id}>
                                                    <Row className='mt-4'>
                                                        <Col xs="2" md="2" lg="2">
                                                            <Form.Label className='float-start'>Option</Form.Label>
                                                        </Col>
                                                        <Col xs="6" md="7" lg="8" >
                                                            <Form.Control
                                                                type="text"
                                                                name="item"
                                                                placeholder='Item'
                                                                value={listElement.item}
                                                                onChange={event => handleChangeElement(listElement.id, event, "listElement")}
                                                            />
                                                        </Col>
                                                        <Col xs="4" md="3" lg="2" xxl="2">
                                                            {itemCounter > 1 ? <Button className='float-end ms-2 btn-danger' onClick={RemoveItem}><BsFillDashCircleFill /></Button> : null}
                                                            <Button className="float-end" onClick={AddItem}><BsFillPlusSquareFill /></Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        })}
                                    </Form.Group>
                                </div>
                            )
                        })}
                        <Button className='btn btn-success float-start mt-5' type='submit'>Submit</Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default DynamicForm;
