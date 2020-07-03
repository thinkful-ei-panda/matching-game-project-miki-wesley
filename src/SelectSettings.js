import React from 'react'

const SelectSettings = (props) => {
    return (
        <form className='settings-form' onSubmit={e=>props.handleGameSettingsSubmit(e)}>
            <legend><h2>Choose Your Settings</h2></legend>
            <fieldset>
                <select id='numberCards' className='number-of-cards'>
                    <option value='16'>16</option>
                    <option value='20'>20</option>
                    <option value='24'>24</option>
                </select>
                <select id='themeSelect' className='theme-select'>
                    <option value='Dogs'>Dogs</option>
                    <option value='Cats'>Cats</option>
                    {/* <option value='Cards'>Cards</option> */}
                </select>
                <button type='submit'>Start Game</button>
            </fieldset>
        </form>
    )
}

export default SelectSettings