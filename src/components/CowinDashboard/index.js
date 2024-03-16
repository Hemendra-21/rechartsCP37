import {Component} from 'react'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage/index'

const apiConsonants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiConsonants.success, appData: ''}

  componentDidMount() {
    this.getCowinDashboardData()
  }

  getFormattedDataOfLast7Days = sevenDaysData =>
    sevenDaysData.map(eachData => ({
      vaccineDate: eachData.vaccine_date,
      dose1: eachData.dose_1,
      dose2: eachData.dose_2,
    }))

  getCowinDashboardData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    const data = await response.json()

    const formattedData = {
      last7DaysVaccination: this.getFormattedDataOfLast7Days(
        data.last_7_days_vaccination,
      ),
      vaccinationByAge: data.vaccination_by_age,
      vaccinationByGender: data.vaccination_by_gender,
    }

    this.setState({appData: formattedData})
  }

  renderOnSuccess = () => {
    const {appData} = this.state
    const {last7DaysVaccination} = appData
    console.log(last7DaysVaccination)

    return (
      <>
        <VaccinationCoverage details={last7DaysVaccination} />
      </>
    )
  }

  renderCharts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConsonants.success:
        return this.renderOnSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="header-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="app-logo"
              alt="website logo"
            />
            <h1 className="app-name">Co-WIN</h1>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          <div className="recharts-container">{this.renderCharts()}</div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
