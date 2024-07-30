import React from "react"

interface TableProps {
	preview: boolean
	removeComponent: () => void
}

const Table: React.FC<TableProps> = ({preview, removeComponent}) => {
	return (
		<>
			<div style={{border: "1px solid green", padding: "10px", margin: "10px 0", position: "relative"}}>
				Table Component
				{!preview ? (
					<button className="remove-element-btn-child" onClick={removeComponent}>
						X
					</button>
				) : null}
			</div>
		</>
	)
}

export default Table

