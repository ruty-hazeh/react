import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Modal, TextField } from "@mui/material";
import RecipesStore, { RecipeType } from "./RecipesStore";
import { UserContext } from "./userContext";
import { useContext, useState } from "react";

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    ingredients: yup.string().required("Ingredients are required"), // יהיה מופרד בפסיקים
    instructions: yup.string().required("Instructions are required"), // הנחיות הכנה חובה
});

const AddRecipe = () => {
    const [isOpen, setIsOpen] = useState(true);
    const context = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        const newRecipe: RecipeType = {
            title: data.title,
            description: data.description,
            ingredients: data.ingredients.split(",").map((i:string) => i.trim()),
            instructions: data.instructions,
            id: "",
            authorId: ""
        };
        if (context && context.user) {
            RecipesStore.addRecipe(newRecipe, context.user.id);
            reset();
            setIsOpen(false);
        }
    };
    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                    <h2>Add a New Recipe</h2>
                    <TextField label="Title" {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
                    <TextField label="Description" {...register("description")} error={!!errors.description} helperText={errors.description?.message} />
                    <TextField label="Ingredients (comma-separated)" {...register("ingredients")} error={!!errors.ingredients} helperText={errors.ingredients?.message} />
                    <TextField label="Instructions" multiline rows={4} {...register("instructions")} error={!!errors.instructions} helperText={errors.instructions?.message} />
                    <Button type="submit" variant="contained" color="primary">Add Recipe</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddRecipe;
