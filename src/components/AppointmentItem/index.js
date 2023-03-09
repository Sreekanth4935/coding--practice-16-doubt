// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, updateStarredAppointments} = props
  const {id, date, type, isStarred} = eachAppointment
  const isStarImage =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const isStarredImage =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const isUpdateStarredAppointments = () => {
    updateStarredAppointments(id)
  }

  //   const starImage =

  return (
    <li className="list-item">
      <div className="star-container">
        <p className="type-heading">{type}</p>
        <button
          type="button"
          data-testid="star"
          className="button1"
          onClick={isUpdateStarredAppointments}
        >
          <img src={isStarred ? isStarredImage : isStarImage} alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
