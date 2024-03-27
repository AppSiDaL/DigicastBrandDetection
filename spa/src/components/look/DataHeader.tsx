import { colors } from '@/utils'
export default function DataHeader (): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#292929'
      }}
    >
      <p style={{ color: 'white' }}>Data</p>
      <button style={{ border: 'none', color: colors.buttonBackground }}>
        Results
      </button>
      <button style={{ border: 'none', color: colors.buttonBackground }}>
        SQL
      </button>
    </div>
  )
}
