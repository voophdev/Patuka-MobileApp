import Headers from '../Headers'
import LineChart from './LineChart'
import Levels from './Levels'

const ModalStats = ({data, label, title, description, color, currentValue, minValue, maxValue}) => {
  return (
    <>
      <Headers 
        upperTitle={title}
        upperColor={color}
        description={description}
      />
      <LineChart 
        data={data}
        label={label}
        title={title}
        color={color}
      />
      <Levels 
        currentValue={currentValue}
        minValue={minValue}
        maxValue={maxValue}
        label={label}
        color={color}
      />
    </>
  )
}

export default ModalStats