import React, { useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { ResizableContainer } from "./ResizableContainer"; // Import the ResizableContainer
import { mockFetchTableData } from "./mockServer"; // Import the mock server function
import { TableSettings } from "./TableSettings"; // Import the TableSettings component

export const CustomTable = ({
  dataSource = "",
  title = "Custom Table",
  width = "100%",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const [headers, setHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    if (dataSource) {
      fetchData();
    }
  }, [dataSource]);

  const fetchData = async () => {
    const { headers, rows } = await mockFetchTableData(dataSource);
    setHeaders(headers);
    setTableRows(rows);
  };

  return (
    <ResizableContainer ref={(ref) => connect(drag(ref))}>
      <Box sx={12}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header.id} align={header.id === 'name' ? 'left' : 'right'}>
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {headers.map((header) => (
                    <TableCell key={header.id} align={header.id === 'name' ? 'left' : 'right'}>
                      {row[header.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ResizableContainer>
  );
};

const TableDefaultProps = {
  dataSource: "",
  title: "Custom Table",
  width: "100%",
};

CustomTable.craft = {
  props: TableDefaultProps,
  related: {
    settings: TableSettings, // Link the settings component here
  },
};
