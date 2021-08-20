import { makeStyles } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}))

export const Form = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <form className={styles.root} noValidate {...props}>
      {children}
    </form>
  )
}