import React, {useState} from 'react';


const Radio = ({ team }) => {

    const [select, setSelectedOption] = useState('');
    return (
        <>
            {team.members.map((element) => (
                <div className='form-check' key={element.id} onChange={(e) => setSelectedOption(e.target.value)}>
                    <input
                        className='form-check-input'
                        name={element.question}
                        type='radio'
                        value={element.question}
                    />
                    <label className="form-check-label">{element.question}</label>
                </div>
            ))}

            {console.log(select)}
        </>
    )
}


export default Radio