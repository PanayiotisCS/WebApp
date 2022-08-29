import React from 'react';


const Checkbox = ({ team }) => {
    return (
        <>
            {team.members.map((element) => (
                <div className='form-check'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        value={element.answer}
                    />
                    {console.log(element.answer)}
                    <label className="form-check-label">{element.question}</label>
                </div>
            ))}
        </>
    )
}


export default Checkbox