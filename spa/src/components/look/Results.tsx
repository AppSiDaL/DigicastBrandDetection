import Visualization from './Visualization'
import Data from './Data'

export default function Results (): JSX.Element {
  return (
    <div>
      <div>
        <Visualization />
      </div>
      <div>
        <Data />
      </div>
    </div>
  )
}
