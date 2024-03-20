import { useEffect, useState } from 'react';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

export function CheckBox({ onToggle}) {
    const [boxState, setBoxState] = useState('empty')
    const [ boxIcon, setBoxIcon] = useState()
    // debugger
    const boxClick = (event) => {

        event.stopPropagation()
        onToggle()
        setBoxState('empty')
    }
    useEffect(() => {
        switch (boxState) {
            case 'empty':
                setBoxIcon(<CheckBoxOutlineBlankOutlinedIcon />)
                break
            case 'partial':
                setBoxIcon(<IndeterminateCheckBoxOutlinedIcon />)
                break
            case 'checked':
                setBoxIcon(<CheckBoxOutlinedIcon />)
                break
        }

    }
        , [boxState])
    return (
        <div className='checkbox' onClick={boxClick}>
            {boxIcon}
        </div>
    )
}