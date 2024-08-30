import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-  shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Admin Dashboard
        </Typography>
      </div>

      <List>
        <Link className="/">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-10 w-10" />
            </ListItemPrefix>
            TABLEAU DE BORD
          </ListItem>
        </Link>
        <Link to="book-management">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-10 w-10" />
            </ListItemPrefix>
            GESTION DES LIVRES
          </ListItem>
        </Link>
        <Link to="add-book">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-10 w-10" />
            </ListItemPrefix>
            AJOUTER UN LIVRE
          </ListItem>
        </Link>
        <Link to="user-management">
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-10 w-10" />
            </ListItemPrefix>
            GESTION DES UTILISATEURS
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
