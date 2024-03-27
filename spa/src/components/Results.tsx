import React from 'react'
import { VscJson } from 'react-icons/vsc'
interface ResultsProps {
  resultsRef: React.RefObject<HTMLDivElement>
}

export default function Results ({ resultsRef }: ResultsProps): JSX.Element {
  return (
    <div
      style={{
        height: '100%',
        wordWrap: 'break-word',
        maxHeight: '100%',
        overflow: 'auto'
      }}
      ref={resultsRef}
    >
      <VscJson style={{ margin: 'auto' }} size={350} color="gray" />
    </div>
  )
}
