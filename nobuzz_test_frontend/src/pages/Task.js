import React, { useState, useEffect } from 'react';

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { Dialog } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
  } from '@mui/x-data-grid-generator';
  
  

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import './Task.css'


const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};


// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'title', headerName: 'Título', width: 200 },
//     { field: 'description', headerName: 'Descrição', width: 200 },
//     { field: 'status', headerName: 'Status',  width: 200 },
//     { field: 'creation_date', headerName: 'Data de Criação',  width: 200 },
//     { field: 'completion_date', headerName: 'Data de Finalização',  width: 200 },
//   ];
  
  

//   const formatDate = (date)=>{
//     if(!date){return ''}
//     date = new Date(date)
//     const day = date.getDate()
//     const month = date.getMonth()+1
//     const year = date.getFullYear()
//         return `${day}/${month}/${year}`
//   }

  
  const initialRows = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 19,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 28,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
  ];

  
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Nova Tarefa
        </Button>
      </GridToolbarContainer>
    );
  }
  



function Task() {

    const [newTask,setNewTask]=useState(false)
    const [newTask_title,setNewTask_title]=useState('')
    const [newTask_description,setNewTask_description]=useState('')
    const [newTask_status,setNewTask_status]=useState(false)
    const [updaterows,setupdaterows]=useState(false)

    const [rows,setRows] = useState([
        { id: 1, title: '', description: '', status: false, creation_date: new Date(), completion_date: new Date(),  },
      ]);
    
    // const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
  
    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id) => () => {

        const thisRow = rows.find(single=>single.id===id)



        



        console.log(
            rowModesModel[id],
            thisRow
        );

        if(id){

            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        }


    };
  
    const handleDeleteClick = (id) => () => {


        const token = localStorage.token
        fetch('http://localhost:8181/edit-task', {
            method: 'POST',
            body:
                JSON.stringify({
                isDelete: true   ,
                id:id,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,

            },
            })
            .then((response) => response.json())
            .then((json) => {
                window.location.href = '/task'
            });



    //   setRows(rows.filter((row) => row.id !== id));
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
  
    const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    };
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
  
    const columns = [
        { field: 'title', headerName: 'Título', width: 180, editable: true },
        { field: 'description', headerName: 'Descrição', width: 180, editable: true },
        { field: 'createdAt', headerName: 'Data de Criação', type: 'date', width: 180, editable: true, },
        { field: 'completedAt', headerName: 'Data de Conclusão', type: 'date', width: 180, editable: true, },
        { field: 'status', headerName: 'Status', width: 220, editable: true, type: 'singleSelect', valueOptions: ['Completo', 'Incompleto'], },
        { field: 'actions', type: 'actions', headerName: 'Ações', width: 100, cellClassName: 'actions', 
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                return [
                    <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                        color: 'primary.main',
                    }}
                    onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                    />,
                ];
                }
            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
          },
        },
      ];
    

    useEffect(()=>{

        const path = (window.location.pathname).split('/')
        const isCreating = path[2]==='new'
        setNewTask(isCreating)
        const token = localStorage.token
        if(!isCreating && token){
            fetch('http://localhost:8181/all-data', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => response.json())
            .then((json) => {
                const aux = !json.error && !json.message ? json.map((single)=>{
                    single?.status? single.status = 'Completo' : single.status = 'Incompleto'
                    single.createdAt = new Date(single?.createdAt) || null
                    single.completedAt = new Date(single?.completedAt) || null
                    // single.creation_date = formatDate(single?.createdAt) || null
                    // single.completion_date = formatDate(single?.completedAt) || null
                    return single
                }) : [] 
                setRows(aux)

            });
        }
        
    
    
      },[])

      const handleSubmitNewTask = (e)=>{
        e.preventDefault()

        const token = localStorage.token
        fetch('http://localhost:8181/new-task', {
            method: 'POST',
            body: JSON.stringify({
                title: newTask_title,
                description: newTask_description,
                status: newTask_status,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,

            },
            })
            .then((response) => response.json())
            .then((json) => {
                window.location.href = '/task'
            });


      }


      

      const handleChangeOnServer = (updatedRow)=>{

        const token = localStorage.token
        fetch('http://localhost:8181/edit-task', {
            method: 'POST',
            body:
                JSON.stringify({
                id: updatedRow?.id   ,
                title: updatedRow?.title   ,
                description: updatedRow?.description   ,
                status: updatedRow?.status   ,
                completedAt: updatedRow?.completedAt   ,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,

            },
            })
            .then((response) => response.json())
            .then((json) => {
                // setRows(json?.newRows)
                // setupdaterows(!updaterows)
                window.location.href = '/task'
            });


      }



    

    return ( 
        <div className='main'>
        
            <div className='header'>
                <h1>{newTask? 'Nova tabela' : 'Tabela de tarefas'}</h1>
            </div>

            <div className='table'>

                {newTask?
                    <div className='newTaskForm'>


                        <TextField style={{width:'300px'}} label="Título" variant="outlined" value={newTask_title} onChange={(e)=>{setNewTask_title(e.target.value)}} />
                        <TextField style={{width:'300px'}} label="Descrição" variant="outlined" value={newTask_description} onChange={(e)=>{setNewTask_description(e.target.value)}} />
                        <FormControl style={{width:'300px'}} >
                            <InputLabel >Status</InputLabel>
                            <Select
                            value={newTask_status?'Completo':'Incompleto'}
                            label="Status"
                            onChange={(e)=>{
                                setNewTask_status(e.target.value==='Completo'?true:false)}}
                            >
                                <MenuItem value={'Completo'}>Completo</MenuItem>
                                <MenuItem value={'Incompleto'}>Incompleto</MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" endIcon={<SendIcon />} style={{width:'200px',margin:'auto'}}
                            onClick={handleSubmitNewTask}
                        >
                            Criar
                        </Button>


                    </div>
                    :

                    <Box
                    sx={{
                      height: 500,
                      width: '100%',
                      '& .actions': {
                        color: 'text.secondary',
                      },
                      '& .textPrimary': {
                        color: 'text.primary',
                      },
                    }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      editMode="row"
                      rowModesModel={rowModesModel}
                      onRowModesModelChange={handleRowModesModelChange}
                      onRowEditStop={handleRowEditStop}
                    //   processRowUpdate={processRowUpdate}

                      processRowUpdate={(updatedRow, originalRow) =>
                        handleChangeOnServer(updatedRow)
                      }
                    
                      slots={{
                        toolbar: EditToolbar,
                      }}
                      slotProps={{
                        toolbar: { setRows, setRowModesModel },
                      }}
                    />
                  </Box>


                    // <DataGrid
                    //     rows={rows}
                    //     columns={columns}
                    //     initialState={{
                    //         pagination: {
                    //             paginationModel: { pstatus: 0, pstatusSize: 5 },
                    //         },
                    //     }}
                    //     pstatusSizeOptions={[ 5, 10, 25, 50, 100]}
                    //     checkboxSelection
                    // />
                }
            </div>

        </div>
     );
}

export default Task;