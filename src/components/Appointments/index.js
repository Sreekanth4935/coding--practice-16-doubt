// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointment extends Component {
  state = {
    appointmentsList: [
      {id: uuidv4(), type: 'Dentist', date: 'Date 20 july', isStarred: false},
    ],
    titleInput: '',
    dateInput: '',
    starredAppointmentList: '',
    startButtonActive: false,
  }

  //    updateStarredAppointments = id =>{
  updateStarredAppointments = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getTitle = event => {
    this.setState({titleInput: event.target.value})
    // console.log(event.target.value)
  }

  getDate = event => {
    this.setState({dateInput: event.target.value})
    // console.log(event.target.value)
  }

  submitButtonClicked = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: uuidv4(),
      type: titleInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  renderAppointmentList = () => {
    const {appointmentsList} = this.state

    return appointmentsList.map(eachAppointment => (
      <AppointmentItem
        eachAppointment={eachAppointment}
        key={eachAppointment.id}
        updateStarredAppointments={this.updateStarredAppointments}
      />
    ))
  }

  renderStarredAppointment = () => {
    const {starredAppointmentList} = this.state

    return starredAppointmentList.map(eachAppointment => (
      <AppointmentItem
        eachAppointment={eachAppointment}
        key={eachAppointment.id}
        updateStarredAppointments={this.updateStarredAppointments}
      />
    ))
  }

  starredAppointments = () => {
    const {appointmentsList} = this.state

    const starredAppointment = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )

    // this.setState({starredAppointmentList: starredAppointment})
    this.setState(prevState => ({
      starredAppointmentList: starredAppointment,
      startButtonActive: !prevState.startButtonActive,
    }))
  }

  render() {
    const {titleInput, dateInput, startButtonActive} = this.state

    console.log(startButtonActive)

    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="main-container">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.submitButtonClicked}>
                <label className="label-container">
                  TITLE
                  <input
                    type="text"
                    placeholder="Title"
                    className="input-box"
                    onChange={this.getTitle}
                    value={titleInput}
                  />
                </label>
                <label className="label-container">
                  Date
                  <input
                    type="date"
                    className="input-box"
                    onChange={this.getDate}
                    value={dateInput}
                  />
                </label>

                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="appointment-image "
            />
          </div>
          <hr className="line" />
          <div className="appointments">
            <h1 className="heading">Appointments</h1>
            <button
              //   data-testid="star"
              type="button"
              className="button"
              onClick={this.starredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {startButtonActive
              ? this.renderStarredAppointment()
              : this.renderAppointmentList()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointment
