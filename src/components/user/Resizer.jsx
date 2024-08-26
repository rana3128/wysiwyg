import React, { useRef, useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import { Resizable } from "re-resizable";

const Resizer = ({ propKey, children, ...props }) => {
  const {
    actions: { setProp },
    connectors: { connect },
    nodeWidth,
    nodeHeight,
  } = useNode((node) => ({
    nodeWidth: node.data.props[propKey.width],
    nodeHeight: node.data.props[propKey.height],
  }));

  const resizable = useRef(null);
  const parentCoainterWidth = useRef("100%");
  const [internalDimensions, setInternalDimensions] = useState({
    width: nodeWidth,
    height: nodeHeight,
  });

  useEffect(()=>{
    const dom = resizable.current.resizable;
    if (!dom) return;
    parentCoainterWidth.current = dom.getBoundingClientRect().width
  }, [])

  useEffect(() => {
    setInternalDimensions({ width: nodeWidth, height: nodeHeight });
  }, [nodeWidth, nodeHeight]);

  const snapToClosestWidth = (currentWidth) => {
    console.log(parentCoainterWidth.current);

    const widthPercent = (currentWidth / parentCoainterWidth.current) * 100;

    if (widthPercent <= 50) return '38%';
    if (widthPercent <= 70) return '58%';
    if (widthPercent <= 90) return '78%';
    return '100%';
  };

  const handleResizeStop = (e, direction, ref, d) => {
    const newWidth = ref.getBoundingClientRect().width;
    const snappedWidth = snapToClosestWidth(newWidth);

    setInternalDimensions((dims) => ({
      ...dims,
      width: snappedWidth,
    }));

    setProp((prop) => {
      prop[propKey.width] = snappedWidth;
    });
  };

  return (
    <Resizable
      enable={{ right: true }}
      ref={(ref) => {
        if (ref) {
          resizable.current = ref;
          connect(resizable.current.resizable);
        }
      }}
      size={internalDimensions}
      onResizeStop={handleResizeStop}
      {...props}
    >
      {children}
    </Resizable>
  );
};

export default Resizer;
