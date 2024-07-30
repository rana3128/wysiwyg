import React, {useState} from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

interface ContentProps {
	preview: boolean
	removeComponent: () => void
}

const Content: React.FC<ContentProps> = ({preview, removeComponent}) => {
	const [text, setText] = useState("Content Text")

	return (
		<>
			<div style={{marginBottom: "10px", position: "relative"}}>
				{preview ? <div dangerouslySetInnerHTML={{__html: text}} /> : <ReactQuill value={text} onChange={setText} />}
				{!preview ? (
					<button className="remove-element-btn-child" onClick={removeComponent}>
						X
					</button>
				) : null}
			</div>
		</>
	)
}

export default Content

