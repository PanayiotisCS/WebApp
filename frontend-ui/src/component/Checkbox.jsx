import React, {useState} from 'react';


const Checkbox = ({ team }) => {

    const [dropValue, setDropValue] = useState();

    const handleChange = (e) => {
        e.target.value = e.target.checked;
    }

    return (
        <>
            {team.members.map((element) => (
                <div className='form-check'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        value={element.answer}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">{element.question}</label>
                </div>
            ))}
        </>
    )
}


export default Checkbox