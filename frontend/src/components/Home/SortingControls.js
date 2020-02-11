import React from 'react'
import { connect } from 'react-redux'

const SortingControls = ({ activeSortingType, handleSorting, dispatch }) => {
  const controls = [
    { type: "voteScore", label: "Score" },
    { type: "timestamp", label: "Date" },
    { type: "title", label: "Title" },
    { type: "commentCount", label: "# comments" },
  ]

  return (
    <div className="sorting-container">
      {
        controls.map(c => (
          <div key={c.type} className={"sorting-item" + (activeSortingType === c.type ? " active" : "")}>
            <span className='sorting-label'>Sort by {c.label}</span>
            <span className="sorting-btns">
              <i className='fa fa-caret-square-down' onClick={handleSorting.bind(this, c.type, 1)} />
              <i className='fa fa-caret-square-up' onClick={handleSorting.bind(this, c.type, -1)} />
            </span>
          </div>
        ))
      }
    </div>
  )
}

const ConnectedSortingControls = connect()(SortingControls)

export default ConnectedSortingControls
