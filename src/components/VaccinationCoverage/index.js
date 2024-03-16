import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {details} = props
  const {vaccineDate, dose1, dose2} = details

  console.log(details)

  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={details} margin={{top: 5}}>
        <XAxis dataKey={vaccineDate} tick={{stroke: 'gray', strokeWidth: 1}} />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{stroke: 'gray', strokeWidth: 1}}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar dataKey={dose1} name="Dose1" fill="#2d87bb" barSize="20%" />
        <Bar dataKey={dose2} name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
