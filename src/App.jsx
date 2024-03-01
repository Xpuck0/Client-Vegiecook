import { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthProvider';
import LoginVisibleProvider from './contexts/LoginContext';

const HomePage = lazy(() => import('./Pages/HomePage/HomePage'));
const AllRecipesPage = lazy(() => import('./Pages/AllRecipesPage/AllRecipesPage'));
const RecipeDetailPage = lazy(() => import('./Pages/RecipeDetailPage/RecipeDetailPage'));
const CreateRecipe = lazy(() => import('./Pages/CreateRecipe/CreateRecipe'))

import Header from './MainComponents/Header/Header';
import Footer from './MainComponents/Footer/Footer';

import './App.css';
import { CircularProgress } from '@mui/material';
import Path from './paths';
import CreateRecipeProvider from './contexts/CreateRecipeProvider';

function App() {

    return (
        <AuthProvider>
            <LoginVisibleProvider>
                <CreateRecipeProvider>
                    <Header />
                    <Suspense fallback={<CircularProgress />}>
                        <Routes>
                            <Route path={Path.Home} element={<HomePage />} />
                            <Route path={Path.Recipes} element={<AllRecipesPage />} />
                            <Route path={`${Path.Recipes}/:id`} element={<RecipeDetailPage />} />
                            <Route path={Path.CreateRecipe} element={<CreateRecipe />} />
                        </Routes>
                    </Suspense>
                    <Footer />
                </CreateRecipeProvider>
            </LoginVisibleProvider>
        </AuthProvider>
    )
}

export default App
