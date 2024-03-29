import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { yellow } from '@mui/material/colors';


export function EmailStarred({isStarred,onToggleStar}){
  function onStarClick(event)
  {
    event.stopPropagation()
    onToggleStar()
  }
  
    return (
        <div className={`star ${isStarred ? 'isstarred' : 'notstarred'}`} onClick={onStarClick}>
          {isStarred ?
          (<StarIcon alt="Starred" style={{color:yellow[500]}}/>) : (<StarOutlineOutlinedIcon alt="Not Starred"/>)}
        </div>
      )
}