import React from 'react';


const Radio = ({ team }) => {
    return (
        <>
            {team.members.map((element) => (
                <div className='form-check'>
                    <input
                        className='form-check-input'
                        type='radio'
                        value={element.question}
                    />
                    <label className="form-check-label">{element.question}</label>
                </div>
            ))}
        </>
    )
}


export default Radio