import { Search } from './Search'
import { SelectClass } from './SelectClass'
import { SelectTable } from './SelectTable'
import Filters from './Filters'

export default function Params (): JSX.Element {
  return (
    <div>
      <Search />
      <SelectClass />
      <SelectTable />
      <Filters />
    </div>
  )
}
