import emptyStar from '../assets/imgs/emptyStar.png';
import fullStar from '../assets/imgs/fullStar.png';

export function EmailStarred({email,onUpdateEmail}){
  const isStarred =email.isStarred
  function onStarClick(event)
  {
    event.stopPropagation()
    const newEmail ={...email,isStarred: !isStarred}
    onUpdateEmail(newEmail)
  }
    return (
        <div className={`star ${isStarred ? 'isstarred' : 'notstarred'}`} onClick={onStarClick}>
          {isStarred ?
          (<img src ={fullStar} alt="Starred"/>) : (<img src ={emptyStar} alt="Not Starred"/>)}
        </div>
      )
}