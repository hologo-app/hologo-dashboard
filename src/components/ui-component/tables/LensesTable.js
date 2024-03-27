import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useDeleteLens, useGetLenses } from "api/lenses/lensAPI";
import { useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useGlobal } from "context/GlobalContext";
import { width } from "@mui/system";

const LensesTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [lensData, setLensData] = useState([]);
  const { fetch ,setFetch} = useGlobal();

  const { response, error } = useGetLenses(); // Call the custom hook here
  const { deleteLens} = useDeleteLens();

  useEffect(() => {
    if (response) {
      setLensData(response.data);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching Lenses:", error);
    }
  }, [error]);

  useEffect(() => {
    // fetchLenses();
  }, [fetch]);

  const handleDelete = async (lensID) => {
    try {
      const response = await  deleteLens(lensID);;
      console.log(response);
      setFetch(fetch + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Lenses table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "lensCategory"}
                direction={orderBy === "lensCategory" ? order : "asc"}
                onClick={(event) => handleRequestSort(event, "lensCategory")}
              >
                Lens Category
                {orderBy === "lensCategory" ? (
                  <span style={{ ...visuallyHidden }}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "lensName"}
                direction={orderBy === "lensName" ? order : "asc"}
                onClick={(event) => handleRequestSort(event, "lensName")}
              >
                Lens Name
                {orderBy === "lensName" ? (
                  <span style={{ ...visuallyHidden }}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "lensGroupID"}
                direction={orderBy === "lensGroupID" ? order : "asc"}
                onClick={(event) => handleRequestSort(event, "lensGroupID")}
              >
                Lens Group ID
                {orderBy === "lensGroupID" ? (
                  <span style={{ ...visuallyHidden }}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell> Lens Image </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lensData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No lenses to display
              </TableCell>
            </TableRow>
          ) : (
            lensData.map((row) => (
              <TableRow key={row.lensID} hover>
                <TableCell>{row.lensCategory}</TableCell>
                <TableCell>{row.lensName}</TableCell>
                <TableCell>{row.lensGroupID}</TableCell>
                <TableCell>
                  {row.lensImage && (
                    <img
                      src={row.lensImage}
                      alt="Lens"
                      style={{width:"200px", height:"auto"}}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(row.lensID)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LensesTable;
