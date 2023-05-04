import React, { useEffect, useState, useMemo } from 'react';
import {

    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FilterList } from "@material-ui/icons";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteItem, getAllItems } from "../../actions/item";
import { Button, Table } from '@mui/material';
import Link from 'next/link';
import Alert from '../Layouts/Alert';

const useStyles = makeStyles((theme) => ({
    container: {
        maxHeight: 440,
    },
    filterContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(2),
    },
    filterIcon: {
        marginRight: theme.spacing(1),
    },
    filterInput: {
        marginRight: theme.spacing(2),
    },
}));


const ItemTable = ({
    getAllItems,
    items,
    deleteItem,
    isAuthenticated,
    user }) => {

    const classes = useStyles();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');


    useEffect(() => {
        getAllItems();
    }, []);



    const handleDelete = (id) => {
        deleteItem(id);
    };
    console.log(items,user)

    
    const filteredItems = items?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))



    const sortItems = (items, sortKey, sortDirection) => {
        const sortMultiplier = sortDirection === 'asc' ? 1 : -1;
      
        return items?.sort((a, b) => {
          if (a[sortKey] < b[sortKey]) {
            return -1 * sortMultiplier;
          }
          if (a[sortKey] > b[sortKey]) {
            return 1 * sortMultiplier;
          }
          return 0;
        });
      };

      const sortedItems = useMemo(() => {
        return sortItems(items, sortKey, sortDirection);
      }, [items, sortKey, sortDirection]);
      
      const handleSort = (key) => {
        if (sortKey === key) {
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
          setSortKey(key);
          setSortDirection('asc');
        }
      };

      const rowItems = (searchTerm?.length > 0) ? filteredItems : sortedItems;
      console.log(rowItems,searchTerm)
    return (
        <>
            <Alert/>         
            <div style={{marginTop: '15px'}}>
                <div className={classes.filterContainer}>
                    <FilterList className={classes.filterIcon} />
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        className={classes.filterInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={() => handleSort("name")}>Sort by Name</Button>
                    <Button onClick={() => handleSort("createdAt")}>
                        Sort by Date
                    </Button>
                </div>
                <TableContainer className={classes.container} component={Paper}>
                    <Table stickyHeader aria-label="item table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Created By</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowItems.map((item) => (
                                <TableRow key={item?._id}>
                                    <TableCell>{item?._id}</TableCell>
                                    <TableCell>{item?.name}</TableCell>
                                    <TableCell>{item?.createdAt}</TableCell>
                                    <TableCell>{item?.createdBy.email}</TableCell>
                                    <TableCell>
                                        <Link href={`/items/${item?._id}`}><Button variant="contained" disabled={item?.createdBy.email !== user?.email}>Update</Button></Link>
                                        <Button disabled={item?.createdBy.email !== user?.email} style={{marginLeft: '15px'}} variant="contained" color="error" size="small" onClick={(e) => handleDelete(item?._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

ItemTable.propTypes = {
    items: PropTypes.any,
    getAllItems: PropTypes.func,
    deleteItem: PropTypes.func,
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    items: state.item.items,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { getAllItems, deleteItem })(ItemTable);