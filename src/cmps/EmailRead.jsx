import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';


export function EmailRead({className,email,onUpdateEmail}){
  const isRead =email.isRead
  function onReadClick(event)
  {
    event.stopPropagation()
    const newEmail ={...email,isRead: !isRead}
    onUpdateEmail(newEmail)
  }
    return (
        <div className={`${className} ${isRead ? 'isRead' : 'isNotRead'}`} onClick={onReadClick}>
            {isRead?<MarkEmailUnreadOutlinedIcon/>:<DraftsOutlinedIcon/>}
        </div>
      )
}