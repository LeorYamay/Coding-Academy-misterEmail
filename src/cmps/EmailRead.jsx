import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';


export function EmailRead({ buttonType, isRead, onToggleRead }) {
  
  function onReadClick(event) {
    event.stopPropagation()
    onToggleRead()
  }

  return (
    <div className={`${buttonType} ${isRead ? 'isRead' : 'isNotRead'}`} onClick={onReadClick}>
      {isRead ? <MarkEmailUnreadOutlinedIcon /> : <DraftsOutlinedIcon />}
    </div>
  )
}