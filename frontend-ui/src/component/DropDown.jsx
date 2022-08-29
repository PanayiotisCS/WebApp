import React from 'react';


const DropDown = ({ team }) => {
    return (
        <>
            <select className='form-select'>
                <option selected>Choose one option</option>
                {team.members.map((element) => (
                    <option value={element.question}></option>
                ))}
            </select>
        </>
    )
}


export default DropDown