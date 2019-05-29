import React, { useEffect } from "react"
import axios from "axios"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import { TextField, Button } from "@material-ui/core"
// import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "1rem",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}))

function CheckboxList({ username }) {
  const classes = useStyles()
  const [newItem, setNewItem] = React.useState("")
  const [todos, setTodos] = React.useState([])

  const fetchData = async () => {
    const { data: todosResponse } = await axios.get(
      `/dev/user/${username}/todos`
    )
    console.log(todosResponse)
    setTodos(todosResponse.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleToggle = value => async () => {
    let updatedTodos = [...todos]
    updatedTodos[value].isComplete = !updatedTodos[value].isComplete
    await axios.post(`/dev/user/${username}/todos`, updatedTodos)
    setTodos(updatedTodos)
  }

  const onSubmit = async () => {
    const updatedTodos = [...todos].concat({
      description: newItem,
      isComplete: false,
    })
    await axios.post(`/dev/user/${username}/todos`, updatedTodos)
    setTodos(updatedTodos)
    setNewItem("")
  }

  return (
    <List className={classes.root}>
      {todos.map(({ description, isComplete }, i) => (
        <ListItem
          key={description}
          role={undefined}
          dense
          button
          onClick={handleToggle(i)}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isComplete}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={description} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Comments">
              {/* <CommentIcon /> */}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <ListItem dense button>
        <TextField
          name="newItem"
          label="New Item"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <ListItemSecondaryAction>
          <Button onClick={onSubmit}>Add</Button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default CheckboxList
