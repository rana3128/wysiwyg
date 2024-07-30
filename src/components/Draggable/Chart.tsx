import React from "react"

interface ChartProps {
	preview: boolean
	removeComponent: () => void
}

const Chart: React.FC<ChartProps> = ({preview, removeComponent}) => {
	return (
		<>
			<div style={{border: "1px solid blue", padding: "10px", margin: "10px 0", position: "relative"}}>
				Chart Component
				{!preview ? (
					<button className="remove-element-btn-child" onClick={removeComponent}>
						X
					</button>
				) : null}
			</div>
		</>
	)
}

export default Chart

