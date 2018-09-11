import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

const objects = [
    {
        name: "Sofa 1",
        url: ""
    },
    {
        name: "Sofa 2",
        url: ""
    }
];

const Component = ({ className }) => (
    <List className={className}>
        {
            objects.map(o => (
                <ListItem button>
                    <ListItemText primary={o.name} />
                </ListItem>
            ))
        }
    </List>
);

export default Component;
