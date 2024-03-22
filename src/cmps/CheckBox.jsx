import { useEffect, useState } from 'react';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

export function CheckBox({ isSelected, onToggle,buttonType='' }) {
    // const [boxState, setBoxState] = useState(isSelected)
    const [boxIcon, setBoxIcon] = useState()
    // debugger
    // useEffect(()=>{
    //     console.log("isSelected",isSelected)
    // },[isSelected])
    const boxClick = (event) => {
        event.stopPropagation()
        onToggle()
    }
    useEffect(() => {
        switch (isSelected) {
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
    }, [isSelected])
    return (
        <div className={`${buttonType} checkbox`} onClick={boxClick}>
            {boxIcon}
        </div>
    )
}