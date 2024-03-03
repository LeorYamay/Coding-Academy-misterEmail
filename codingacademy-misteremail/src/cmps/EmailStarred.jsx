import emptyStar from '../assets/imgs/emptyStar.png';
import fullStar from '../assets/imgs/fullStar.png';

export function EmailStarred({isStarred}){
    return (
        <div className={`star ${isStarred ? 'isstarred' : 'notstarred'}`}>
          {isStarred ?
          (<img src ={fullStar} alt="Starred"/>) : (<img src ={emptyStar} alt="Not Starred"/>)}
        </div>
      )
}