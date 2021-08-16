import { makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import React from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
    textAlign: "center",
    fontSize: "40px",
    fontFamily: "Permanent Marker",
    color: "deeppink",
    textShadow: "1px 1px darkmagenta"
  }
}))

export const Header = () => {
const styles = useStyles()

  return <Typography className={styles.root} component="h1" variant="h5">
    Simple-Dimple React Form Component
  </Typography>
}