import RecipesStore from "./RecipesStore";
import { RecipeType } from "./RecipesStore";
import { Box, Button, Grid, Grid2, IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Outlet, useNavigate } from "react-router-dom"; //  שימוש ב-Outlet ו-useNavigate

const AllRecipes = observer(() => {
    const navigate = useNavigate();

    const handleNavigate = (recipe: RecipeType) => {
        navigate(`${recipe.id}`);
    }


    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 7 }}>
                <Box sx={{
                    padding: 2,
                    border: '1px solid #ccc',
                    height: '100%',
                    boxShadow: '0px 4px 10px rgba(112, 26, 26, 0.5)',
                }}>
                    <Outlet />
                </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 5 }}>
                <Box sx={{ padding: 2 }}>
                    <h2>My Recipes Book</h2>
                    {RecipesStore.list.map((recipe) => (
                        <Button key={recipe.id} onClick={() => handleNavigate(recipe)} fullWidth>
                            {recipe.title}
                        </Button>
                    ))}
                </Box>
            </Grid2>
        </Grid2>
    );
})
export default AllRecipes;

